import { GoDotFill } from "react-icons/go";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popper } from "@mui/material";
import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import { formatIsoString } from "@/app/helper/helperFunction";

export const inspectionColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "Request ID",
    flex: 0.5,
  },
  {
    field: "productName",
    headerName: "Item name",
    flex: 1,
    renderCell: ({ row }) => (
      <span className="font-medium">{row.product?.name}</span>
    ),
  },
  {
    field: "productCategory",
    headerName: "Category",
    flex: 0.5,
    renderCell: ({ row }) => (
      <span className="font-medium">{row.product?.type}</span>
    ),
  },
  {
    field: "created_at",
    headerName: "Request date",
    renderCell: ({ value }) => {
      const { formattedDate, formattedTime } = formatIsoString(value);
      return (
        <span className="font-medium">
          {formattedDate} at {formattedTime}
        </span>
      );
    },
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    renderCell: ({ value }) => {
      return (
        <span
          className={`flex gap-x-1 items-center justify-start w-[120px] px-2 py-1 rounded-full font-medium text-sm
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
    renderCell: ({ row }) => {
      return <InspectionActionCellComponent rowId={row.id} />;
    },
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "failed":
      return "text-red-500 bg-red-100";
    case "assigned":
      return "text-yellow-500 bg-yellow-100";
    case "passed":
      return "text-green-500 bg-green-100";
    case "scheduled":
      return "text-[#9F1AB1] bg-[#FBE8FF]";
    default:
      return "";
  }
};
export const InspectionActionCellComponent = ({ rowId }: { rowId: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? `popper-${rowId}` : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div className="h-full w-full relative z-10 flex justify-center items-center overflow-visible">
      <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className="cursor-pointer bg-transparent border-none p-2 m-0 rounded-full hover:bg-gray-100"
        style={{ lineHeight: 0 }}
      >
        <BsThreeDotsVertical size={16} />
      </button>
      <Popper
        ref={dotsPopupRef}
        className="p-3 px-4 text-sm z-10 flex flex-col gap-3 items-center rounded-lg border border-primaryBorder bg-white"
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        style={{ zIndex: 1300 }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
              padding: 8,
            },
          },
        ]}
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
};

export const bidsColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "Bid ID",
    flex: 0.5,
  },
  {
    field: "auction_product",
    headerName: "Item name",
    flex: 1,
    renderCell: ({ row }) => (
      <span className="font-medium">{row.auction_product?.name}</span>
    ),
  },
  {
    field: "productCategory",
    headerName: "Category",
    flex: 0.5,
    renderCell: ({ row }) => (
      <span className="font-medium">{row.auction_product?.type}</span>
    ),
  },
  {
    field: "created_at",
    headerName: "Bid date",
    renderCell: ({ value }) => {
      const { formattedDate, formattedTime } = formatIsoString(value);
      return (
        <span className="font-medium">
          {formattedDate} at {formattedTime}
        </span>
      );
    },
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    renderCell: ({ value }) => {
      return (
        <span
          className={`flex gap-x-1 items-center justify-start w-[120px] px-2 py-1 rounded-full font-medium text-sm
              ${getStatusClassBids(value)}`}
        >
          <GoDotFill size={20} /> {value}
        </span>
      );
    },
  },
  {
    field: "Action",
    flex: 0.5,
    renderCell: ({ row }) => {
      return <BidsActionCellComponent rowId={row.id} />;
    },
  },
];
export const BidsActionCellComponent = ({ rowId }: { rowId: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? `popper-${rowId}` : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div className="h-full w-full relative z-10 flex justify-center items-center overflow-visible">
      <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className="cursor-pointer bg-transparent border-none p-2 m-0 rounded-full hover:bg-gray-100"
        style={{ lineHeight: 0 }}
      >
        <BsThreeDotsVertical size={16} />
      </button>
      <Popper
        ref={dotsPopupRef}
        className="p-3 px-4 text-sm z-10 flex flex-col gap-3 items-center rounded-lg border border-primaryBorder bg-white"
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        style={{ zIndex: 1300 }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
              padding: 8,
            },
          },
        ]}
      >
        {/* <Link
          className="text-xs hover:underline hover:text-blue-600"
          href={`/dashboard/inspection-details`}
        >
          View
        </Link> */}

        <button className="text-xs hover:underline hover:text-green-600">
          Reply
        </button>

        <button className="text-xs hover:underline hover:text-red-600">
          Declined
        </button>
      </Popper>
    </div>
  );
};

const getStatusClassBids = (status: string) => {
  switch (status) {
    case "failed":
      return "text-red-500 bg-red-100";
    case "scheduled":
      return "text-yellow-500 bg-yellow-100";
    case "completed":
      return "text-green-500 bg-green-100";
    case "inspected":
      return "text-[#9F1AB1] bg-[#FBE8FF]";
    default:
      return "";
  }
};

export const purchaseEnqColumns: GridColDef[] = [
  {
    field: "purchase_enquiry_id",
    headerName: "Enquiry ID",
    flex: 0.5,
  },
  {
    field: "message",
    headerName: "Message",
    flex: 1,
    renderCell: ({ row }) => (
      <span className="font-medium">{row.purchase_enquiry?.message}</span>
    ),
  },
  {
    field: "quantity",
    headerName: "Quantity",
    flex: 0.5,
    renderCell: ({ row }) => (
      <span className="font-medium">{row.purchase_enquiry?.qty_sold}</span>
    ),
  },
  {
    field: "created_at",
    headerName: "Enquiry Date",
    renderCell: ({ row }) => {
      const { formattedDate, formattedTime } = formatIsoString(
        row.purchase_enquiry?.created_at
      );
      return (
        <span className="font-medium">
          {formattedDate} at {formattedTime}
        </span>
      );
    },
    flex: 0.8,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 0.5,
    renderCell: ({ row }) => {
      return (
        <span
          className={`flex gap-x-1 items-center justify-start w-[120px] px-2 py-1 rounded-full font-medium text-sm
              ${getStatusClassPurchaseEnquiry(row.purchase_enquiry?.status)}`}
        >
          <GoDotFill size={20} /> {row.purchase_enquiry?.status}
        </span>
      );
    },
  },
  {
    field: "Action",
    flex: 0.5,
    renderCell: ({ row }) => {
      return <PurchaseActionCellComponent rowId={row.id} />;
    },
  },
];

export const PurchaseActionCellComponent = ({ rowId }: { rowId: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dotsPopupRef = useRef(null);
  const open = Boolean(anchorEl);
  const id = open ? `popper-${rowId}` : undefined;

  useClickAway(dotsPopupRef, () => {
    setAnchorEl(null);
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <div className="h-full w-full relative z-10 flex justify-center items-center overflow-visible">
      <button
        aria-describedby={id}
        type="button"
        onClick={handleClick}
        className="cursor-pointer bg-transparent border-none p-2 m-0 rounded-full hover:bg-gray-100"
        style={{ lineHeight: 0 }}
      >
        <BsThreeDotsVertical size={16} />
      </button>
      <Popper
        ref={dotsPopupRef}
        className="p-3 px-4 text-sm z-10 flex flex-col gap-3 items-center rounded-lg border border-primaryBorder bg-white"
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
        style={{ zIndex: 1300 }}
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
          {
            name: "preventOverflow",
            options: {
              boundary: "viewport",
              padding: 8,
            },
          },
        ]}
      >
        <button className="text-xs hover:underline hover:text-green-600">
          Reply
        </button>

        <button className="text-xs hover:underline hover:text-red-600">
          Declined
        </button>
      </Popper>
    </div>
  );
};
const getStatusClassPurchaseEnquiry = (status: string) => {
  switch (status) {
    case "failed":
      return "text-red-500 bg-red-100";
    case "scheduled":
      return "text-yellow-500 bg-yellow-100";
    case "sold":
      return "text-green-500 bg-green-100";
    case "inspected":
      return "text-[#9F1AB1] bg-[#FBE8FF]";
    default:
      return "";
  }
};
