"use client";

import { DashboardNav } from "@/app/_components/dashboard-nav/dashboard-nav";
import Footer from "@/app/_components/Footer";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [loading, setLoading] = useState(true);
  // const router = useRouter();
  // useEffect(() => {
  //   const token = Cookies.get("token");
  //   if (!token) {
  //     router.push("/authentication/login"); // or any fallback
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  // if (loading) return <p className="text-center py-20">Loading...</p>; // or spinner
  return (
    <section className="bg-[#FAFAFA] relative">
      <DashboardNav />
      <main className="mx-auto mt-0 md:mt-20  w-full px-2  max-w-[75rem]">
        {children}
      </main>
      <div className="mb-20 md:mb-0">
        <Footer />
      </div>
    </section>
  );
}
