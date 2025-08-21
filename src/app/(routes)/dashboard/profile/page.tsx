"use client";

import { EditPasswordModal } from "@/app/_components/modals/change-password-modal";
import { EditProfileModal } from "@/app/_components/modals/edit-profile-modal";
import { LogoutModal } from "@/app/_components/modals/logout-modal";
import { EditPaymentModal } from "@/app/_components/modals/payment-modal";
import { RootState } from "@/app/redux/store";
import axios from "axios";
import { ArrowRight2, Copy } from "iconsax-react";
import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { IoMdMan } from "react-icons/io";
// import { RiEdit2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Page() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [isPaymentModal, setPaymentModal] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isLogoutModal, setIsLogoutModal] = useState<boolean>(false);
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchProfile = async () => {
      // const userProfile = await authService.getProfile();
      // console.log("User Profile: ", userProfile);
    };

    fetchProfile();
  }, []);

  const updateProfile = () => {
    // const res = authService.updateProfile(data);
    // console.log("Profile Updated: ", data);
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const res = await axios.post("/api/auth/logout");
      if (res.status === 200) {
        toast.success("Logout successful");
        Cookies.remove("agent_token");
        window.location.href = "/authentication/login";
        console.log("Logout successful:", res.data);
      } else {
        toast.error("logout failed. pls try again");
        console.error("Logout failed:", res.data);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLogoutModal(false);
      setLoggingOut(false);
    }
  };

  return (
    <>
      <section className="md:mt-11 flex flex-col mb-10 md:w-2/5 mx-auto">
        {/* Modals */}
        <EditProfileModal
          isOpen={isEditing}
          onSubmit={updateProfile}
          onClose={() => setIsEditing(false)}
        />
        <EditPasswordModal
          isOpen={isChangingPassword}
          onClose={() => setIsChangingPassword(false)}
        />
        <EditPaymentModal
          isOpen={isPaymentModal}
          onClose={() => setPaymentModal(false)}
        />

        <div className="md:flex hidden items-center gap-2.5 mb-20">
          <Link className="text-xs" href="/dashboard/overview">
            Home
          </Link>
          <ArrowRight2 size={20} color="#5C4D58" />
          <Link className="text-xs" href="/dashboard/profile">
            Profile
          </Link>
        </div>
        <section className="flex flex-col gap-3 items-center">
          <div className="w-full bg-white border border-[#EAE6E9] rounded-lg px-6 py-4">
            <div className="mx-auto mb-4 pt-10 md:pt-2 grid place-items-center w-fit relative">
              <Image
                src="/default_profile.png"
                width={100}
                height={100}
                alt="logo"
                className=" rounded-full object-contain"
              />
              {/* <button
                type="button"
                className="size-6 bg-gray-100 shadow-md rounded-full grid place-items-center absolute bottom-0 right-1.5"
              >
                <Camera size={16} color="#000000" />
              </button> */}
            </div>

            <div className="w-fit text-center mx-auto mt-4">
              <h2 className="text-xl font-semibold">{user?.name}</h2>
              <div className="text-center text-gray-600 flex items-center gap-2">
                <p className="text-sm text-[#150A13]">{user?.email}</p>
                <Copy size={16} color="#ACA0A9" />
              </div>
            </div>

            <div className="w-fit mx-auto text-center flex items-center gap-2 text-gray-600">
              <p>Field Agent</p>
              <div className="size-2 bg-gray-200 rounded-full"></div>
              <p>Lagos, Nigeria</p>
            </div>

            <div className="mt-4 flex flex-col space-y-3">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex justify-center text-orange border-orange border gap-2  py-2 px-4 rounded-lg"
              >
                <FaPen size={24} />
                Edit profile
              </button>
            </div>
          </div>

          <section className=" w-full space-y-3">
            <div className="bg-white border border-[#EAE6E9] rounded-lg">
              <header className="px-5 py-3 border-b border-[#EAE6E9">
                <h5 className="text-xl text-[#150A13] font-medium">
                  Basic Info
                </h5>
              </header>
              <section className="p-5 text-sm">
                <div className="flex items-center gap-2  justify-between mb-3">
                  <h6 className="text-[#5C4D58]">Staff ID:</h6>
                  <p className="text-[#150A13]">{user?.id}</p>
                </div>
                {/* 
                <div className="flex items-center gap-2  justify-between mb-3">
                  {" "}
                  <h6 className="text-[#5C4D58]">Phone:</h6>
                  <div className="flex items-center gap-2">
                    <p className="text-[#150A13]">07056440321</p>
                    <Copy size={16} color="#ACA0A9" />
                  </div>
                </div>
                <div className="flex items-center gap-2  justify-between mb-3">
                  <h6 className="text-[#5C4D58]">Address:</h6>
                  <p className="text-[#150A13]">Lagos, Nigeria</p>
                </div> */}

                <div className="flex items-center gap-2  justify-between mb-3">
                  <h6 className="text-[#5C4D58]">Staff Type:</h6>
                  <p className="text-[#150A13] flex items-center gap-1">
                    <IoMdMan size={15} />
                    Field Agent
                  </p>
                </div>

                <div className="flex items-center gap-2  justify-between mb-3">
                  <h6 className="text-[#5C4D58]">Availability:</h6>
                  <p className="text-[#150A13] flex items-center gap-1">
                    <GoDotFill
                      className={`${
                        isActive ? "text-green-500" : "text-yellow-500"
                      }`}
                    />
                    {isActive ? "Active" : "Away"}
                  </p>
                </div>

                <div className="flex items-center gap-2  justify-between mb-3">
                  <h6 className="text-[#5C4D58]">Active</h6>
                  <button
                    className="text-[40px]"
                    onClick={() => setIsActive((prev) => !prev)}
                    type="button"
                  >
                    {isActive ? (
                      <BsToggleOn className="text-[#FD6100]" size={30} />
                    ) : (
                      <BsToggleOff size={30} />
                    )}
                  </button>
                </div>
              </section>
            </div>

            {/* <div className="bg-white  p-4 border border-[#EAE6E9] rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h5 className="text-xl text-[#150A13] font-medium">
                  Payment Info
                </h5>{" "}
                <button
                  onClick={() => setPaymentModal(true)}
                  type="button"
                  className="flex justify-center text-orange border-orange border gap-2  py-1 px-4 rounded-lg"
                >
                  Add Payment
                </button>
                <button>
                  {" "}
                  <RiEdit2Fill size={30} />
                </button>
              </div>

              <div className="flex items-center gap-2  justify-between mb-3">
                <h6 className="text-[#5C4D58]">Bank Name</h6>
                <p className="text-[#150A13]">First Bank</p>
              </div>
              <div className="flex items-center gap-2  justify-between mb-3">
                <h6 className="text-[#5C4D58]">Account No</h6>
                <p className="text-[#150A13]">07056440321</p>
              </div>
            </div> */}

            <div className="bg-white border border-[#EAE6E9] rounded-lg">
              <header className="px-5 py-3 border-b border-[#EAE6E9">
                <h5 className="text-xl text-[#150A13] font-medium">Password</h5>
              </header>
              <section className="p-5 text-sm">
                <div className="flex w-full items-center justify-between gap-4">
                  <p>***********</p>
                  <button
                    onClick={() => setIsChangingPassword(true)}
                    type="button"
                    className="hover:underline "
                  >
                    Change password
                  </button>
                </div>
              </section>
            </div>

            <div className="flex justify-center">
              <button
                className="text-red-500"
                onClick={() => setIsLogoutModal(true)}
              >
                Logout
              </button>
              <LogoutModal
                onConfirm={handleLogout}
                isOpen={isLogoutModal}
                isLoggingOut={loggingOut}
                onClose={() => setIsLogoutModal(false)}
              />
            </div>
          </section>
        </section>
      </section>
    </>
  );
}
