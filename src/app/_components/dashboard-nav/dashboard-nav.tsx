"use client"
import Image from "next/image";
import logo from "@/app/_assets/images/logo.png";
import { Chart1, Home2, Notification } from "iconsax-react";
import { FcInspection } from "react-icons/fc";
import Link from "next/link";
import { useState } from "react";
import { LogoutModal } from "../modals/logout-modal";
import { usePathname } from "next/navigation";
import { IoReceiptOutline } from "react-icons/io5";

export const DashboardNav = () => {
  const [isLogoutModal, setIsLogoutModal] = useState(false)
    const pathName = usePathname();
  const NavigationLinks = [
    {
      name: "Home",
      href: "overview",
      icon: Home2,
    },
    {
      name: "Inspection Requests",
      href: "inspection-requests",
        icon: IoReceiptOutline ,
   
    },
    {
      name: "Notifications",
      href: "notification",
      icon: Notification,
    },
    {
      name: "Analytics",
      href: "analytics",
     icon: Chart1,
    },
  ];



const isActiveClass = (href: string) => {
  const fullPath = `/dashboard/${href}`;
  return pathName.startsWith(fullPath)
    ? "text-[#E65800]"
    : "hover:text-[#E65800]";
};

 
  return (
    <nav className="fixed top-0  left-0 z-20 flex items-center justify-between w-full bg-white px-20 mx-auto py-4">

      <LogoutModal isOpen={isLogoutModal} onClose={()=> setIsLogoutModal(false)}/>
      <div className="flex items-center gap-20">
        <Link href="/dashboard/overview">
          <Image src={logo} width={85} height={33} alt="logo" className="" />
        </Link>
        <div className="flex items-center gap-5">

          {NavigationLinks.map((link) => (
            <Link
              key={link.name}
              href={`/dashboard/${link.href}`}
              className={`hidden md:flex items-center gap-2 ${isActiveClass(link.href)}`}
            >
              <link.icon size={20} />
              
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-7">
        <button onClick={()=> setIsLogoutModal(true)} className="hover:text-red-600 hover:underline">Logout</button>
        <Link href="/dashboard/profile">
          <Image
            src="/profilePic.png"
            width={40}
            height={40}
            alt="logo"
            className=" rounded-full object-contain"
          />
        </Link>
      </div>
    </nav>
  );
};
