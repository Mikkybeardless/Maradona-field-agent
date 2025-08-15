import Image from "next/image";
import logo from "@/app/_assets/images/logo.png";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-['#FAFAFA'] space-y-4">
      <Image
        src={logo}
        width={205}
        height={80}
        alt="logo"
        className="mx-auto mb-20"
      />

      {children}
    </section>
  );
}
