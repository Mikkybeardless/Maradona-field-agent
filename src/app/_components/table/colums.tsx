import { GoDotFill } from "react-icons/go";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popper } from "@mui/material";
import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import {
  formatDateToYYYYMMDD,
  formatIsoString,
  formatTimeToHHMMSS,
} from "@/app/helper/helperFunction";
import { toast } from "react-toastify";
import axios from "axios";
import { ScheduleMeeting } from "../modals/scheduleMeeting";
import { MarkComplete } from "../modals/markAsCompleted";

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
          className={`flex gap-x-1 items-center justify-center w-[100px] my-2 px-2 py-1 rounded-full font-medium text-sm
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
          href={`/dashboard/inspection-requests/${rowId}`}
        >
          View
        </Link>
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
          className={`flex gap-x-1 items-center justify-center w-[100px] my-2 px-2 py-1 rounded-full font-medium text-sm
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
      return <BidsActionCellComponent rowId={row.id} rowStatus={row.status} />;
    },
  },
];
export const BidsActionCellComponent = ({
  rowId,
  rowStatus,
}: {
  rowId: string;
  rowStatus: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false); // 🔑 second modal state
  const dotsPopupRef = useRef(null);
  const [isScheduling, setIsScheduling] = useState(false);

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

  // const handleStatusUpdate = async (status: string) => {
  //   switch (rowStatus) {
  //     case "sold":
  //       return toast.error("Product has been sold");
  //     case "closed":
  //       toast.error("Purchase enquiry has been closed");
  //       return;
  //     case "pending":
  //       toast.error("Schedule a meeting with buyer first");
  //   }

  //   try {
  //     const response = await axios.post(`/api/bids/${rowId}`, {
  //       status,
  //     });
  //     if (response.status === 200) {
  //       toast.success(`Bid status updated to ${status} successfully`);
  //       setAnchorEl(null);
  //     }
  //   } catch (error) {
  //     toast.error("Failed to update bid status");
  //     console.error("Error updating bid status:", error);
  //   }
  // };

  const handleSchedule = async (date: Date, time: Date) => {
    setIsScheduling(true);
    if (rowStatus === "sold") return toast.error("Product has been sold");
    if (rowStatus === "closed") {
      toast.error("Purchase enquiry has been closed");
      return;
    }
    if (!date || !time) {
      toast.error("Please select a date and time");
      setIsScheduling(false);
      return;
    }
    const now = new Date();
    if (date < now) {
      toast.error("Scheduled date cannot be in the past");
      setIsScheduling(false);
      return;
    }
    const formatedDateTime = `${formatDateToYYYYMMDD(
      date
    )} ${formatTimeToHHMMSS(time)}`;
    try {
      const response = await axios.post(`/api/bids/${rowId}`, {
        scheduled_at: formatedDateTime,
      });

      if (response.status === 200) {
        toast.success(`Meeting scheduled successfully`);
        setScheduleModalOpen(false);
      }
    } catch (error) {
      toast.error("Failed to schedule meeting, please try again later");
      console.error("Error scheduling meeting:", error);
    } finally {
      setIsScheduling(false);
    }
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
      >
        <button
          className="text-xs hover:underline hover:text-green-600"
          onClick={() => {
            setScheduleModalOpen(true);
            setAnchorEl(null); // close popper when opening modal
          }}
        >
          Schedule meeting
        </button>
      </Popper>

      {/* 🔑 Schedule Meeting Modal */}
      <ScheduleMeeting
        isScheduling={isScheduling}
        handleSchedule={handleSchedule}
        scheduleModalOpen={scheduleModalOpen}
        setScheduleModalOpen={setScheduleModalOpen}
      />
    </div>
  );
};

