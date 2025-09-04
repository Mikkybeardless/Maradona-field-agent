"use client";

import { useEffect, useState } from "react";
import MuiTableComponent from "../table/TableComp";
import { useRouter } from "next/navigation";
import { TableSearchInput } from "./tableSearchInput";
import { useDebounce } from "@/app/hooks/useDebounce";
import { inspectionColumns } from "../table/colums";
import { StatusSelect } from "../common/statusSelect";
import { fetchFn } from "@/app/api/fetchFn";

export const InspectionRequestsTable = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [inspectionData, setInspectionData] = useState({
    rows: [],
    pagination: {
      page: 1,
      pageSize: 10,
    },
    totalRowCount: 0,
    loading: true,
  });
  const debouncedSearch = useDebounce(searchQuery);

  useEffect(() => {
    const fetchData = async () => {
      setInspectionData((prev) => ({ ...prev, loading: true }));
      const paramsObj: Record<string, string> = {
        page: inspectionData.pagination.page.toString(),
        per_page: inspectionData.pagination.pageSize.toString(),
        status: statusFilter,
        search: debouncedSearch,
      };

      const params = new URLSearchParams(paramsObj);
      const response = await fetchFn("/api/inspections", params.toString());
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
    };

    fetchData();
  }, [debouncedSearch, statusFilter]);

  return (
    <div className="bg-white rounded-lg p-6">
      <header className="w-full flex flex-wrap gap-2 items-center justify-between">
        {/* <div className="text-sm px-4 py-1.5 border border-grey/40 rounded-lg flex items-center gap-2">
          <select
            onChange={(e) => {
              console.log("Status Filter Changed:", e.target.value);
              setStatusFilter(e.target.value);
            }}
            className="outline-none bg-transparent p-1"
          >
            <option value="">All Status</option>
            <option value="failed">Failed</option>
            <option value="scheduled">Scheduled</option>
            <option value="passed">Passed</option>
            <option value="assigned">Assigned</option>
          </select>
        </div> */}
        <StatusSelect
          options={[
            { label: "All", value: "" },
            { label: "Passed", value: "passed" },
            { label: "Scheduled", value: "scheduled" },
            { label: "Failed", value: "failed" },
            { label: "Assigned", value: "assigned" },
          ]}
          onChange={(value) => {
            setStatusFilter(value);
          }}
          value={statusFilter}
        />
        <TableSearchInput
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search inspections"
        />
      </header>
      <div className="container mx-auto pt-4 md:p-4">
        <div className=" bg-white w-full">
          <MuiTableComponent
            columns={inspectionColumns}
            rows={inspectionData.rows}
            showCheckbox
            loading={inspectionData.loading}
            currentPage={inspectionData.pagination.page}
            onRowClick={(row) => {
              router.push(`/dashboard/inspection-requests/${row.id}`);
            }}
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
            onSelect={(selectedRows) => {
              console.log("Selected rows:", selectedRows);
            }}
            pageSize={inspectionData.pagination.pageSize}
          />
        </div>
      </div>
    </div>
  );
};
