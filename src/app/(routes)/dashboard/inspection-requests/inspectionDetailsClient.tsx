"use client";
import { ArrowRight2, Calendar2, Clock, Location } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/app/_assets/images/Ratings.png";
import { RescheduleModal } from "@/app/_components/reschedule-modal/reschedule-modal";
import { useEffect, useState } from "react";
import ProductCarousel from "@/app/_components/ProductCarousel";
import { TiLocationOutline } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { ProgressUI } from "@/app/_components/common/progressBar";
import { BsStars } from "react-icons/bs";
import { LuHouse } from "react-icons/lu";
import { SellerInfoModal } from "@/app/_components/modals/sellerInfo-modal";
import { FaCheck, FaTimes } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { ApproveModal } from "@/app/_components/modals/approve-modal";
import { DeclineModal } from "@/app/_components/modals/decline-modal";
import { fetchFn } from "@/app/api/fetchFn";
import InspectionScheduler from "@/app/_components/inspectionScheduler";
import { toast } from "react-toastify";
import { KeyFeatures } from "@/app/_components/products/keyFeature";
import axios from "axios";
import { DetailLoadingState } from "@/app/_components/common/detailsLoading";

type Schedule = {
  date: string;
  time: string;
};

export function InspectionDetailsClient({ id }: { id: number }) {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [contactModal, setContactModal] = useState(false);
  const [schedule, setSchedule] = useState<Schedule>({ date: "", time: "" });
  const [approvedModal, setApprovedModal] = useState<boolean>(false);
  const [declinedModal, setDeclinedModal] = useState<boolean>(false);
  const [inspectionDetails, setInspectionDetails] = useState<Inspection | null>(
    null
  );
  const [isCreating, setIsCreating] = useState(false);
  const date = new Date(schedule.date);
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = dayNames[date.getDay()];
  useEffect(() => {
    // Fetch inspection details using the provided ID
    const fetchInspectionDetails = async () => {
      try {
        const res = await fetchFn(`/api/inspections/${id}`);
        if (res.status === 200) {
          setInspectionDetails(res.data.data);
          const scheduledAt = res.data.data.scheduled_at;
          if (scheduledAt) {
            const [datePart, timePart] = scheduledAt.split(" ");
            setSchedule({ date: datePart, time: timePart });
          }
        }
      } catch (error) {
        console.error("Error fetching inspection details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInspectionDetails();
  }, [id]);

  const createInspection = async (schedule: Schedule) => {
    if (inspectionDetails?.status === "passed") {
      toast.error("Inspection already completed");
      return;
    } else if (inspectionDetails?.status === "failed") {
      toast.error("Inspection already completed");
      return;
    }
    try {
      setIsCreating(true);
      const response = await axios.post(`/api/inspections/${id}`, {
        scheduled_at: `${schedule.date} ${schedule.time}`,
      });
      if (response.status === 200) {
        toast.success(`Meeting scheduled successfully`);
        setSchedule(schedule);
      }
    } catch (error) {
      toast.error("Failed to schedule meeting, please try again later");
      console.error("Error scheduling meeting:", error);
    } finally {
      setIsCreating(false);
    }
  };

  return loading ? (
    <DetailLoadingState message="Loading inspection details..." />
  ) : (
    <>
      {/* modals */}
      <RescheduleModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <SellerInfoModal
        product={inspectionDetails?.product}
        isOpen={contactModal}
        seller={inspectionDetails?.seller}
        onClose={() => setContactModal(false)}
      />
      <ApproveModal
        isOpen={approvedModal}
        id={id}
        onClose={() => setApprovedModal(false)}
      />
      <DeclineModal
        isOpen={declinedModal}
        id={id}
        onClose={() => setDeclinedModal(false)}
      />

      <main className="flex flex-col  gap-14">
        <section className="md:flex items-center hidden gap-2.5 my-7 ">
          <Link className="text-xs" href="/dashboard/overview">
            Home
          </Link>
          <ArrowRight2 size={20} color="#5C4D58" />
          <Link className="text-xs" href="/dashboard/inspection-requests">
            Inspection Requests
          </Link>
          <ArrowRight2 size={20} color="#5C4D58" />
          <span className="text-xs">Inspection Details</span>
        </section>

        <section>
          <header className="flex items-center justify-between mb-16">
            <h6 className="text-black text-2xl font-semibold">
              Inspection Detail
            </h6>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-5">
              <span className="">Status</span>
              <span
                className={` flex gap-x-1 items-center ${
                  inspectionDetails?.status === "passed"
                    ? "text-green-600 bg-green-100"
                    : inspectionDetails?.status === "scheduled"
                    ? "text-purple-500 bg-purple-100"
                    : inspectionDetails?.status === "failed"
                    ? "text-red-600 bg-red-100"
                    : "text-blue-500 bg-blue-100"
                } px-5 rounded-lg py-3`}
              >
                <GoDotFill /> {inspectionDetails?.status}
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
                  images={inspectionDetails?.product.media || []}
                />
              </section>
              {/* right */}
              <section className="w-full  md:w-[50%] ">
                <header className="flex items-center gap-12 text-[#585858] text-sm mb-9">
                  <p>Request ID:</p>
                  <p>{inspectionDetails?.id}</p>
                </header>
                <section className="space-y-5">
                  <p className="text-3xl text-[#040421] font-bold">
                    {inspectionDetails?.product.name}
                  </p>
                  <p className="text-[#040421] flex items-center gap-x-1">
                    <TiLocationOutline />
                    Lagos, Nigeria
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-[#175CD3] bg-[#D1E9FF] border border-[#175CD3] border-1 rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium">
                      {inspectionDetails?.product.type === "HOUSE" && (
                        <>
                          {" "}
                          <LuHouse />
                          {inspectionDetails?.product.type}
                        </>
                      )}
                    </span>
                    <span className="text-[#FD8133] bg-[#FFFAEB] border border-[#FD8133] border-1 rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium">
                      <BsStars /> {inspectionDetails?.product.condition}
                    </span>
                  </div>
                  <div className="space-y-2 mb-3">
                    <p className="text-sm text-[#040421]">
                      {inspectionDetails?.product.description}
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
                              You have scheduled an inspection for {dayName},{" "}
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
                  <InspectionScheduler
                    status={inspectionDetails?.status || ""}
                    onSchedule={createInspection}
                    isCreating={isCreating}
                  />
                  {/* key features  */}

                  {inspectionDetails?.product && (
                    <KeyFeatures product={inspectionDetails?.product} />
                  )}
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
                        {inspectionDetails?.seller.name}
                      </p>
                      <p className="text-[#585858] font-medium">
                        6.4K <span>items sold</span>{" "}
                      </p>
                      <div className="space-y-1.5 mb-5">
                        <div className="flex items-center gap-2">
                          <Calendar2 size={24} color="#E65800" />
                          <p className="text-[#585858] font-medium">
                            Joined {inspectionDetails?.seller.created_at}
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
      </main>
    </>
  );
}
