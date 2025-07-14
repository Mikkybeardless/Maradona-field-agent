"use client";

import { useWindowResizer } from "@/app/hooks/useWindowResize";
import Image from "next/image";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import Link from "next/link";

interface InspectionCardProps {
  inspection: {
    imgsrc: string;
    des: string;
    id: string;
    postedBy: string;
    timestamp: string;
    location: string;
    phone: string;
    date: string;
    time: string;
  };
}

export function InspectionCard({ inspection }: InspectionCardProps) {
  const { isMobile } = useWindowResizer();
  return (
    <div className="w-full space-y-3 border-b border-gray-300  p-4">
      <div className="flex justify-between">
        <h4>Upcoming Inspection</h4>{" "}
        <span className="text-gray-400 text-xs">{inspection.timestamp}</span>
      </div>
      <div className="flex gap-4 md:gap-14 items-center ">
        <Image
          src={inspection.imgsrc}
          alt="notification image"
          width={isMobile ? 64 : 100}
          height={isMobile ? 64 : 100}
          className="object-contain"
        />
        <div className="flex gap-2 mr-auto flex-col">
          <p className="md:text-xl flex flex-col md:flex-row items-center gap-2 font-semibold">
            <span className="w-[150px] truncate">{inspection.des}</span>{" "}
            <span>
              {" "}
              <span className="text-gray-400">posted by</span>{" "}
              {inspection.postedBy}
            </span>
          </p>
          <div className="flex flex-col md:flex-row md:items-center gap-3  md:gap-5">
            <span className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <FaPhoneAlt className="text-[#FD8133]" />{" "}
              <span>{inspection.phone}</span>
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <FaLocationDot className="text-[#FD8133]" />{" "}
              <span>{inspection.location}</span>
            </span>
          </div>

          <div className="flex items-center  md:gap-5">
            <span className="text-sm text-gray-500">{inspection.date}</span>
            <GoDotFill className="text-gray-500" />
            <span className="text-sm text-gray-500">{inspection.time}</span>
            <button className="underline md:block hidden">Reshedule</button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Link
            href={`/dashboard/inspection-details`}
            className={`border  border-orange text-orange text-xs flex md:text-base px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-orange-100`}
          >
            view details
          </Link>
          <button className="underline  md:hidden">Reshedule</button>
        </div>
      </div>
    </div>
  );
}
