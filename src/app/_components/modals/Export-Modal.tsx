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
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
    >
      <div className="md:w-[80%]  rounded-[24px] flex flex-col px-8 py-2 bg-white">
        <header className="mt-5 flex items-center justify-between gap-x-3 border-b pb-1 ">
          <h2 className="text-2xl font-bold">Export</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-200 p-3 hover:underline"
          >
            <FaTimes size={16} />
          </button>
        </header>
        <div className="flex flex-col gap-y-1 mt-5">
          <Card Property={property} />
          <Card Property={property} />
          <Card Property={property} />
        </div>

        <div className="flex items-center gap-4 justify-end mt-5">
          <button
            onClick={onClose}
            className="px-6 py-2 flex items-center gap-1 bg-orange text-white rounded-lg hover:bg-orange-600"
          >
            <Export size="32" /> Export
          </button>
          <button
            onClick={onClose}
            className="px-6 flex items-center gap-1 py-2 text-orange border-orange border rounded-lg hover:bg-orange-100 hover:text-white"
          >
            <Printer size="32" />
            print
          </button>
        </div>
      </div>
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
    <div className="bg-white w-full p-4 border-y border-[#585858] rounded-lg grid grid-cols-3 shadow-md">
      <div className="col-span-1 flex gap-x-2 border-r border-[#EAE6E9] pr-4">
        <Image
          src={property.imgSrc}
          alt="product image"
          width={50}
          height={50}
          className="object-contain rounded-lg"
        />
        <div className="flex flex-col justify-between">
          <h5>Product ID</h5>
          <span className="font-semibold text-xl">{property.id}</span>
          <div className="flex items-center justify-between gap-1">
            <span className="text-[#175CD3] bg-[#D1E9FF] border-[#175CD3] border-1 rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium">
              <LuHouse /> {property.category}
            </span>
            <span className="text-[#FD8133] bg-[#FFFAEB] border-[#FD8133] border-1 rounded-full px-3 py-1 flex items-center gap-1 text-sm font-medium">
              <BsStars /> Brand New
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-[#FD8133]">
            <FaLocationDot className="text-[#FD8133]" />{" "}
            <span>{property.location}</span>
          </span>
        </div>
      </div>

      <div className="col-span-1 flex flex-col gap-y-2 border-r border-[#EAE6E9]  px-4">
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
          <FaPhoneAlt className="text-[#FD8133]" />{" "}
          <span>{property.sellerInfo.phone}</span>
        </span>

        <span className="flex items-center gap-1 text-sm font-medium text-[#FD8133]">
          <MdEmail className="text-[#FD8133]" />{" "}
          <span>{property.sellerInfo.email}</span>
        </span>
      </div>
    </div>
  );
};
