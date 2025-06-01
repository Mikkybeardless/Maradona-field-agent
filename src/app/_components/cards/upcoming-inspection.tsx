import Image from "next/image";
import { FaPhoneAlt, FaTimes } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

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
  return (
    <div className="w-full space-y-3 border-b border-gray-300  p-4">
      <div className="flex justify-between">
        <h4>Upcoming Inspection</h4>{" "}
        <span className="text-gray-400 text-xs">{inspection.timestamp}</span>
      </div>
      <div className="flex gap-14 items-center ">
        <Image
          src={inspection.imgsrc}
          alt="notification image"
          width={50}
          height={50}
          className="object-contain"
        />
        <div className="flex gap-2 mr-auto flex-col">
          <p className="text-xl flex items-center gap-2 font-semibold">
            {inspection.des} <span className="text-gray-400">posted by</span>{" "}
            {inspection.postedBy}{" "}
          </p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <FaPhoneAlt className="text-[#FD8133]" />{" "}
              <span>{inspection.phone}</span>
            </span>
            <span className="flex items-center gap-1 text-sm font-medium text-gray-600">
              <FaLocationDot className="text-[#FD8133]" />{" "}
              <span>{inspection.location}</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-sm text-gray-500">{inspection.date}</span>
            <GoDotFill className="text-gray-500" />
            <span className="text-sm text-gray-500">{inspection.time}</span>
            <button className="underline">Reshedule</button>
          </div>
        </div>

        <button
          className={`border  border-orange text-orange px-4 py-2 rounded-lg hover:bg-orange-100`}
        >
          view details
        </button>
      </div>
    </div>
  );
}
