import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardNav } from "@/app/_components/dashboard-nav/dashboard-nav";
import Footer from "@/app/_components/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get("agent_token")?.value;
  if (!token) {
    redirect("/authentication/login");
  }

  return (
    <section className="bg-[#FAFAFA] relative">
      <DashboardNav />
      <main className=" mt-0 md:mt-20 w-full px-4 md:px-12 ">{children}</main>
      <div className="mb-20 md:mb-0">
        <Footer />
      </div>
    </section>
  );
}
