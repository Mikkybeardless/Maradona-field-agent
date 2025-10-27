"use client";

import { validateLocalBankDetails } from "@/app/helper/helperFunction";
import axios from "axios";
import { Add } from "iconsax-react";
import { useState } from "react";
import { toast } from "react-toastify";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  bank_name: string;
  bank_account_number: string;
  onChange: (field: string, value: string) => void;
}

export const EditPaymentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  bank_name,
  bank_account_number,
  onChange,
}) => {
  const [accountDetails, setAccountDetails] = useState({
    bank_name,
    bank_account_number,
  });
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const updateProfile = async (data: UpdateProfileDto) => {
    setIsLoading(true);

    try {
      const res = await axios.put("/api/auth/profile", data);
      if (res.status === 200) {
        toast.success("Profile updated successfully");
        onClose();
      }
    } catch (error) {
      toast.error("Error updating profile");
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdate = () => {
    const result = validateLocalBankDetails(
      accountDetails.bank_name,
      accountDetails.bank_account_number
    );
    if (!result.isValid) {
      toast.error(
        result.errors.accountName ||
          result.errors.accountNumber ||
          "Invalid bank details"
      );
      return;
    }
    // check if accountdetails is valid
    onChange("bank_name", accountDetails.bank_name);
    onChange("bank_account_number", accountDetails.bank_account_number);
    updateProfile(accountDetails);
    onClose();
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white space-y-11 p-6 rounded-lg shadow-lg w-[500px] max-w-[700px]">
        <header className="w-full flex items-center justify-between">
          <h5 className="text-3xl text-[#1F0E1C] font-semibold">
            Payment Info
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
          <div className="space-y-1.5">
            <label htmlFor="bank" className="text-gray-800 font-medium">
              Bank Name
            </label>
            <input
              type="text"
              id="bank"
              placeholder="Enter name of bank"
              value={accountDetails.bank_name}
              className="w-full px-4 text-sm py-2.5 border border-[#B5ABB3] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
              onChange={(e) =>
                setAccountDetails((prev) => ({
                  ...prev,
                  bank_name: e.target.value,
                }))
              }
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="accNumber" className="text-gray-800 font-medium">
              Account Number
            </label>
            <input
              type="text"
              id="accNumber"
              placeholder="Enter account number"
              value={accountDetails.bank_account_number}
              className="w-full px-4 text-sm py-2.5 border border-[#B5ABB3] rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
              onChange={(e) =>
                setAccountDetails((prev) => ({
                  ...prev,
                  bank_account_number: e.target.value,
                }))
              }
            />
          </div>
        </section>
        <div className="flex items-center gap-3 ml-auto w-fit">
          <button
            onClick={() => {
              setAccountDetails({
                bank_name: bank_name,
                bank_account_number: bank_account_number,
              });
              onClose();
            }}
            className="px-10 py-2.5 rounded-lg border-orange text-orange border focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-10 py-2.5 rounded-lg border-orange bg-orange text-white border focus:outline-none"
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};