const getStatusClassBids = (status: string) => {
  switch (status) {
    case "closed":
      return "text-red-500 bg-red-100";
    case "scheduled":
      return "text-yellow-500 bg-yellow-100";
    case "completed":
      return "text-blue-500 bg-blue-100";
    case "sold":
      return "text-green-500 bg-green-100";
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
      <span className="font-medium inline-block w-[150px] truncate">
        {row.purchase_enquiry?.message}
      </span>
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
    renderCell: ({ value }) => {
      return (
        <span
          className={`flex gap-x-1 items-center justify-center w-[100px] my-2 px-2 py-1 rounded-full font-medium text-sm
              ${getStatusClassPurchaseEnquiry(value)}`}
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
      return (
        <PurchaseActionCellComponent rowId={row.id} rowStatus={row.status} />
      );
    },
  },
];

export const PurchaseActionCellComponent = ({
  rowId,
  rowStatus,
}: {
  rowId: string;
  rowStatus: string;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false); // 🔑 second modal state
  const dotsPopupRef = useRef(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [isMarking, setIsMarking] = useState(false);

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

  const handleStatusUpdate = async (notes: string) => {
    setIsMarking(true);
    if (rowStatus === "sold") return toast.error("Product has been sold");
    if (rowStatus === "closed") {
      toast.error("Purchase enquiry has been closed");
      return;
    }
    if (rowStatus === "pending") {
      toast.error("Schedule a meeting with buyer first");
      return;
    }

    try {
      const response = await axios.put(`/api/purchase-enq/${rowId}`, {
        notes,
      });
      if (response.status === 200) {
        toast.success(`Successfully marked as completed`);
        setAnchorEl(null);
      }
    } catch (error) {
      toast.error("Failed to mark as completed");
      console.error("Error marking as completed:", error);
    } finally {
      setIsMarking(false);
      window.location.reload();
    }
  };

  const handleSchedule = async (date: Date | null, time: Date | null) => {
    setIsScheduling(true);
    if (!date || !time) {
      toast.error("Please select a date and time");
      setIsScheduling(false);
      return;
    }
    const now = new Date();
    if (date < now) {
      toast.error("Scheduled date cannot be in the past");
      setIsScheduling(false);
      return;
    }
    const formatedDateTime = `${formatDateToYYYYMMDD(
      date
    )} ${formatTimeToHHMMSS(time)}`;
    try {
      const response = await axios.post(`/api/purchase-enq/${rowId}`, {
        scheduled_at: formatedDateTime,
      });

      if (response.status === 200) {
        toast.success(`Meeting scheduled successfully`);
        setScheduleModalOpen(false);
        window.location.reload();
      }
    } catch (error) {
      toast.error("Failed to schedule meeting");
      console.error("Error scheduling meeting:", error);
    } finally {
      setIsScheduling(false);
    }
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
      >
        <button
          onClick={() => setCompleteModalOpen(true)}
          className="text-xs hover:underline hover:text-green-600 "
        >
          Mark as completed
        </button>
        <button
          className="text-xs hover:underline hover:text-green-600"
          onClick={() => {
            setScheduleModalOpen(true);
            setAnchorEl(null); // close popper when opening modal
          }}
        >
          Schedule meeting
        </button>
      </Popper>

      {/* 🔑 Schedule Meeting Modal */}
      <ScheduleMeeting
        isScheduling={isScheduling}
        handleSchedule={handleSchedule}
        scheduleModalOpen={scheduleModalOpen}
        setScheduleModalOpen={setScheduleModalOpen}
      />

      <MarkComplete
        isMarking={isMarking}
        handleMark={handleStatusUpdate}
        completeModalOpen={completeModalOpen}
        setCompleteModalOpen={setCompleteModalOpen}
      />
    </div>
  );
};

const getStatusClassPurchaseEnquiry = (status: string) => {
  switch (status) {
    case "closed":
      return "text-red-500 bg-red-100";
    case "pending":
      return "text-yellow-500 bg-yellow-100";
    case "sold":
      return "text-green-500 bg-green-100";
    case "completed":
      return "text-blue-500 bg-blue-100";
    case "scheduled":
      return "text-purple-500 bg-purple-100";
    default:
      return "";
  }
};
