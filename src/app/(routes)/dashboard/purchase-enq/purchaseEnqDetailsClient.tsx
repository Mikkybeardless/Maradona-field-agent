"use client";

import { ArrowRight2 } from "iconsax-react";
import Link from "next/link";
import house from "@/app/_assets/images/house.png";
import { RescheduleModal } from "@/app/_components/reschedule-modal/reschedule-modal";
import { useEffect, useState } from "react";
import ProductCarousel from "@/app/_components/ProductCarousel";
import { TiLocationOutline } from "react-icons/ti";
import { FaStar } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { BsStars } from "react-icons/bs";
import { LuHouse } from "react-icons/lu";
import { BookingModal } from "@/app/_components/modals/booking-modal";
import { SellerInfoModal } from "@/app/_components/modals/sellerInfo-modal";
import { FaCheck, FaTimes } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";
import { ApproveModal } from "@/app/_components/modals/approve-modal";
import { DeclineModal } from "@/app/_components/modals/decline-modal";
import { fetchFn } from "@/app/api/fetchFn";
import InspectionScheduler from "@/app/_components/inspectionScheduler";

type Schedule = {
  date: string;
  time: string;
};

export function PurchaseEnqDetailsClient({ id }: { id: number }) {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [BookModal, setBookModal] = useState<boolean>(false);
  const [contactModal, setContactModal] = useState(false);
  const [schedule, setShedule] = useState<Schedule>({ date: "", time: "" });
  const [approvedModal, setApprovedModal] = useState<boolean>(false);
  const [declinedModal, setDeclinedModal] = useState<boolean>(false);
  const [enquiryDetails, setEnquiryDetails] = useState<Enquiry>({
    id: 0,
    purchase_enquiry_id: "",
    agent_id: "",
    scheduled_at: "",
    completed_at: "",
    notes: "",
    status: "",
    created_at: "",
    updated_at: "",
    purchase_enquiry: {
      id: 0,
      product_id: "",
      buyer_id: "",
      message: "",
      qty_sold: 0,
      sold_at: "",
      sold_price: 0,
      status: "",
      agent_id: "",
      created_at: "",
      updated_at: "",
    },
  });
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
        const res = await fetchFn(`/api/purchase-enq/${id}`);
        if (res.status === 200) {
          // Handle successful response
          console.log("Fetched purchase-enq details:", res.data.data);
          setEnquiryDetails(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching purchase-enq details:", error);
      }
    };

    fetchInspectionDetails();
  }, [id]);

  const createInspection = async () => {
    console.log("Creating inspection with schedule:", schedule);
    // try {
    //   const res = await inspectionService.createInspection(id, {
    //     scheduled_at: `${schedule.date} ${schedule.time}`,
    //   });
    // } catch (error) {
    //   console.error("Error creating inspection:", error);
    // }
  };
  //   const submitInspectionResult = async (submitData: InspectionResultData) => {
  //     if (!id) {
  //       throw new Error("Inspection ID is required");
  //     }
  //     try {
  //       const res = await inspectionService.submitResult(parseInt(id, 10), {
  //         approval_status: submitData.approval_status,
  //         condition: submitData.condition,
  //         documents_in_order: submitData.documents_in_order,
  //         notes: submitData.notes,
  //       });

  //       if (res.status === 200) {
  //         toast.success("Inspection result submitted successfully");
  //         setApprovedModal(false);
  //         setDeclinedModal(false);
  //       } else {
  //         toast.error("Failed to submit inspection result. Please try again.");
  //       }
  //     } catch (error) {
  //       console.error("Error submitting inspection result:", error);
  //       toast.error("An unknown error occured. try again");
  //     }
  //   };

  //   const handleApprove = async (notes: string) => {
  //     const submitData: InspectionResultData = {
  //       approval_status: "approved",
  //       condition: "matched",
  //       documents_in_order: 1,
  //       notes: notes || "Inspection approved. All documents are in order.",
  //     };
  //     await submitInspectionResult(submitData);
  //   };

  //   const handleDecline = async (notes: string) => {
  //     const submitData: InspectionResultData = {
  //       approval_status: "rejected",
  //       condition: "mismatched",
  //       documents_in_order: 0,
  //       notes: notes || "Inspection declined. Documents are not in order.",
  //     };
  //     await submitInspectionResult(submitData);
  //   };
  // const rescheduleInspection = async (data: updateInspectionData) => {
  //   if (!selectedSession || !selectedTime) {
  //     toast.error("Please select a date and time for rescheduling.");
  //     return;
  //   }
  //   try {
  //     const res = await inspectionService.updateInspection(parseInt(id, 10), {
  //       scheduled_at: `${selectedSession} ${selectedTime}`,
  //     });
  //     if (res.status === 200) {
  //       toast.success("Inspection rescheduled successfully");
  //       setModalOpen(false);
  //       setShedule({ date: selectedSession, time: selectedTime });
  //     } else {
  //       toast.error("Failed to reschedule inspection. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error rescheduling inspection:", error);
  //     toast.error("An unknown error occurred. Please try again.");
  //     return;
  //   }
  // };

  return (
    <div className=" flex flex-col  gap-14">
      <RescheduleModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
      <BookingModal
        isOpen={BookModal}
        onClose={() => setBookModal(false)}
        onConfirm={createInspection}
      />
      <SellerInfoModal
        isOpen={contactModal}
        onClose={() => setContactModal(false)}
      />
      <ApproveModal
        onApprove={() => {
          console.log("Approved");
          setApprovedModal(false);
        }}
        isOpen={approvedModal}
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
          <span className="text-xs">Inspection Details</span>
        </div>
        <section>
          <header className="flex items-center justify-between mb-16">
            <h6 className="text-black text-2xl font-semibold">
              Purchase Enquiry Details
            </h6>

            {/* Desktop */}
            <div className="hidden md:flex items-center gap-5">
              <span className="">Status</span>
              <span className="bg-[#FFFAEB] flex gap-x-1 items-center text-orange px-5 rounded-lg py-3">
                <GoDotFill /> {enquiryDetails.status}
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
                  <p>Enquiry ID:</p>
                  <p>{enquiryDetails.id}</p>
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
                      {enquiryDetails.purchase_enquiry.message}
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
                              You have scheduled an inspection for {dayName} at{" "}
                              {schedule.time}
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
                    onSchedule={(dateTime) => {
                      setBookModal(true);
                      setShedule(dateTime);
                    }}
                  />
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
          </section>
        </section>
      </section>
    </div>
  );
}
