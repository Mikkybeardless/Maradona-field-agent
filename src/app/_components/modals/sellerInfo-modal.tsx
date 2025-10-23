"use client";

import Image from "next/image";
// import LogoutIcon from "@/app/_assets/icons/log-out.svg";
import { FaStar, FaTimes } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { LuHouse } from "react-icons/lu";
import { BsStars } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import house from "@/app/_assets/images/house.png";
import { AiFillMessage } from "react-icons/ai";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  seller?: Seller;
  product?: ApiProductDetails;
}

export const SellerInfoModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  seller,
  product,
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
      <div className="bg-white space-y-3 px-6 py-4 rounded-lg shadow-lg w-full flex flex-col max-w-[700px]">
        <div className="mt-2 flex items-center justify-between gap-x-3 border-b pb-1 ">
          <h2 className="text-2xl font-semibold">Seller Info</h2>
          <button
            onClick={onClose}
            className="rounded-full bg-gray-200 p-3 hover:underline"
          >
            <FaTimes size={16} />
          </button>
        </div>
        <div className="grid items-center grid-cols-3 gap-3">
          <div>
            {" "}
            <span className="bg-[#F2F4F7] rounded-full p-5 text-2xl font-bold text-gray-500">
              SE
            </span>
          </div>

          <div className="">
            <h4 className="font-normal text-lg">{seller?.name}</h4>
            <p className="text-[#585858]">#1309IRJ2</p>
          </div>

          <div>
            {/* <span className="flex items-center gap-1 text-[#585858] text-sm">
              <FaPhoneAlt className="text-[#FD8133]" />{" "}
              <span>{seller?.seller_profile.phone}</span>
            </span> */}

            <span className="flex text-[#585858] items-center gap-1 text-sm font-medium ">
              <MdEmail className="text-[#FD8133]" />{" "}
              <span>{seller?.email}</span>
            </span>
          </div>
        </div>
        <hr />
        <div className="flex justify-between ">
          <p>Average rating for the last 12 hours</p>{" "}
          <span className="flex gap-1 items-center ">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar className="text-yellow-500" key={i} />
            ))}{" "}
            <span className="text-[#8B3500] ml-3 ">4.9</span>
          </span>
        </div>
        <hr />
        <div className="space-y-2">
          <h3 className="text-[#585858] font-semibold">Property Details</h3>
          <div className="flex gap-4">
            <Image
              src={product?.media[0].file_url || house}
              width={130}
              height={70}
              alt="house image"
            />
            <div className="flex flex-col space-y-2">
              <span className="text-xl font-semibold text-[#040421]">
                {product?.name}
              </span>
              <span className="flex  items-center gap-2">
                {" "}
                <FaLocationDot className="" /> Lagos, Nigeria
              </span>
              <div className="flex items-center gap-5">
                <span className="text-[#175CD3] bg-[#D1E9FF] border border-[#175CD3] border-1 rounded-full px-3 py-1 flex items-center gap-1 text-sm ">
                  {product?.type === "HOUSE" ? (
                    <>
                      {" "}
                      <LuHouse />
                      {product.type}
                    </>
                  ) : (
                    <> {product?.type}</>
                  )}
                </span>
                <span className="text-[#FD8133] bg-[#FFFAEB] border border-[#FD8133] border-1 rounded-full px-3 py-1 flex items-center gap-1 text-sm ">
                  <BsStars /> {product?.condition}
                </span>
              </div>
            </div>
          </div>
        </div>
        <span className="flex gap-3 items-center text-[#585858]">
          {" "}
          <AiFillMessage />
          From sller
        </span>
        <span className="text-[#040421] font-medium">
          Call me 1hr before arriving
        </span>
        {/* <div className="flex justify-center">
          <button
            onClick={onClose}
            className="text-orange hover:bg-inherit flex gap-2 items-center justify-center w-full border-orange hover:text-white hover:bg-orange border rounded-xl py-2 px-4 md:px-10 "
          >
            <MdMyLocation /> Get directions
          </button>
        </div> */}
      </div>
    </div>
  );
};
