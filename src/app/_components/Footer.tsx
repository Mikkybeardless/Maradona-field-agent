import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full pt-16 pb-8 relative flex justify-center bg-[#0C0F53]">
      <div className="w-full absolute top-0 z-0 bg-[#040421]"></div>

      <div className="w-full z-20 bg-transparent px-6 md:px-12">
        {/* Footer Links Section */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-[#FFEFE6]">
          <div className="flex flex-col gap-y-3 footerTags">
            <h5>Payment Gateways</h5>
            <img
              className="w-[6rem] sm:w-[8rem]"
              src={`/home/payment-cards.svg`}
              alt="payment methods"
            />
          </div>
          <div className="flex flex-col gap-y-3 footerTags">
            <h5>Get to know us</h5>
            <div className="font-light text-sm space-y-1">
              <p>Careers</p>
              <p>Blog</p>
              <p>About us</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3 footerTags">
            <h5>Make money with us</h5>
            <div className="font-light text-sm space-y-1">
              <p>
                <Link href={"/forms/agent"}>Agent Registration Form</Link>
              </p>
              <p>
                <Link href={"/forms/investor"}>Become an Investor</Link>
              </p>
              <p>
                <Link href={"/forms/seller"}>Become a Vendor</Link>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3 footerTags">
            <h5>Products</h5>
            <div className="font-light text-sm space-y-1">
              <p>Cars</p>
              <p>Houses</p>
              <p>Lands</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-3 footerTags">
            <h5>Let us help you</h5>
            <div className="font-light text-sm space-y-1">
              <p>Your account</p>
              <p>Your orders</p>
              <p>Shopping rates and policies</p>
              <p>
                <Link href={"/return-policy"}> Returns and replacements </Link>
              </p>
              <p>Help</p>
            </div>
          </div>
        </div>

        {/* Newsletter & Logo Section */}
        <div className="w-full z-20 bg-transparent mt-16 md:mt-20 pb-5 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
          <img
            className="w-[80px] h-[80px] md:w-[97px] md:h-[97px]"
            src={`/home/shorter-logo.svg`}
            alt="Logo"
          />

          <div className=" text-start md:items-end w-full md:w-[40%]">
            <p className="font-semibold text-white text-start text-lg md:text-xl mb-2">
              Subscribe to our Newsletter
            </p>
            <div className="flex rounded-lg bg-white p-1 h-[60px]">
              <input
                className="outline-none w-full sm:w-[70%] bg-white border-none p-3 rounded text-sm md:text-base"
                type="email"
                placeholder="Email"
              />
              <button className="rounded-lg px-10 sm:px-16 py-1 sm:py-1 text-white text-sm md:text-base hover:bg-defaultOrange bg-[#E65800]">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Media & Terms Section */}
        <div className="pt-5 flex flex-col md:flex-row justify-between items-center border-t border-t-white gap-4 md:gap-0">
          {/* Social Icons */}
          <div className="flex gap-x-3.5">
            <FaXTwitter
              className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
              color="white"
            />
            <BiLogoFacebookSquare
              className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
              color="white"
            />
            <FaWhatsapp
              className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
              color="white"
            />
            <FaInstagram
              className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
              color="white"
            />
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-6 text-xs md:text-sm text-white">
            <p>Conditions of use</p>
            <p>Privacy Notice</p>
            <p>Consumer Health</p>
            <p>Data Privacy Disclosure</p>
            <p>© 2023-2024, distresssales.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
