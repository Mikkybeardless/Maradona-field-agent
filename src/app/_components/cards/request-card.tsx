"use client";
import { useWindowResizer } from "@/app/hooks/useWindowResize";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

interface RequestCardProps {
  request: {
    status: string;
    imgsrc: string;
    des: string;
    id: string;
    postedBy: string;
    timestamp: string;
  };
}

export function RequestCard({ request }: RequestCardProps) {

   const {isMobile} = useWindowResizer();
  return (
    <div className="w-full space-y-3 border-b border-gray-300 p-2 md:p-4">
      <div className="flex justify-between">
        <h4>Inspection Request</h4>{" "}
        <span className="text-gray-400 text-xs">{request.timestamp}</span>
      </div>
      <div className="flex  gap-4 md:gap-14 items-center ">
        <Image
          src={request.imgsrc}
          alt="notification image"
          width={ isMobile? 64 : 100}
          height={isMobile? 64 : 100}
          className="object-contain"
        />
        <div className="flex gap-2 mr-auto flex-col">
          <p className="md:text-xl flex flex-col md:flex-row items-center gap-2 font-semibold">
           <span className="w-[150px] truncate">{request.des}</span>  <span> <span className="text-gray-400">posted by</span> {request.postedBy}</span>
          
          </p>
          <span className="flex flex-col md:flex-row items-center gap-5">
            <span className="text-sm text-gray-500">
              Property ID: {request.id}
            </span>
            <span
              className={`rounded-full px-4 py-1 ${
                request.status === "Approved"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {request.status}
            </span>
          </span>
        </div>
        <div className="">
          <button
            className={`${request.status === "Approved" ? "" : "underline"}`}
          >
            {request.status === "Approved" ? <FaTimes /> : "Reschedule"}
          </button>
        </div>
      </div>
    </div>
  );
}
