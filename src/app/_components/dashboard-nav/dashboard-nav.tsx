"use client";
import Image from "next/image";
import logo from "@/app/_assets/images/logo.png";
import { Chart1, Home2, Notification } from "iconsax-react";
import Link from "next/link";
import { useState } from "react";
import { LogoutModal } from "../modals/logout-modal";
import { usePathname } from "next/navigation";
import { IoReceiptOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import authService from "@/app/api/services/auth.service";
import { toast } from "react-toastify";

export const DashboardNav = () => {
  const [isLogoutModal, setIsLogoutModal] = useState(false);
  const pathName = usePathname();
  const NavigationLinks = [
    {
      name: "Home",
      href: "overview",
      icon: Home2,
    },
    {
      name: "Requests",
      href: "inspection-requests",
      icon: IoReceiptOutline,
    },
    {
      name: "Updates",
      href: "notification",
      icon: Notification,
    },
    {
      name: "Analytics",
      href: "analytics",
      icon: Chart1,
    },
  ];

  const mobileNavigationLinks = [
    {
      name: "Home",
      href: "overview",
      icon: Home2,
    },
    {
      name: "Requests",
      href: "inspection-requests",
      icon: IoReceiptOutline,
    },
    {
      name: "Reports",
      href: "analytics",
      icon: Chart1,
    },
    {
      name: "Updates",
      href: "notification",
      icon: Notification,
    },

    {
      name: "Profile",
      href: "profile",
      icon: FaRegUserCircle,
    },
  ];

  const isActiveClass = (href: string) => {
    const fullPath = `/dashboard/${href}`;
    return pathName.startsWith(fullPath)
      ? "text-[#E65800]"
      : "hover:text-[#E65800] text-[#585858] transition-colors duration-300";
  };

  const handleLogout = async () => {
    try {
      const res = await authService.logout();
      if (res.status === 200) {
        toast.success("Logout successful");
        console.log("Logout successful:", res.data);
      } else {
        console.error("Logout failed:", res.data);
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLogoutModal(false);
      window.location.href = "/authentication/login"; // Redirect to login page after logout
    }
  };
  return (
    <nav className="fixed md:top-0 bottom-0  left-0 z-20 w-full h-fit ">
      {/* Mobile Nav */}
      <div className="md:hidden bg-white px-4 py-5 rounded-t-lg  w-full flex items-center justify-evenly">
        {mobileNavigationLinks.map((link) => (
          <Link
            key={link.name}
            href={`/dashboard/${link.href}`}
            className={`flex items-center gap-2 ${isActiveClass(link.href)}`}
          >
            <link.icon size={26} />
          </Link>
        ))}
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center justify-between  bg-white px-20 mx-auto py-4">
        <LogoutModal
          onConfirm={handleLogout}
          isOpen={isLogoutModal}
          onClose={() => setIsLogoutModal(false)}
        />
        <div className="flex items-center gap-20">
          <Link href="/dashboard/overview">
            <Image src={logo} width={85} height={33} alt="logo" className="" />
          </Link>
          <div className="flex items-center gap-5">
            {NavigationLinks.map((link) => (
              <Link
                key={link.name}
                href={`/dashboard/${link.href}`}
                className={`hidden md:flex items-center gap-2 ${isActiveClass(
                  link.href
                )}`}
              >
                <link.icon size={20} />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-7">
          <button
            onClick={() => setIsLogoutModal(true)}
            className="hover:text-red-600 hover:underline"
          >
            Logout
          </button>
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
      </div>
    </nav>
  );
};
