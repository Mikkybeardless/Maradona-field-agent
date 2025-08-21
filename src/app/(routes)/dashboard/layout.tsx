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
      <main className="mx-auto mt-0 md:mt-20 w-full px-2 max-w-[75rem]">
        {children}
      </main>
      <div className="mb-20 md:mb-0">
        <Footer />
      </div>
    </section>
  );
}
