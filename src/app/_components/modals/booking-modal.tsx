"use client";
import { useEffect, useState } from "react";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import img1 from "@/app/_assets/images/agent.jpg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails?: {
    agentName?: string;
    agentId?: string;
    date?: string;
    time?: string;
  };
  onConfirm?: () => void;
}

export const BookingModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  bookingDetails = {
    agentName: "John Doe",
    agentId: "AGT12345",
    time: "5 pm EST",
    date: "Thur, Nov 7",
  },
  onConfirm,
}) => {
  const currentAgent = {
    name: "John Doe",
    id: "AGT12345",
  };

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  const [show, setShow] = useState(false);

  // Animate on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShow(true), 10); // Slight delay for animation
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end md:items-center justify-center transition-opacity"
    >
      <div
        className={`w-full md:w-[40%] bg-white p-6 transform transition-transform duration-300 ease-in-out ${
          show ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        } rounded-t-2xl md:rounded-[24px]`}
      >
        <div className="mt-5 flex items-center justify-between gap-x-3 border-b pb-1">
          <h2 className="text-2xl font-bold">Confirm Booking</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-200 p-3 hover:underline"
          >
            <FaTimes size={16} />
          </button>
        </div>
        <div className="flex flex-col gap-y-1 mt-5">
          <div className="flex flex-col justify-center mb-14 items-center text-[#585858] gap-y-3">
            <img
              src={img1.src}
              alt="agent profile picture"
              className="w-[97px] h-[97px] rounded-sm object-contain"
            />
            <p>
              Inspection with{" "}
              <span className="font-semibold mr-1 text-black">
                {bookingDetails.agentName || currentAgent.name}
              </span>
              (Buyer)
            </p>
            <p>
              Filed Agent Assigned : <span>{bookingDetails.agentId}</span>
            </p>
            <p className="flex items-center gap-x-3">
              <span className="flex items-center gap-x-1">
                <CiCalendar size={18} className="text-black" />
                {bookingDetails.date || "Thur, Nov 7"}
              </span>
              <span className="flex items-center gap-x-1">
                <CiClock2 size={18} className="text-black" />
                {bookingDetails.time || "5 pm EST"}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <button
              onClick={handleConfirm}
              className="bg-orange hover:bg-inherit hover:border-orange hover:text-orange border rounded-lg py-2 w-full text-white"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
