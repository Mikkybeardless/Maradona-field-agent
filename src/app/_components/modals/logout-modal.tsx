"use client";

import Image from "next/image";
import LogoutIcon from "@/app/_assets/icons/log-out.svg"; // Adjust the path as necessary
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}



export const LogoutModal: React.FC<ModalProps> = ({
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
      <div className="bg-white space-y-3 px-6 py-2 rounded-lg shadow-lg w-[500px] flex flex-col max-w-[50%]">
        <div className="mt-2 flex items-center justify-between gap-x-3 border-b pb-1 ">
          <h2 className="text-2xl font-semibold">Logout</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-200 p-3 hover:underline"
          >
            <FaTimes size={16} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-3">
        <Image src={LogoutIcon} width={100} height={100} alt="warn image" />
        <h3 className="font-semibold text-xl">
          Are you sure you want to Logout?
        </h3>
        <p className="text-xs">
          You will need to login again to access your dashboard.
        </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <button onClick={onClose} className="text-orange hover:bg-inherit border-orange hover:text-white hover:bg-orange border rounded-xl py-2 px-4 md:px-10 ">
            Cancel
          </button>

          <button onClick={onClose} className="bg-orange hover:bg-inherit hover:border-orange hover:text-orange border rounded-xl py-2 px-4 md:px-10 text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
