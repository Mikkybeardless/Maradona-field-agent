"use client";

import { Export } from "iconsax-react";
import { DateSelect } from "../../../_components/common/dateSelect";
import Link from "next/link";
import { HiOutlinePencil } from "react-icons/hi";
import { FaRegClock } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useCallback, useEffect, useState } from "react";
import { TableSearchInput } from "@/app/_components/inspection-requests-table/tableSearchInput";
import MuiTableComponent from "@/app/_components/table/TableComp";
import { FilterGroup } from "@/app/_components/common/FilterGroup";
import { StatusSelect } from "@/app/_components/common/statusSelect";
import { Dayjs } from "dayjs";
import { useDebounce } from "@/app/hooks/useDebounce";
import formatDayJs from "@/app/helper/helperFunction";
import { inspectionColumns } from "@/app/_components/table/colums";
import { useRouter } from "next/navigation";
import axios from "axios";

type IFilter = {
  type: string;
  status: string;
  date: Dayjs | null;
};
export default function Page() {
  const router = useRouter();
  const [inspectionData, setInspectionData] = useState({
    rows: [],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    totalRowCount: 0,
    loading: true,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<IFilter>({
    type: "",
    status: "",
    date: null,
  });
  const debouncedSearchQuery = useDebounce(searchQuery); // Assuming you have a debounce hook, otherwise use the searchQuery directly
  const formatedDate = formatDayJs(filters.date);
  const fetchInspections = async (params?: string) => {
    const response = await axios.get(
      `/api/inspections${params ? `?${params}` : ""}`
    );
    return response;
  };
  const fetchData = useCallback(async () => {
    setInspectionData((prev) => ({ ...prev, loading: true }));
    const paramsObj: Record<string, string> = {
      type: filters.type,
      status: filters.status,
      search: debouncedSearchQuery,
    };
    if (formatedDate) {
      paramsObj.created_at = formatedDate;
    }
    const params = new URLSearchParams(paramsObj);
    const response = await fetchInspections(params.toString());
    console.log("Inspection fetch response:", response.data.data);
    const data = response.data.data;
    setInspectionData((prev) => ({
      ...prev,
      rows: data.data,
      pagination: {
        page: data.current_page,
        pageSize: data.per_page,
      },
      totalRowCount: data.total,
      loading: false,
    }));
  }, [
    debouncedSearchQuery,
    formatedDate,
    filters.date,
    filters.type,
    filters.status,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="flex bg-white mt-5 flex-col gap-4 py-10">
      <header className=" px-2 md:px-6 py-4 space-y-6">
        <div className="flex  justify-between items-end bg-[#FFEFE6] border border-[#FEB68A] rounded-lg px-5 py-4">
          <button className="hover:underline">Add Payment Info</button>
          <button>X</button>
        </div>

        <div className="flex items-center bg-white justify-between">
          <div className="space-y-2.5">
            <p className="md:text-2xl flex gap-x-2 font-semibold">
              <span>👋</span>
              Welcome back Rose! <GoDotFill className="text-blue-700" />
            </p>
            <div className="flex md:items-center gap-2">
              <p className="text-[#5C4D58] text-xs">
                Last login:{" "}
                <span className="text-[#150A13]">Sept 25, 2024</span>
              </p>
              <FaRegClock />
              <p className="text-xs">12:30pm</p>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <p className="px-2 rounded-full py-1 text-sm text-[#4A1E11] bg-[#FCDFD7]">
                Agent
              </p>
              <p className="px-2 rounded-full py-1 text-sm text-[#008000] bg-[#E8F7E8]">
                Active
              </p>
              <p className="px-2 rounded-full py-1 text-sm text-[#68305B] bg-[#F2E8F0]">
                Online
              </p>
            </div>
          </div>

          <Link href="/dashboard/profile">
            <button
              type="button"
              className="rounded-md px-2 py-1 text-xs md:text-base flex items-center gap-1 md:gap-2 border border-orange text-orange "
            >
              <HiOutlinePencil className="size-[20px] md:size-[24px]" />
              Edit Profile
            </button>
          </Link>
        </div>
      </header>
      <section className="px-6 py-4 bg-[#F0F0F0] space-y-6">
        <h6 className="text-black font-medium mb-5"> Statistics Overview</h6>
        <div className="w-full px-2 md:px-5 py-7 bg-white rounded-xl md:rounded-lg">
          <div className="w-full  flex flex-col md:flex-row md:items-center justify-evenly *:px-12 *:py-4">
            <div className="space-y-3  border-b md:border-b-0 md:border-r border-light-grey">
              <h6 className="text-sm text-[#585858]">
                Total Inspections Completed
              </h6>
              <p className="text-lg font-bold">230</p>
            </div>
            <div className="space-y-3    border-b md:border-b-0 md:border-r border-light-grey">
              <h6 className="text-sm text-[#585858]">Pending Inspections</h6>
              <p className="text-lg font-bold">53</p>
            </div>
            <div className="space-y-3  border-b md:border-b-0 md:border-r border-light-grey">
              <h6 className="text-sm text-[#585858]">Upcoming Inspections</h6>
              <p className="text-lg font-bold">530</p>
            </div>
            <div className="space-y-3">
              <h6 className="text-sm text-[#585858]">Recent Verifications</h6>
              <p className="text-lg font-bold">1,200</p>
            </div>
          </div>
        </div>
      </section>
      <section className="px-2  md:px-6 py-4 space-y-6">
        <div className="flex items-center justify-between">
          <h6 className="text-black font-medium md:text-xl mb-5">
            Inspection Requests
          </h6>
          <button className="px-4 py-1 md:px-6 md:py-2 flex items-center gap-1 bg-orange text-white rounded-lg hover:bg-orange-600">
            <Export size="20" /> Export
          </button>
        </div>

        {/* <div className="bg-white rounded-lg md:p-6">
          <header className="w-full flex flex-wrap gap-3   items-center justify-between">
            <div className="flex items-center flex-wrap gap-3">
              <div className="text-sm px-4 py-1.5 border border-grey/40 rounded-lg flex items-center gap-2">
                <select className="outline-none bg-transparent p-1">
                  <option value="all">Category</option>
                  <option value="pending">Land</option>
                  <option value="pending">Vehicle</option>
                  <option value="pending">Building</option>
                </select>
              </div>

              <div className="text-sm px-4 py-1.5 border border-grey/40 rounded-lg flex items-center gap-2">
                <select className="outline-none bg-transparent p-1">
                  <option value="all">Status</option>
                  <option value="pending">Pending</option>
                  <option value="pending">Scheduled</option>
                  <option value="pending">Approved</option>
                  <option value="pending">Active</option>
                </select>
              </div>

              <DateSelect
                onChange={(val) => {
                  console.log("date:", val);
                }}
                value={null}
              />
            </div>
            <div className="flex items-center gap-2.5 w-[18.75rem] border border-grey/40 rounded-lg px-4 py-2">
              <SearchNormal1 size={20} />
              <input
                type="search"
                className="w-full text-sm outline-none"
                placeholder="Search agents"
              />
            </div>
          </header>
          <InspectionRequestsTable />
        </div> */}

        {/* Filters & Search Bar */}
        <div className="">
          <FilterGroup
            filters={filters}
            onChange={(updated) => {
              setFilters((prev) => ({ ...prev, ...updated }));
            }}
            selects={[
              {
                name: "type",
                placeholder: "Category",
                options: [
                  { label: "All", value: "" },
                  { label: "House", value: "HOUSE" },
                  { label: "Cars", value: "CAR" },
                  { label: "Land", value: "LAND" },
                ],
              },
            ]}
            extraFilters={
              <>
                <StatusSelect
                  options={[
                    { label: "All", value: "" },
                    { label: "Passed", value: "passed" },
                    { label: "Scheduled", value: "scheduled" },
                    { label: "Failed", value: "failed" },
                    { label: "Assigned", value: "assigned" },
                  ]}
                  onChange={(value) => {
                    setFilters((prev) => ({ ...prev, status: value }));
                  }}
                  value={filters.status}
                />
                <DateSelect
                  onChange={(date) => {
                    setFilters((prev) => ({ ...prev, date }));
                  }}
                  value={filters.date}
                />
              </>
            }
            searchNode={
              <TableSearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search orders"
              />
            }
          />
        </div>

        <section
          id="products-table"
          className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
        >
          <div className="min-w-[900px]">
            <MuiTableComponent
              columns={inspectionColumns}
              rows={inspectionData.rows}
              onRowClick={() => {
                router.push("/dashboard/inspection-details");
              }}
              loading={inspectionData.loading}
              currentPage={inspectionData.pagination.page}
              totalRowCount={inspectionData.totalRowCount}
              onPageChange={(model) => {
                setInspectionData((prev) => ({
                  ...prev,
                  pagination: {
                    page: model.page,
                    pageSize: model.pageSize,
                  },
                }));
              }}
              showCheckbox={true}
              onSelect={(selections) => {
                console.log("Selected rows:", selections);
              }}
              rowHeight={60}
              pageSize={inspectionData.pagination.pageSize}
            />
          </div>
        </section>
      </section>
    </section>
  );
}
