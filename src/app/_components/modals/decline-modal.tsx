"use client";

import { Add } from "iconsax-react";
import { AnimatedCirclesImage } from "../common/animatedWarning";
import { useState } from "react";
import { InspectionResultData } from "@/app/api/services/inspection.service";
import { toast } from "react-toastify";
import axios from "axios";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: number;
}

export const DeclineModal: React.FC<ModalProps> = ({ isOpen, onClose, id }) => {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (!isOpen) return null;

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDecline = async () => {
    const submitData: InspectionResultData = {
      status: "failed",
      notes: reason,
    };
    try {
      setIsSubmitting(true);
      const response = await axios.post(`/api/inspections/${id}`, submitData);
      if (response.status === 200) {
        toast.success("Inspection declined successfully.");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to decline inspection. Please try again.");
      console.error("Error declining inspection:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white space-y-11 p-6 rounded-lg shadow-lg w-full max-w-[600px]">
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
          <div className="flex flex-col gap-4 items-center justify-center mb-4 p-4 ">
            <AnimatedCirclesImage />
            <p className="text-[#040421] font-semibold">
              Are you sure you want to decline this property for sale?
            </p>
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
              rows={6}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </section>
        <div className="flex items-center justify-between gap-6  w-full">
          <button
            onClick={handleDecline}
            className="px-10 w-full py-2 rounded-xl border-orange bg-orange text-white border focus:outline-none"
          >
            {isSubmitting ? "Submitting..." : "Decline"}
          </button>
          <button
            onClick={onClose}
            className="px-10 w-full py-2 rounded-xl border-orange text-orange border focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
