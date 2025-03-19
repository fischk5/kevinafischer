import type { Metadata } from "next";
import { Open_Sans } from 'next/font/google'
import "./globals.css";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Kevin Fischer | Official",
  description: "Founder, software engineer, and apsiring polymath",
};

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={openSans.className}>
      <body>
        <Header/>
        <div className="layout-content">
          {children}
        </div>
      </body>
    </html>
  );
}
