"use client";

import Image from "next/image";
import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full pt-16 pb-8 relative flex justify-center bg-[#0C0F53]">
      <div className="w-full absolute top-0 z-0 bg-[#040421]"></div>

      <div className="w-full z-20 bg-transparent px-6 md:px-12">
        {/* Footer Links Section */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-[#FFEFE6]">
          <div className="flex flex-col gap-y-3 footerTags">
            <h5>Payment Gateways</h5>
            <Image
              src="/home/payment-cards.svg"
              alt="payment methods"
              width={128}
              height={64}
              className="w-[6rem] sm:w-[8rem]"
            />
          </div>
          <div className="flex flex-col gap-y-3 footerTags">
            <h5>Get to know us</h5>
            <div className="font-light text-sm space-y-1">
              <Link href="/careers">Careers</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/about-us">About us</Link>
            </div>
          </div>
          {/* Other sections unchanged */}
        </div>

        {/* Newsletter */}
        <div className="w-full z-20 bg-transparent mt-16 md:mt-20 pb-5 flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
          <Image
            src="/home/shorter-logo.svg"
            alt="Logo"
            width={97}
            height={97}
            className="w-[80px] h-[80px] md:w-[97px] md:h-[97px]"
          />

          <div className=" text-start md:items-end w-full md:w-[40%]">
            <p className="font-semibold text-white text-start text-lg md:text-xl mb-2">
              Subscribe to our Newsletter
            </p>
            <form
              className="flex rounded-lg bg-white p-1 h-[60px]"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                aria-label="Email address"
                className="outline-none w-full sm:w-[70%] bg-white border-none p-3 rounded text-sm md:text-base"
                type="email"
                placeholder="Email"
                required
              />
              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="rounded-lg px-10 sm:px-16 py-1 sm:py-1 text-white text-sm md:text-base hover:bg-defaultOrange bg-[#E65800]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Media & Terms */}
        <div className="pt-5 flex flex-col md:flex-row justify-between items-center border-t border-t-white gap-4 md:gap-0">
          <div className="flex gap-x-3.5">
            <a
              href="https://twitter.com"
              aria-label="Twitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter
                className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
                color="white"
              />
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BiLogoFacebookSquare
                className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
                color="white"
              />
            </a>
            <a
              href="https://wa.me/"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp
                className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
                color="white"
              />
            </a>
            <a
              href="https://instagram.com"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className="cursor-pointer w-5 h-5 md:w-6 md:h-6"
                color="white"
              />
            </a>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-2 md:gap-6 text-xs md:text-sm text-white">
            <Link href="/conditions-of-use">Conditions of use</Link>
            <Link href="/privacy-notice">Privacy Notice</Link>
            <Link href="/consumer-health">Consumer Health</Link>
            <Link href="/data-privacy-disclosure">Data Privacy Disclosure</Link>
            <p>© 2023-2024, distresssales.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
