"use client";
import { useState } from "react";
import Link from "next/link";

export const NewPasswordCard = () => {
  const [resetData, setResetData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setResetData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the password reset logic
    console.log("Resetting password with data:", resetData);
    // Reset form fields after submission
    setResetData({
      newPassword: "",
      confirmPassword: "",
    });
  };
  return (
    <section className="space-y-3">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <header className="mb-8 space-y-2 text-center mx-auto">
          <h5 className="font-medium text-black text-2xl">
            Reset your password
          </h5>
        </header>
        <form onSubmit={handleSubmit}>
          <div className="space-y-1 mb-8">
            <label htmlFor="newPassword" className="font-work-sans">
              New password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={resetData.newPassword}
              onChange={handleLoginChange}
              className="w-full p-4 border border-[#ccc] rounded-md"
              placeholder="New password"
            />
          </div>
          <div className="space-y-1 mb-8">
            <label htmlFor="confirmPassword" className="font-work-sans">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={resetData.confirmPassword}
              onChange={handleLoginChange}
              className="w-full p-4 border border-[#ccc] rounded-md"
              placeholder="Confirm password"
            />
          </div>

          <Link href="/authentication/confirmation">
            <button
              type="submit"
              className="bg-orange w-full p-4 rounded-md text-white font-medium"
            >
              Reset Password
            </button>
          </Link>
        </form>
      </div>

      <Link
        href="/authentication/login"
        className="mx-auto w-fit gap-2 flex items-center"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33333 15.8333L2.5 9.99996M2.5 9.99996L8.33333 4.16663M2.5 9.99996H17.5"
            stroke="#1F0E1C"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back to Login
      </Link>
    </section>
  );
};
