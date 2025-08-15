"use client";

import Image from "next/image";
import LogoutIcon from "@/app/_assets/icons/log-out.svg";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoggingOut?: boolean;
}

export const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoggingOut = false,
}: ModalProps) => {
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
      role="dialog"
      aria-modal="true"
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white space-y-3 px-6 py-4 rounded-lg shadow-lg w-full max-w-md md:max-w-[500px] flex flex-col">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-semibold">Logout</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-200 p-2 hover:bg-gray-300"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-3 text-center">
          <Image src={LogoutIcon} width={100} height={100} alt="logout icon" />
          <h3 className="font-semibold text-xl">
            Are you sure you want to logout?
          </h3>
          <p className="text-sm text-gray-600">
            You will need to login again to access your dashboard.
          </p>
        </div>

        <div className="flex justify-between pt-4 border-t mt-2">
          <button
            onClick={onClose}
            className="text-orange hover:bg-orange hover:text-white border border-orange rounded-xl py-2 px-6"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="bg-orange hover:bg-orange-600 text-white rounded-xl py-2 px-6"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>
    </div>
  );
};
