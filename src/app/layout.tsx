import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/component/Navbar";
import Footer from "@/components/component/Footer";
import { Providers } from "./providers";



export const metadata: Metadata = {
  title: "Synmac",
  description: "Chemicle Website",
};

async function getIndustries() {
  const res = await fetch("http://localhost:3000/api/industry", {
    // next: { revalidate: 300 },
    cache: "no-store"
  });

  const data = await res.json()
  return data.industries || [];
}
async function getSubIndustry() {
    const res = await fetch(
        `http://localhost:3000/api/sub-industry`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    return res.json();
}

async function getCategory() {
    const res = await fetch(
        `http://localhost:3000/api/category`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    return res.json();
}

async function getAllResources() {
  const res = await fetch(`http://localhost:3000/api/resources`, {
    // next : { revalidate: 300 }
    cache: "no-store",
  });

  return res.json();
}

async function getProduct() {
    const res = await fetch(
        `http://localhost:3000/api/product`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    return res.json();
}

async function getCompanyInfo() {
    const res = await fetch(
        `http://localhost:3000/api/company-info`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );

    return res.json();
}



export default async function RootLayout({ children }: any) {
  const industries = await getIndustries();
  const getAllSubIndustory = await getSubIndustry();
  const getAllProuductCategory = await getCategory();
  const allResources = await getAllResources();
  const getProducts = await getProduct();
  const getCompanyData = await getCompanyInfo();


  return (
    <html lang="en">
      <body>
       
        <Providers>
           <Navbar getCompanyData={getCompanyData} productCategory={getAllProuductCategory}  subIndustory={getAllSubIndustory} data={industries} product={getProducts} allResources={allResources} />
   {children}
        </Providers>
     
        <Footer />
      </body>
    </html>
  );
}
