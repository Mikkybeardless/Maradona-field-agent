"use client";

import { Add } from "iconsax-react";
import Image from "next/image";
import warningImage from "@/app/_assets/icons/warn.svg"; // Adjust the path as necessary

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeclineModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
      <div className="bg-white space-y-11 p-6 rounded-lg shadow-lg w-[500px] max-w-[700px]">
        <header className="w-full flex items-center justify-between p-3 border-b border-[#EAE6E9]">
          <h5 className="text-3xl text-[#1F0E1C] font-semibold">
            Decline Property
          </h5>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#F4F1F3] rounded-full size-12 grid place-items-center"
          >
            <Add size={32} className="rotate-45" />
          </button>
        </header>
        <section className="grid grid-cols-1  gap-y-4">
          <div className="flex flex-col gap-4 items-center justify-center mb-4 p-4 bg-[#FFFAEB] ">
            <Image
              src={warningImage}
              width={50}
              height={50}
              alt="warning image"
            />
            <p>Are you sure you want to decline this property for sale?</p>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="comment" className="text-gray-800 font-medium">
              Reason for Decline
            </label>
            <textarea
              className="w-full px-4 text-sm py-2.5 border border-[#B5ABB3] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
              placeholder="Write reason for decline"
              name="comment"
              id="comment"
              rows={3}
            ></textarea>
          </div>
        </section>
        <div className="flex items-center gap-3 ml-auto w-fit">
          <button
            onClick={onClose}
            className="px-10 py-2.5 rounded-lg border-orange bg-orange text-white border focus:outline-none"
          >
            Decline
          </button>
          <button
            onClick={onClose}
            className="px-10 py-2.5 rounded-lg border-orange text-orange border focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
