import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Synmac",
  description: "Chemicle Website",
};

async function getIndustries() {
  const res = await fetch("http://synmac.acetians.in/api/industry", {
    // next: { revalidate: 300 },
    cache: "no-store"
  });

  const data = await res.json(); console.log("a ja saale", data)


  return data.industries || [];
}

export default async function RootLayout({ children }: any) {
  const industries = await getIndustries();

  return (
    <html lang="en">
      <body>
        <Navbar data={industries} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
