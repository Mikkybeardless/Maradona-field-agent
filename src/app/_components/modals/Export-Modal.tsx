import { FaPhoneAlt, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { LuHouse } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import House from "@/app/_assets/images/house.png";
import { Export, Printer } from "iconsax-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const property = {
    id: "PROP12345",
    imgSrc: House.src,
    category: "Residential",
    location: "123 Main St, Springfield",
    desc: { type: "House", detail: "A beautiful family home with a garden." },
    sellerInfo: {
      name: "Jane Doe",
      phone: "+1234567890",
      email: "joes@gmail.com",
    },
  };

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
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-50 transition-opacity"
    >
      <div
        className="w-full md:w-[80%] bg-white rounded-t-2xl md:rounded-2xl p-6 transform transition-all duration-300
        translate-y-0 opacity-100 md:translate-y-0 md:opacity-100 
        animate-slideInUp md:animate-none"
      >
        <header className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-bold">Export</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-200 p-3 hover:bg-gray-300"
          >
            <FaTimes size={16} />
          </button>
        </header>

        <div className="mt-3 space-y-2">
          <Card Property={property} />
          <Card Property={property} />
          {/* <Card Property={property} /> */}
        </div>

        <div className="flex items-center gap-4 justify-end mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 flex items-center gap-2 bg-orange text-white rounded-lg hover:bg-orange-600"
          >
            <Export size="24" /> Export
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 flex items-center gap-2 text-orange border border-orange rounded-lg hover:bg-orange-100"
          >
            <Printer size="24" /> Print
          </button>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .animate-slideInUp {
            animation: slideInUp 0.3s ease-out forwards;
          }

          @keyframes slideInUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        }
      `}</style>
    </div>
  );
};

interface CardProps {
  Property: {
    id: string;
    imgSrc: string;
    category: string;
    location: string;
    desc: { type: string; detail: string };
    sellerInfo: { name: string; phone: string; email: string };
  };
}

const Card: React.FC<CardProps> = ({ Property: property }) => {
  return (
    <div className="bg-white w-full p-4  border-[#585858] rounded-lg grid grid-cols-1 gap-y-2 md:grid-cols-3 ">
      <div className="col-span-1 flex  gap-2 border-r border-[#EAE6E9] pr-4">
        <Image
          src={property.imgSrc}
          alt="product image"
          width={70}
          height={70}
          className="object-contain rounded-lg"
        />
        <div className="flex flex-col justify-between">
          <h5>Product ID</h5>
          <span className="font-semibold text-xl">{property.id}</span>
          <div className="flex items-center gap-1 mt-2">
            <span className="text-[#175CD3] bg-[#D1E9FF] text-xs md:text-sm border-[#175CD3] border rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium">
              <LuHouse /> {property.category}
            </span>
            <span className="text-[#FD8133] bg-[#FFFAEB] border-[#FD8133] border rounded-full px-3 py-1 flex items-center gap-1 text-xs md:text-sm font-medium">
              <BsStars /> Brand New
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-[#FD8133] mt-2">
            <FaLocationDot /> {property.location}
          </span>
        </div>
      </div>

      <div className="col-span-1 flex flex-col gap-y-2 border-r border-[#EAE6E9] px-4">
        <h5>Property Description</h5>
        <span className="text-xl font-semibold">{property.desc.type}</span>
        <p>{property.desc.detail}</p>
      </div>

      <div className="col-span-1 flex flex-col gap-y-2 px-4">
        <h5>Seller Info</h5>
        <span className="text-xl font-semibold">
          {property.sellerInfo.name}
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-[#FD8133]">
          <FaPhoneAlt /> {property.sellerInfo.phone}
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-[#FD8133]">
          <MdEmail /> {property.sellerInfo.email}
        </span>
      </div>
    </div>
  );
};
