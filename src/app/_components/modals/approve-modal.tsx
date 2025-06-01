"use client";

import { Add } from "iconsax-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApproveModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
            Approve Property
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
          <div className="border-l-2 border-orange p-4 mb-4 bg-[#FFFAEB]">
            <p>
              "Approving this property means you've verified all necessary
              details during inspection. This action cannot be undone."
            </p>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="comment" className="text-gray-800 font-medium">
              Final Comment (Optional)
            </label>
            <textarea
              className="w-full px-4 text-sm py-2.5 border border-[#B5ABB3] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
              placeholder="Enter final message"
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
            Yes, I approve
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
