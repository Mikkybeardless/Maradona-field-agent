"use client";

// import { ArrowRight2, Calendar2, Clock, Location } from "iconsax-react";
// import Image from "next/image";
// import Link from "next/link";
// import house from "@/app/_assets/images/house.png";
// import Rating from "@/app/_assets/images/Ratings.png";
// import { RescheduleModal } from "@/app/_components/reschedule-modal/reschedule-modal";
// import { useState } from "react";
// import ProductCarousel from "@/app/_components/ProductCarousel";
// import { TiLocationOutline } from "react-icons/ti";
// import { FaStar } from "react-icons/fa6";
// import { GoDotFill } from "react-icons/go";
// import { ProgressUI } from "@/app/_components/common/progressBar";
// import { BsStars } from "react-icons/bs";
// import { LuHouse } from "react-icons/lu";
// import { BookingModal } from "@/app/_components/modals/booking-modal";
// import { SellerInfoModal } from "@/app/_components/modals/sellerInfo-modal";
// import { FaCheck, FaTimes } from "react-icons/fa";
// import { RiErrorWarningLine } from "react-icons/ri";
// import { ApproveModal } from "@/app/_components/modals/approve-modal";
// import { DeclineModal } from "@/app/_components/modals/decline-modal";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import inspectionService from "@/app/api/services/inspection.service";
import { LoadingSkeleton } from "@/app/_components/common/skeleton";
import { PageDetailsClient } from "../inspectionPageClient";

async function getProductById(id: string) {
  const productId = parseInt(id, 10);
  const res = await inspectionService.getInspection(productId);

  if (!res || res.status !== 200) {
    return null;
  }
  return res.data;
}

async function PageDetails({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const product = await getProductById(id);
  if (!id || !product) return notFound();

  // const createBooking = async (inspectionData: InspectionData) => {
  //   try {
  //     const res = await inspectionService.createInspection({
  //       product_id: product.id,
  //       field_agent_id: inspectionData.field_agent_id,
  //       scheduled_at: inspectionData.scheduled_at,
  //     });
  //   } catch (error) {}
  // };
  // const submitInspectionResult = async (submitData: InspectionResultData) => {
  //   if (!id) {
  //     throw new Error("Inspection ID is required");
  //   }
  //   try {
  //     const res = await inspectionService.submitResult(parseInt(id, 10), {
  //       approval_status: submitData.approval_status,
  //       condition: submitData.condition,
  //       documents_in_order: submitData.documents_in_order,
  //       notes: submitData.notes,
  //     });

  //     if (res.status === 200) {
  //       toast.success("Inspection result submitted successfully");
  //     } else {
  //       toast.error("Failed to submit inspection result. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting inspection result:", error);
  //     toast.error("An unknown error occured. try again");
  //   }
  // };

  // const handleApprove = async (notes: string) => {
  //   const submitData: InspectionResultData = {
  //     approval_status: "approved",
  //     condition: "matched",
  //     documents_in_order: 1,
  //     notes: notes || "Inspection approved. All documents are in order.",
  //   };
  //   await submitInspectionResult(submitData);
  // };

  // const handleDecline = async (notes: string) => {
  //   const submitData: InspectionResultData = {
  //     approval_status: "rejected",
  //     condition: "mismatched",
  //     documents_in_order: 0,
  //     notes: notes || "Inspection declined. Documents are not in order.",
  //   };
  //   await submitInspectionResult(submitData);
  // };
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
    <>
      <PageDetailsClient product={product} />
    </>
  );
}

// Page Component
export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <PageDetails params={params} />
    </Suspense>
  );
}
