"use client";

import { GridColDef } from "@mui/x-data-grid";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Link from "next/link";
import { useRef, useState } from "react";
import MuiTableComponent from "../TableComp";
import { GoDotFill } from "react-icons/go";
import { useClickAway } from "react-use";
import { Popper } from "@mui/material";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface InspectionRequest<T> {
  rows: T[];
}

export const InspectionRequestsTable = <T,>({ rows }: InspectionRequest<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const router = useRouter();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation(); // Prevents bubbling
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const columns: GridColDef[] = [
    {
      field: "requestId",
      headerName: "Request ID",
      flex: 0.5,
    },
    {
      field: "itemName",
      headerName: "Item name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.5,
    },
    { field: "date", headerName: "Request date", flex: 0.7 },
    {
      field: "status",
      headerName: "Status",
      flex: 0.7,
      renderCell: ({ value }) => {
        return (
          <span
            className={`flex gap-x-1 items-center justify-start w-1/2 px-2 py-1 rounded-full font-medium text-sm
			  ${getStatusClass(value)}`}
          >
            <GoDotFill size={20} /> {value}
          </span>
        );
      },
    },
    {
      field: "Action",
      flex: 0.5,
      renderCell: () => {
        return (
          <div className="h-full w-full relative z-10 flex justify-start items-center overflow-visible">
            <button
              aria-describedby={id}
              type="button"
              onClick={(e) => handleClick(e)}
              className="cursor-pointer bg-transparent border-none p-0 m-0"
              style={{ lineHeight: 0 }}
            >
              <BsThreeDotsVertical size={16} />
            </button>
            <Popper
              ref={dotsPopupRef}
              className="px-8 py-4 text-sm z-10 flex flex-col gap-4 items-center rounded-lg border border-primaryBorder bg-white"
              id={id}
              open={open}
              anchorEl={anchorEl}
            >
              <Link
                className="text-xs hover:underline hover:text-blue-600"
                href={`/dashboard/inspection-details`}
              >
                View
              </Link>

              <button className="text-xs hover:underline hover:text-green-600">
                Approve
              </button>

              <button className="text-xs hover:underline hover:text-red-600">
                Declined
              </button>
            </Popper>
          </div>
        );
      },
    },
  ];

  const mobileColumns: GridColDef[] = [
    {
      field: "requestId",
      headerName: "Request ID",
      flex: 1,
    },
    {
      field: "itemName",
      headerName: "Item name",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
  ];
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Active":
        return "text-red-500 bg-red-100";
      case "Pending":
        return "text-yellow-500 bg-yellow-100";
      case "Approved":
        return "text-green-500 bg-green-100";
      case "Scheduled":
        return "text-[#9F1AB1] bg-[#FBE8FF]";
      default:
        return "";
    }
  };
  // Total number of pages
  const totalPages = Math.ceil(rows.length / itemsPerPage);

  return (
    <div className="container mx-auto pt-4 md:p-4">
      <div className="hidden md:block bg-white w-full">
        <MuiTableComponent
          columns={columns}
          rows={currentItems}
          showCheckbox
          paginationActive={false}
          pageSize={itemsPerPage}
        />
      </div>

      {/* Mobile View */}
      <div className="md:hidden bg-white w-full">
        <MuiTableComponent
          columns={mobileColumns}
          rows={currentItems}
          showCheckbox
          onRowClick={() => {
            router.push("/dashboard/inspection-details");
          }}
          paginationActive={false}
          pageSize={itemsPerPage}
        />
      </div>
      {/* Pagination */}
      <div className="hidden md:flex justify-between items-center mt-4">
        <div className="text-sm text-gray-700">
          Showing {indexOfFirstItem + 1} - {indexOfLastItem} of {rows.length}
        </div>
        <div className="flex items-center md:space-x-6">
          {/* Previous Button */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-3 rounded-lg border ${
              currentPage === 1
                ? "opacity-70 border-grey/50 "
                : "border-orange text-black"
            }`}
          >
            <ArrowLeft2 size={14} />
          </button>
          {/* Page Numbers */}
          <div className="flex items-center gap-3">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`size-8 grid place-items-center rounded-full ${
                  currentPage === i + 1
                    ? "bg-orange text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {/* Next Button */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-3 rounded-lg border ${
              currentPage === totalPages
                ? "opacity-70 border-grey/50 "
                : "border-orange text-black"
            }`}
          >
            <ArrowRight2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
