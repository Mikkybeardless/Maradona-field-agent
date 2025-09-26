"use client";

import { useState } from "react";
import "react-international-phone/style.css";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Spinner } from "../common/spinner";
import axios from "axios";
import Link from "next/link";

export const SignUpCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_no: "",
    document: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would typically send the formData to your backend service
    // console.log("Form submitted with data:", formData);
    try {
      const res = await axios.post("/api/auth/signup", formData);
      if (res.status === 201) {
        toast.success("Signup successful");
        router.push("/authentication/login");
      }
    } catch (error: unknown) {
      toast.error("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  };
  return (
    <section className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl font-medium">
      <form onSubmit={handleSubmit}>
        <div className="space-y-1 mb-5">
          <label htmlFor="name" className="font-work-sans">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border border-[#ccc] rounded-md"
            placeholder="full name"
          />
        </div>
        <div className="space-y-1 mb-5">
          <label htmlFor="email" className="font-work-sans">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border border-[#ccc] rounded-md"
            placeholder="Email"
          />
        </div>

        <div className="space-y-1 relative mb-5">
          <label htmlFor="password" className="font-work-sans">
            Password
          </label>
          <input
            type={passwordInputType}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 border border-[#ccc] rounded-md"
            placeholder="Password"
          />
          <button
            type="button"
            className="absolute right-4 top-10"
            onClick={() => {
              if (passwordInputType == "password") {
                setPasswordInputType("text");
              }
              if (passwordInputType == "text") {
                setPasswordInputType("password");
              }
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.7439 9.47233L20.7438 9.47212C18.5174 5.97345 15.3099 4.02999 12 4.02999C10.3405 4.02999 8.71849 4.51403 7.22508 5.43061C5.73105 6.35756 4.37339 7.71933 3.25606 9.47233H20.7439ZM20.7439 9.47233C21.1693 10.1401 21.4 11.0541 21.4 11.9987C21.4 12.9435 21.1692 13.8542 20.7449 14.5162L20.744 14.5175C19.6267 16.2706 18.269 17.6324 16.7749 18.5594C15.2815 19.476 13.6595 19.96 12 19.96C8.68944 19.96 5.48241 18.0258 3.2566 14.5185L3.25606 14.5177M20.7439 9.47233L3.25606 14.5177M3.25606 14.5177C2.83056 13.8496 2.6 12.938 2.6 11.995M3.25606 14.5177L2.6 11.995M2.6 11.995C2.6 11.052 2.83052 10.1405 3.25597 9.47248L2.6 11.995ZM7.36 12C7.36 14.5604 9.42766 16.64 12 16.64C14.5723 16.64 16.64 14.5604 16.64 12C16.64 9.43959 14.5723 7.35999 12 7.35999C9.42766 7.35999 7.36 9.43959 7.36 12Z"
                stroke="#6A2900"
                stroke-width="1.2"
              />
              <path
                d="M9.7499 12C9.7499 10.75 10.7626 9.74001 11.9999 9.74001C13.2385 9.74001 14.2599 10.7614 14.2599 12C14.2599 13.2359 13.2413 14.25 11.9999 14.25C10.7613 14.25 9.7499 13.2386 9.7499 12Z"
                stroke="#6A2900"
                stroke-width="1.2"
              />
            </svg>
          </button>
        </div>
        {/* <div className="space-y-1 mb-5">
            <label htmlFor="gender" className="font-work-sans">
              Residential Address
            </label>
            <div className=" w-full p-4 border border-[#ccc] rounded-md">
              <select
                id="gender"
                name="gender"
                className=" w-full bg-transparent"
              >
                <option value="" disabled selected></option>
                <option value="M">Male</option>
                <option value="F">Male</option>
              </select>
            </div>
          </div>
          <div className="space-y-1 mb-5">
            <label htmlFor="gender" className="font-work-sans">
              ID Type
            </label>
            <div className=" w-full p-4 border border-[#ccc] rounded-md">
              <select
                id="gender"
                name="gender"
                className=" w-full bg-transparent"
              >
                <option value="" disabled selected></option>
                <option value="M">Male</option>
                <option value="F">Male</option>
              </select>
            </div>
          </div>
          <div className=" mb-5">
            <FileUpload2
              title="Upload ID for verification"
              acceptedFileTypes={{
                "image/jpeg": [],
                "image/png": [],
                "application/pdf": [],
              }}
              maxSizeMB={20}
            />
          </div> */}

        <button
          type="submit"
          className="bg-orange hover:bg-amber-700 w-full p-4 rounded-md text-white font-medium"
        >
          {isLoading ? <Spinner /> : "Create Account"}
        </button>
      </form>
      <Link href="/authentication/login" className="hover:underline">
        <div className="flex justify-center mt-4 items-center gap-3 ">
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
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Back to Login</span>
        </div>
      </Link>
    </section>
  );
};
