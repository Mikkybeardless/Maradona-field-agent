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
import formatDayJs, { buildCleanParams } from "@/app/helper/helperFunction";
import {
  bidsColumns,
  purchaseEnqColumns,
} from "@/app/_components/table/colums";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { fetchFn } from "@/app/api/fetchFn";
import { ExportModal } from "@/app/_components/modals/exportModal";

type IFilter = {
  type: string;
  status: string;
  date: Dayjs | null;
};

interface ISelectedData {
  purchaseEnqs: Record<string, string | number>[];
  bids: Record<string, string | number>[];
}

export default function Page() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isExporting, setIsExporting] = useState({
    purchaseEnq: false,
    bids: false,
  });
  const [selectedData, setSelectedData] = useState<ISelectedData>({
    purchaseEnqs: [],
    bids: [],
  });

  // purchase enquiry
  const [purchaseEnqData, setPurchaseEnqData] = useState({
    rows: [],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    totalRowCount: 0,
    loading: true,
  });
  const [searchPurchaseQuery, setSearchPurchaseQuery] = useState("");
  const [purchaseFilters, setPurchaseFilters] = useState<IFilter>({
    type: "",
    status: "",
    date: null,
  });
  const debouncedSearchPurchaseQuery = useDebounce(searchPurchaseQuery); // Assuming you have a debounce hook, otherwise use the searchQuery directly
  const formatedPurchaseEnqDate = formatDayJs(purchaseFilters.date);

  // assigned bids
  const [bidsData, setBidsData] = useState({
    rows: [],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    totalRowCount: 0,
    loading: true,
  });
  const [searchBidsQuery, setSearchBidsQuery] = useState("");
  const [bidsFilters, setBidsFilters] = useState<IFilter>({
    type: "",
    status: "",
    date: null,
  });
  const debouncedSearchBidsQuery = useDebounce(searchBidsQuery);
  const formattedBidsDate = formatDayJs(bidsFilters.date);

  // Fetch purchase enquiry data
  const fetchPurchaseEnqData = useCallback(async () => {
    setPurchaseEnqData((prev) => ({ ...prev, loading: true }));
    const paramsObj: Record<string, string> = {
      type: purchaseFilters.type,
      status: purchaseFilters.status,
    };
    if (formatedPurchaseEnqDate) {
      paramsObj.created_at = formatedPurchaseEnqDate;
    }

    // Create URLSearchParams from the filtered params removing any empty values
    const params = buildCleanParams(
      paramsObj,
      debouncedSearchPurchaseQuery,
      purchaseEnqData.pagination.page,
      purchaseEnqData.pagination.pageSize
    );
    const response = await fetchFn(`/api/purchase-enq`, params.toString());
    const data = response.data.data;
    setPurchaseEnqData((prev) => ({
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
    debouncedSearchPurchaseQuery,
    formatedPurchaseEnqDate,
    purchaseFilters.date,
    purchaseFilters.type,
    purchaseFilters.status,
  ]);

  useEffect(() => {
    fetchPurchaseEnqData();
  }, [fetchPurchaseEnqData]);

  // fetch assigned bids data

  const fetchAssignedBidsData = useCallback(async () => {
    setBidsData((prev) => ({ ...prev, loading: true }));
    const paramsObj: Record<string, string> = {
      page: bidsData.pagination.page.toString(),
      per_page: bidsData.pagination.pageSize.toString(),
      type: bidsFilters.type,
      status: bidsFilters.status,
      search: debouncedSearchBidsQuery,
    };
    if (formattedBidsDate) {
      paramsObj.created_at = formattedBidsDate;
    }
    const params = buildCleanParams(paramsObj);
    const response = await fetchFn(`/api/bids`, params.toString());
    const data = response.data.data;
    console.log("Assigned bids data:", data);
    setBidsData((prev) => ({
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
    formattedBidsDate,
    bidsFilters.date,
    bidsFilters.type,
    bidsFilters.status,
    debouncedSearchBidsQuery,
  ]);
  useEffect(() => {
    fetchAssignedBidsData();
  }, [fetchAssignedBidsData]);

  return (
    <section className="flex bg-white mt-5 flex-col gap-4 py-10">
      {/* modals */}
      <ExportModal
        isOpen={isExporting.purchaseEnq}
        onClose={() =>
          setIsExporting((prev) => ({ ...prev, purchaseEnq: false }))
        }
        allData={purchaseEnqData.rows}
        selectedData={selectedData.purchaseEnqs}
      />
      <ExportModal
        isOpen={isExporting.bids}
        onClose={() => setIsExporting((prev) => ({ ...prev, bids: false }))}
        allData={bidsData.rows}
        selectedData={selectedData.bids}
      />

      <header className=" px-2 md:px-6 py-4 space-y-6">
        <div className="flex  justify-between items-end bg-[#FFEFE6] border border-[#FEB68A] rounded-lg px-5 py-4">
          <button className="hover:underline">Add Payment Info</button>
          <button>X</button>
        </div>

        <div className="flex items-center bg-white justify-between">
          <div className="space-y-2.5">
            <p className="md:text-2xl flex gap-x-2 font-semibold">
              <span>👋</span>
              Welcome back {user.name}! <GoDotFill className="text-blue-700" />
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
      {/* pruchase enquiries */}
      <section className="px-2 mb-10 border border-gray-300 rounded-lg shadow-md  md:px-6 py-4 space-y-6">
        <div className="flex items-center justify-between">
          <h6 className="text-black font-medium md:text-xl mb-5">
            Purchase Inspection Requests
          </h6>
          <button
            onClick={() =>
              setIsExporting((prev) => ({ ...prev, purchaseEnq: true }))
            }
            className="px-4 py-1 md:px-6 md:py-2 flex items-center gap-1 bg-orange text-white rounded-lg hover:bg-orange-600"
          >
            <Export size="20" /> Export
          </button>
        </div>

        {/* purchaseFilters & Search Bar */}
        <div className="">
          <FilterGroup
            filters={purchaseFilters}
            onChange={(updated) => {
              setPurchaseFilters((prev) => ({ ...prev, ...updated }));
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
                    { label: "Sold", value: "sold" },
                    { label: "Scheduled", value: "scheduled" },
                    { label: "Assigned", value: "assigned" },
                  ]}
                  onChange={(value) => {
                    setPurchaseFilters((prev) => ({ ...prev, status: value }));
                  }}
                  value={purchaseFilters.status}
                />
                <DateSelect
                  onChange={(date) => {
                    setPurchaseFilters((prev) => ({ ...prev, date }));
                  }}
                  value={purchaseFilters.date}
                />
              </>
            }
            searchNode={
              <TableSearchInput
                searchQuery={searchPurchaseQuery}
                setSearchQuery={setSearchPurchaseQuery}
                placeholder="Search enquiries"
              />
            }
          />
        </div>

        <section
          id="purchase-enquiry-table"
          className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
        >
          <div className="min-w-[900px]">
            <MuiTableComponent
              columns={purchaseEnqColumns}
              rows={purchaseEnqData.rows}
              onRowClick={() => {
                router.push("/dashboard/inspection-details");
              }}
              loading={purchaseEnqData.loading}
              currentPage={purchaseEnqData.pagination.page}
              totalRowCount={purchaseEnqData.totalRowCount}
              onPageChange={(model) => {
                setPurchaseEnqData((prev) => ({
                  ...prev,
                  pagination: {
                    page: model.page,
                    pageSize: model.pageSize,
                  },
                }));
              }}
              showCheckbox={true}
              onSelect={(selections) => {
                setSelectedData((prev) => ({
                  ...prev,
                  purchaseEnqs: selections,
                }));
              }}
              rowHeight={60}
              pageSize={purchaseEnqData.pagination.pageSize}
            />
          </div>
        </section>
      </section>
      {/* Assigned auction bids */}
      <section className="px-2 border border-gray-300 rounded-lg shadow-md  md:px-6 py-4 space-y-6">
        <div className="flex items-center justify-between">
          <h6 className="text-black font-medium md:text-xl mb-5">
            Assigned Auction Requests
          </h6>
          <button
            onClick={() => setIsExporting((prev) => ({ ...prev, bids: true }))}
            className="px-4 py-1 md:px-6 md:py-2 flex items-center gap-1 bg-orange text-white rounded-lg hover:bg-orange-600"
          >
            <Export size="20" /> Export
          </button>
        </div>

        {/* Filters & Search Bar */}
        <div className="">
          <FilterGroup
            filters={bidsFilters}
            onChange={(updated) => {
              setBidsFilters((prev) => ({ ...prev, ...updated }));
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
                    { label: "Sold", value: "sold" },
                    { label: "Scheduled", value: "scheduled" },
                    { label: "Assigned", value: "assigned" },
                  ]}
                  onChange={(value) => {
                    setBidsFilters((prev) => ({ ...prev, status: value }));
                  }}
                  value={bidsFilters.status}
                />
                <DateSelect
                  onChange={(date) => {
                    setBidsFilters((prev) => ({ ...prev, date }));
                  }}
                  value={bidsFilters.date}
                />
              </>
            }
            searchNode={
              <TableSearchInput
                searchQuery={searchBidsQuery}
                setSearchQuery={setSearchBidsQuery}
                placeholder="Search orders"
              />
            }
          />
        </div>

        <section
          id="assigned-bids-table"
          className="mt-3 w-full bg-white overflow-x-auto rounded-md custom-scrollbar"
        >
          <div className="min-w-[900px]">
            <MuiTableComponent
              columns={bidsColumns}
              rows={bidsData.rows}
              onRowClick={() => {
                router.push("/dashboard/bid-details");
              }}
              loading={bidsData.loading}
              currentPage={bidsData.pagination.page}
              totalRowCount={bidsData.totalRowCount}
              onPageChange={(model) => {
                setBidsData((prev) => ({
                  ...prev,
                  pagination: {
                    page: model.page,
                    pageSize: model.pageSize,
                  },
                }));
              }}
              showCheckbox={true}
              onSelect={(selections) => {
                setSelectedData((prev) => ({ ...prev, bids: selections }));
              }}
              rowHeight={60}
              pageSize={bidsData.pagination.pageSize}
            />
          </div>
        </section>
      </section>
    </section>
  );
}
