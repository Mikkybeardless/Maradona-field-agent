import { DashboardNav } from "@/app/_components/dashboard-nav/dashboard-nav";
import Footer from "@/app/_components/Footer";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-['#FAFAFA'] relative">
      <DashboardNav />
      <div className="mx-auto mt-20 w-10/12 max-w-[80rem]">{children}</div>
      <Footer />
    </section>
  );
}
