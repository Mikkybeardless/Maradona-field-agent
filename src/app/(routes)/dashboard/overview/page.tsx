"use client";

import { Export, Eye } from "iconsax-react";
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
import formatDayJs, {
  buildCleanParams,
  formatIsoString,
} from "@/app/helper/helperFunction";
import {
  bidsColumns,
  purchaseEnqColumns,
} from "@/app/_components/table/colums";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { fetchFn } from "@/app/api/fetchFn";
import { ExportModal } from "@/app/_components/modals/exportModal";
import DynamicNav from "@/app/_components/DynamicTab";
import { MetricCard } from "@/app/_components/analytics/metricCard";
import { DollarSign, Target, Users } from "lucide-react";
import { SquareLoader } from "@/app/_components/common/squareLoader";

type IFilter = {
  type: string;
  status: string;
  date: Dayjs | null;
};

type TabState = "purchase-enquiries" | "bids";

interface ISelectedData {
  purchaseEnqs: {
    ID: number;
    "Scheduled Date": string;
    "Scheduled Time": string;
    "Initiated On": string;
    "Initiated At": string;
  }[];
  bids: Record<string, string | number>[];
}

export default function Page() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isExporting, setIsExporting] = useState({
    purchaseEnq: false,
    bids: false,
  });
  const [selectedData, setSelectedData] = useState<ISelectedData>({
    purchaseEnqs: [],
    bids: [],
  });
  const [tab, setTab] = useState<TabState>("purchase-enquiries");

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
  const initialStats: Stats = {
    inspections: {
      total_inspections: 0,
      completed_inspections: 0,
      pending_inspections: 0,
      purchase_inspections: {
        total: 0,
        completed: 0,
        pending: 0,
      },
      regular_inspections: {
        total: 0,
        completed: 0,
        pending: 0,
      },
      completion_rate: 0,
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    conversions: {
      overall_conversion: {
        total_assignments: 0,
        total_sold: 0,
        conversion_rate: 0,
      },
      purchase_enquiries_conversion: {
        total_assignments: 0,
        total_sold: 0,
        conversion_rate: 0,
      },
      auction_bids_conversion: {
        total_assignments: 0,
        total_sold: 0,
        conversion_rate: 0,
      },
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    performance: {
      data: [],
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    bids: {
      total_assigned: 0,
      sold_count: 0,
      pending_count: 0,
      rejected_count: 0,
      total_revenue: "",
      conversion_rate: 0,
      period: {
        start: "",
        end: "",
        description: "",
      },
    },
    enquiries: {
      closed_count: 0,
      conversion_rate: 0,
      pending_count: 0,
      period: {
        start: "",
        end: "",
        description: "",
      },
      sold_count: 0,
      total_assigned: 0,
      total_revenue: "",
    },
  };
  const [stats, setStats] = useState<Stats>(initialStats);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const response = await fetchFn(`/api/analytics`);
        setStats(response.data.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleSelectedEnquiries = (selections: Enquiry[]) => {
    const formattedData = selections.map((item) => {
      const [date, time] = item.scheduled_at?.split(" ") || [];
      return {
        ID: item.id,
        ["Scheduled Date"]: date,
        ["Scheduled Time"]: time,
        ["Initiated On"]: formatIsoString(item.created_at).formattedDate,
        ["Initiated At"]: formatIsoString(item.created_at).formattedTime,
      };
    });
    setSelectedData((prev) => ({
      ...prev,
      purchaseEnqs: formattedData,
    }));
  };

  const handleSelectedBids = (selections: Bid[]) => {
    const formattedData = selections.map((item) => {
      return {
        ID: item.id,
        ["Buyer name"]: item.buyer.name,
        ["Product"]: item.auction_product.name,
        ["Bid Amount"]: item.amount,
        ["Initiated On"]: formatIsoString(item.created_at).formattedDate,
        ["Initiated At"]: formatIsoString(item.created_at).formattedTime,
      };
    });
    setSelectedData((prev) => ({
      ...prev,
      bids: formattedData,
    }));
  };

  return (
    <section className="flex bg-white mt-5 flex-col gap-4 py-10">
      {/* modals */}
      <ExportModal
        isOpen={isExporting.purchaseEnq}
        filename="Purchase-Enquiries"
        onClose={() =>
          setIsExporting((prev) => ({ ...prev, purchaseEnq: false }))
        }
        allData={(purchaseEnqData.rows as Enquiry[]).map((item) => {
          const [date, time] = item.scheduled_at?.split(" ") || [];
          return {
            ID: item.id,
            ["Scheduled Date"]: date,
            ["Scheduled Time"]: time,
            ["Initiated On"]: formatIsoString(item.created_at).formattedDate,
            ["Initiated At"]: formatIsoString(item.created_at).formattedTime,
          };
        })}
        selectedData={selectedData.purchaseEnqs}
      />
      <ExportModal
        isOpen={isExporting.bids}
        filename="Assigned-Bids"
        onClose={() => setIsExporting((prev) => ({ ...prev, bids: false }))}
        allData={(bidsData.rows as Bid[]).map((item) => {
          return {
            ID: item.id,
            ["Buyer Name"]: item.buyer.name,
            ["Product"]: item.auction_product.name,
            ["Bid Amount"]: item.amount,
            ["Initiated On"]: formatIsoString(item.created_at).formattedDate,
            ["Initiated At"]: formatIsoString(item.created_at).formattedTime,
          };
        })}
        selectedData={selectedData.bids}
      />

      <header className=" px-2 md:px-6 py-4 space-y-6">
        {/* <div className="flex  justify-between items-end bg-[#FFEFE6] border border-[#FEB68A] rounded-lg px-5 py-4">
          <button className="hover:underline">Add Payment Info</button>
          <button>X</button>
        </div> */}

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
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <SquareLoader key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Overall Conversion Rate"
              value={`${stats.conversions.overall_conversion.conversion_rate}%`}
              subtitle={`${stats.conversions.overall_conversion.total_sold}/${stats.conversions.overall_conversion.total_assignments} assignments`}
              icon={Target}
              color="text-blue-600"
              trend={
                stats.conversions.auction_bids_conversion.conversion_rate +
                stats.conversions.purchase_enquiries_conversion
                  .conversion_rate /
                  2 -
                70
              }
            />
            <MetricCard
              title="Total Revenue"
              value={
                (Number(stats.bids.total_revenue) +
                  Number(stats.enquiries.total_revenue)) /
                1000
              }
              subtitle="Combined revenue"
              icon={DollarSign}
              color="text-green-600"
              trend={12}
              isRevenue={true}
            />
            <MetricCard
              title="Total Assignments"
              value={stats.conversions.overall_conversion.total_assignments}
              subtitle="This period"
              icon={Users}
              color="text-purple-600"
              trend={8}
            />
            <MetricCard
              title="Inspection Rate"
              value={`${stats.inspections.completion_rate}%`}
              subtitle={`${stats.inspections.completed_inspections}/${stats.inspections.total_inspections} completed`}
              icon={Eye}
              color="text-orange-600"
              trend={-2}
            />
          </div>
        )}
      </section>
      <div className="my-4 w-[300px]">
        <DynamicNav
          states={[
            { state: "purchase-enquiries", label: "Purchase Enquiries", id: 1 },
            { state: "bids", label: "Bids", id: 2 },
          ]}
          onStateChange={(val) => setTab(val)}
          initialState={tab}
        />
      </div>

      {tab === "purchase-enquiries" ? (
        <section className="px-2 mb-10 border border-gray-300 rounded-lg shadow-md  md:px-6 py-4 space-y-6">
          <div className="flex items-center justify-between">
            <h6 className="text-black font-medium md:text-xl mb-5">
              Assigned Purchase Enquiries
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
                      setPurchaseFilters((prev) => ({
                        ...prev,
                        status: value,
                      }));
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
                onSelect={handleSelectedEnquiries}
                rowHeight={60}
                pageSize={purchaseEnqData.pagination.pageSize}
              />
            </div>
          </section>
        </section>
      ) : (
        <section className="px-2 border border-gray-300 rounded-lg shadow-md  md:px-6 py-4 space-y-6">
          <div className="flex items-center justify-between">
            <h6 className="text-black font-medium md:text-xl mb-5">
              Assigned Bids
            </h6>
            <button
              onClick={() =>
                setIsExporting((prev) => ({ ...prev, bids: true }))
              }
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
                onSelect={handleSelectedBids}
                rowHeight={60}
                pageSize={bidsData.pagination.pageSize}
              />
            </div>
          </section>
        </section>
      )}

      {/* Assigned auction bids */}
    </section>
  );
}
