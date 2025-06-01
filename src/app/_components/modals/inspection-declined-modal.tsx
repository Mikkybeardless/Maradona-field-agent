"use client";

import Image from "next/image";
import declinedImage from "@/app/_assets/icons/declined.svg"; // Adjust the path as necessary
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InspectionDeclinedModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackgroundClick}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="bg-white space-y-11 p-6 rounded-lg shadow-lg w-[300px] flex items-center justify-center max-w-[700px]">
        <Image src={declinedImage} width={50} height={50} alt="check image" />
        <h5 className="font-semibold">Inspection Declined</h5>
        <p>Property with request ID 1938409 has been declined from sale</p>
        <Link
          className="hover:underline flex gap-1"
          href={"/dashboard/overview"}
        >
          <span>Check other properties</span> <FaLongArrowAltRight />
        </Link>
      </div>
    </div>
  );
};
