"use client";

import { Add } from "iconsax-react";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  controlledData: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  onSubmit?: (data: Record<string, string>) => void;
}

export const EditProfileModal = ({
  isOpen,
  onClose,
  onSubmit,
  controlledData,
}: ModalProps) => {
  const [formData, setFormData] = useState({
    name: controlledData.name,
    email: controlledData.email,
    phone: controlledData.phone,
    location: controlledData.location,
  });

  if (!isOpen) return null;

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle input change logic here
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white space-y-11 p-6 rounded-lg shadow-lg w-[47.75rem]">
        <header className="w-full flex items-center justify-between">
          <h5 className="text-3xl text-[#1F0E1C] font-semibold">
            Edit Profile
          </h5>
          <button
            type="button"
            onClick={onClose}
            className="bg-[#F4F1F3] rounded-full size-12 grid place-items-center"
          >
            <Add size={32} className="rotate-45" />
          </button>
        </header>
        <form onSubmit={handleSubmit}>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-4">
            <div className="space-y-1.5">
              <label htmlFor="firstName" className="text-gray-800 font-medium">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 text-sm py-2.5 border border-[#B5ABB3] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="email" className="text-gray-800 font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 text-sm py-2.5 border border-[#B5ABB3] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="phone_no" className="text-gray-800 font-medium">
                Phone Number
              </label>
              <input
                type="text"
                id="phone_no"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 text-sm py-2.5 border border-[#B5ABB3] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="address" className="text-gray-800 font-medium">
                Address
              </label>
              <input
                type="text"
                id="location"
                placeholder="Address"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 text-sm py-2.5 border border-[#B5ABB3] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>
          </section>
          <div className="flex items-center gap-3 mt-4 ml-auto w-fit">
            <button
              onClick={onClose}
              className="px-10 py-2.5 rounded-lg border-orange text-orange border focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!formData.name || !formData.email || !formData.phone}
              className="px-10 py-2.5 rounded-lg border-orange bg-orange text-white border focus:outline-none"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
