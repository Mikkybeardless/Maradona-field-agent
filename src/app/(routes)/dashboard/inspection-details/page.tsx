"use client";

import { ArrowRight2, Calendar2, Clock, Location } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import house from "@/app/_assets/images/house.png";
import Rating from "@/app/_assets/images/Ratings.png";
import { RescheduleModal } from "@/app/_components/reschedule-modal/reschedule-modal";
import { useState } from "react";
import ProductCarousel from "@/app/_components/ProductCarousel";
import { TiLocationOutline } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { ProgressUI } from "@/app/_components/common/progressBar";
import { BsStars } from "react-icons/bs";
import { LuHouse } from "react-icons/lu";
import { BookingModal } from "@/app/_components/modals/booking-modal";
import { SellerInfoModal } from "@/app/_components/modals/sellerInfo-modal";
import { FaCheck, FaTimes } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { ApproveModal } from "@/app/_components/modals/approve-modal";
import { DeclineModal } from "@/app/_components/modals/decline-modal";

type Schedule = {
  date: string;
  time: string;
};

export default function Page() {
  const items = [
    { title: "Bedrooms", text: "2 spacious bedrooms with built-in wardrobes." },
    {
      title: "Bathrooms",
      text: "2.5 bathrooms, including an ensuite in the master bedroom.",
    },
    {
      title: "Living Area",
      text: "Open-plan living and dining area with high ceilings and plenty of natural light.",
    },
    {
      title: "Kitchen",
      text: "Fully equipped modern kitchen with stainless steel appliances, granite countertops, and ample storage space.",
    },
    {
      title: "Outdoor Space",
      text: "Private backyard with a patio area, perfect for entertaining or relaxing.",
    },
    {
      title: "Parking",
      text: "Attached garage with space for two cars and additional storage.",
    },
    {
      title: "Additional Amenities",
      text: "Central air conditioning, heating, laundry room, and smart home features.",
    },
  ];
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [BookModal, setBookModal] = useState<boolean>(false);
  const [contactModal, setContactModal] = useState(false);
  const [schedule, setShedule] = useState<Schedule>({ date: "", time: "" });
  const [approvedModal, setApprovedModal] = useState<boolean>(false);
  const [declinedModal, setDeclinedModal] = useState<boolean>(false);

  return (
    <div className=" flex flex-col  gap-14">
      <RescheduleModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <BookingModal
        isOpen={BookModal}
        onClose={() => setBookModal(false)}
        onConfirm={() =>
          setShedule({
            date: selectedSession || "",
            time: selectedTime || "",
          })
        }
      />
      <SellerInfoModal
        isOpen={contactModal}
        onClose={() => setContactModal(false)}
      />
      <ApproveModal
        isOpen={approvedModal}
        onApprove={() => {
          console.log("Approved");
          setApprovedModal(false);
        }}
        onClose={() => setApprovedModal(false)}
      />
      <DeclineModal
        onDecline={() => {
          console.log("Declined");
          setDeclinedModal(false);
        }}
        isOpen={declinedModal}
        onClose={() => setDeclinedModal(false)}
      />
      <section className="">
        <div className="md:flex items-center hidden gap-2.5 my-7 ">
          <Link className="text-xs" href="/dashboard/overview">
            Home
          </Link>
          <ArrowRight2 size={20} color="#5C4D58" />
          <Link className="text-xs" href="/dashboard/inspection-requests">
            Inspection Requests
          </Link>
          <ArrowRight2 size={20} color="#5C4D58" />
          <Link className="text-xs" href="/dashboard/inspection-details">
            Inspection Details
          </Link>
        </div>
        <section>
          <header className="flex items-center justify-between mb-16">
            <h6 className="text-black text-2xl font-semibold">
              Inspection Detail
            </h6>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-5">
              <span className="">Status</span>
              <span className="bg-[#FFFAEB] flex gap-x-1 items-center text-orange px-5 rounded-lg py-3">
                <GoDotFill /> Pending
              </span>
            </div>

            {/* Mobile */}
            <button className="underline md:hidden ">Mark as completed</button>
          </header>
          <section>
            <div className="flex flex-col md:flex-row gap-10 items-start justify-between">
              {/* Left */}
              <section className="w-full md:w-[50%] ">
                <ProductCarousel
                  images={[house.src, house.src, house.src, house.src]}
                />
              </section>
              {/* right */}
              <section className="w-full  md:w-[50%] ">
                <header className="flex items-center gap-12 text-[#585858] text-sm mb-9">
                  <p>Request ID:</p>
                  <p>1234DSFA</p>
                </header>
                <section className="space-y-5">
                  <p className="text-3xl text-[#040421] font-bold">
                    2-Bedroom Duplex with Modern Amenities
                  </p>
                  <p className="text-[#040421] flex items-center gap-x-1">
                    <TiLocationOutline />
                    Lagos, Nigeria
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-[#175CD3] bg-[#D1E9FF] border border-[#175CD3] border-1 rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium">
                      <LuHouse /> Houses
                    </span>
                    <span className="text-[#FD8133] bg-[#FFFAEB] border border-[#FD8133] border-1 rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium">
                      <BsStars /> Brand New
                    </span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-[#040421]">
                      A stunning 2-bedroom duplex located in the heart of the
                      city. This property offers a perfect blend of modern
                      design and comfortable living, ideal for families or
                      professionals looking for a convenient and stylish home.
                    </p>
                    <div className="flex gap-x-3 items-center">
                      {Array.from({ length: 5 }, (_, i) => {
                        const index = i + 1;
                        return (
                          <FaStar
                            key={index}
                            className={`cursor-pointer transition-colors duration-200 text-[#FFD700]  `}
                          />
                        );
                      })}
                      <p className="text-[#585858]">214 reviews</p>
                    </div>

                    {schedule.date.trim() && schedule.time.trim() && (
                      <div className="space-y-3 ">
                        <div className="p-4 bg-[#DCFAE6] rounded-xl">
                          <div className="flex items-center gap-2 mb-3">
                            <RiErrorWarningLine size={24} />
                            <p className="text-[#585858]">
                              You have scheduled an inspection for{" "}
                              {schedule.date} at {schedule.time}
                            </p>
                          </div>

                          <button
                            className="underline hover:text-blue-600"
                            onClick={() => setContactModal(true)}
                          >
                            Contact Seller
                          </button>
                        </div>

                        <div className="flex gap-5 justify-between">
                          <button
                            onClick={() => setApprovedModal(true)}
                            className="bg-orange flex items-center gap-3 justify-center hover:bg-inherit hover:border-orange hover:text-orange border rounded-xl py-2 w-full text-white"
                          >
                            <FaCheck /> Approve
                          </button>
                          <button
                            onClick={() => setDeclinedModal(true)}
                            className="hover:bg-orange flex items-center gap-3 justify-center bg-inherit border-orange text-orange border rounded-xl py-2 w-full hover:text-white"
                          >
                            <FaTimes /> Decline
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-white p-4 rounded-lg space-y-4 shadow-md">
                    <h5 className="font-medium text-lg mb-2">
                      Open days for inspection
                    </h5>
                    <div>
                      <p>Book session for you to go inspect</p>
                      <div className="flex items-center gap-x-10 overflow-x-auto mt-4">
                        {["Sun", "Mon", "Tues", "Wed", "Thur", "Fri"].map(
                          (item, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedSession(item)}
                              className={`${
                                selectedSession === item &&
                                "bg-[#E8E8F4] border-[#4345AA] border"
                              } rounded-lg p-2 mb-2 shadow-md flex flex-col items-center gap-1 `}
                            >
                              <span className="font-semibold">{item}</span>
                              <span className="text-sm text-[#585858] font-medium">
                                {` 0${i + 1} Nov`}
                              </span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    <div className="space-y-1.5 mt-2">
                      <p>Choose Time</p>
                      <hr className="mb-4" />
                      <div className="flex items-center gap-x-7 overflow-x-auto mt-4">
                        {[
                          "1:00PM",
                          "2:00PM",
                          "3:00PM",
                          "4:00PM",
                          "5:00PM",
                          "6:00PM",
                        ].map((item, i) => (
                          <button
                            key={i}
                            onClick={() => setSelectedTime(item)}
                            className={`${
                              selectedTime === item &&
                              "bg-[#E8E8F4] border-[#4345AA] border"
                            } rounded-lg p-2 mb-2 shadow-md  items-center gap-1 `}
                          >
                            <span className="text-sm text-[#585858] flex font-medium">
                              {item}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => setBookModal(true)}
                      className="w-full py-2 bg-orange rounded-xl hover:bg-inherit hover:border hover:border-orange text-white hover:text-orange"
                    >
                      Schedule Inspection
                    </button>
                  </div>
                  {/* key features  */}
                  <div>
                    <p className="text-sm text-[#585858]">Key Features:</p>
                    <ul className="list-disc text-sm pl-5 text-[#040421]">
                      {items.map((item, index) => (
                        <li key={index} className="mb-2">
                          <span className="font-bold ">{item.title}:</span>{" "}
                          <span className="font-normal">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              </section>
            </div>
            {/* seller details */}
            <section className="bg-white w-full md:px-20 px-4 py-10 mt-5">
              <header className="mb-7">
                <h5 className="font-medium text-lg">About seller</h5>
              </header>
              <section className="flex flex-col md:flex-row items-center gap-10 ">
                {/* left */}
                <div className="flex flex-col w-full md:w-1/2 gap-10  items-center border-b md:border-b-0 md:border-r pb-4 md:pb-0 border-[#EAE6E9] md:pr-5">
                  <div className="flex flex-col md:flex-row items-center gap-10">
                    <Image
                      src="/profilePic.png"
                      width={100}
                      height={100}
                      alt="logo"
                      className=" rounded-full object-contain"
                    />
                    <div className="space-y-2">
                      <p className="font-medium text-2xl text-[#040421]">
                        Rosemary Sunday
                      </p>
                      <p className="text-[#585858] font-medium">
                        6.4K <span>items sold</span>{" "}
                      </p>
                      <div className="space-y-1.5 mb-5">
                        <div className="flex items-center gap-2">
                          <Calendar2 size={24} color="#E65800" />
                          <p className="text-[#585858] font-medium">
                            Joined Aug, 2023
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={24} color="#E65800" />
                          <p className="text-[#585858] font-medium">
                            Usually responds within 24 hours
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Location size={24} color="#E65800" />
                          <p className="text-[#585858] font-medium">
                            No2 Aminu Kano crescent, Lagos, Nigeria
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setContactModal(true)}
                    className="w-full py-2 hover:bg-orange rounded-xl bg-inherit border border-orange hover:text-white text-orange"
                  >
                    Contact
                  </button>
                </div>

                {/* right */}

                <div className=" w-full flex flex-col items-center space-y-5 md:w-1/2 ">
                  <Image
                    width={200}
                    height={200}
                    alt="Rating logo"
                    className="object-contain"
                    src={Rating}
                  />
                  <h6 className="text-[#6263B8] font-semibold text-xl">
                    Ratings average for the last 12 hours
                  </h6>
                  <div className="flex flex-col gap-4 ">
                    {[
                      "Accurate description",
                      "Reasonable Shipping cost",
                      "Shipping speed",
                      "Communication",
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between gap-2 items-center"
                      >
                        <p className="text-[#585858] w-[200px]">{item}</p>
                        <div className="md:w-[200px] w-[70px]">
                          <ProgressUI
                            rangeColor="#141695"
                            wholeColor="#E4E7EC"
                            rangePercent="20%"
                          />
                        </div>
                        <p className="text-[#8B3500]  flex items-center gap-x-1">
                          {" "}
                          <FaStar
                            size={12}
                            className={`cursor-pointer transition-colors duration-200 text-[#FFD700]  `}
                          />
                          4.9
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </section>
          </section>
        </section>
      </section>
    </div>
  );
}
