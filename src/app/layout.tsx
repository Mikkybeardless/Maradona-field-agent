import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Field Agent",
  description: "Distress Sale Field Agent Application",
};

const work_sans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${work_sans.className}`}>
      <body>{children}</body>
      <ToastContainer position="top-right" autoClose={3000} />
    </html>
  );
}
