"use client";

import { EditPasswordModal } from "@/app/_components/modals/change-password-modal";
import { EditProfileModal } from "@/app/_components/modals/edit-profile-modal";
import { EditPaymentModal } from "@/app/_components/modals/payment-modal";
import { ArrowRight2, Camera, Copy, Edit2 } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsToggleOff, BsToggleOn } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { IoMdMan } from "react-icons/io";

export default function Page() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const [isPaymentModal, setPaymentModal] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  return (
    <>
      <section className="mt-11 flex flex-col mb-10 md:w-2/5 mx-auto">
        {/* Modals */}
        <EditProfileModal
          isOpen={isEditing}
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

        <div className="flex items-center gap-2.5 mb-20">
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
            <div className="mx-auto mb-4 grid place-items-center w-fit relative">
              <Image
                src="/profilePic.png"
                width={100}
                height={100}
                alt="logo"
                className=" rounded-full object-contain"
              />
              <button
                type="button"
                className="size-6 bg-gray-100 shadow-md rounded-full grid place-items-center absolute bottom-0 right-1.5"
              >
                <Camera size={16} color="#000000" />
              </button>
            </div>

            <div className="w-fit text-center mx-auto mt-4">
              <h2 className="text-xl font-semibold">Rosemary Sunday</h2>
              <div className="text-center text-gray-600 flex items-center gap-2">
                <p className="text-sm">rosiesunday20.aj@gmail.com</p>
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
                <Edit2 size={24} />
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
              <section className="p-5 grid grid-cols-2 gap-4 text-sm">
                <h6 className="text-[#5C4D58]">Staff ID:</h6>
                <p className="text-[#150A13]">DS12000000</p>
                <h6 className="text-[#5C4D58]">Phone:</h6>
                <div className="flex items-center gap-2">
                  <p className="text-[#150A13]">07056440321</p>
                  <Copy size={16} color="#ACA0A9" />
                </div>
                <h6 className="text-[#5C4D58]">Address:</h6>
                <p className="text-[#150A13]">Lagos, Nigeria</p>
                <h6 className="text-[#5C4D58]">Phone Number:</h6>
                <p className="text-[#150A13]">0123456789</p>
              </section>
            </div>
            <div className="bg-white border border-[#EAE6E9] rounded-lg">
              <header className="px-5 py-3 border-b border-[#EAE6E9">
                <h5 className="text-xl text-[#150A13] font-medium">Role</h5>
              </header>
              <section className="p-5 grid grid-cols-2 gap-4 text-sm">
                <h6 className="text-[#5C4D58]">User Type:</h6>
                <p className="text-[#150A13]">Agent</p>
                <h6 className="text-[#5C4D58]">Staff Type:</h6>
                <p className="text-[#150A13] flex items-center gap-1">
                  <IoMdMan size={15} />
                  Field Agent
                </p>
                <h6 className="text-[#5C4D58]">Availability:</h6>
                <p className="text-[#150A13] flex items-center gap-1">
                  <GoDotFill
                    className={`${
                      isActive ? "text-green-500" : "text-yellow-500"
                    }`}
                  />
                  {isActive ? "Active" : "Away"}
                </p>
                <h6 className="text-[#5C4D58]">Active</h6>
                <button
                  className="text-[40px]"
                  onClick={() => setIsActive((prev) => !prev)}
                  type="button"
                >
                  {isActive ? (
                    <BsToggleOff size={30} />
                  ) : (
                    <BsToggleOn size={30} />
                  )}
                </button>
              </section>
            </div>
            <div className="bg-white flex justify-between p-4 border border-[#EAE6E9] rounded-lg">
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
            </div>
            <div className="bg-white border border-[#EAE6E9] rounded-lg">
              <header className="px-5 py-3 border-b border-[#EAE6E9">
                <h5 className="text-xl text-[#150A13] font-medium">Password</h5>
              </header>
              <section className="p-5 text-sm">
                <div className="flex w-full items-end gap-4">
                  <div className="space-y-2 flex-grow">
                    <label
                      htmlFor="password"
                      className="text-gray-800 text-sm font-medium"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="********"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange"
                    />
                  </div>
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
          </section>
        </section>
      </section>
    </>
  );
}
