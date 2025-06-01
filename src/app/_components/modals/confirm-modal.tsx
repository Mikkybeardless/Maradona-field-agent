"use client";

import Image from "next/image";
import AlertIcon from "@/app/_assets/icons/alert-circle.svg"; // Adjust the path as necessary
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InspectionApprovedModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white space-y-11 p-6 rounded-lg shadow-lg w-[300px] flex items-center justify-center max-w-[700px]">
        <div className="mt-5 flex items-center justify-between gap-x-3 border-b pb-1 ">
          <h2 className="text-2xl font-semibold">Confirm Booking</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-200 p-3 hover:underline"
          >
            <FaTimes size={16} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Image src={AlertIcon} width={100} height={100} alt="check image" />
          <h3 className="font-semibold text-xl">
            Are you sure you want to proceed?
          </h3>
          <p className="text-xs">
            Deleting 5 selected items from your request table cannot be undone.
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <button className="text-orange hover:bg-inherit border-orange hover:text-white hover:bg-orange border rounded-lg py-2 px-4 ">
            Cancel
          </button>

          <button className="bg-orange hover:bg-inherit hover:border-orange hover:text-orange border rounded-lg py-2 px-4 text-white">
            Delete 5 items
          </button>
        </div>
      </div>
    </div>
  );
};
