import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/component/Navbar";
import Footer from "@/components/component/Footer";
import { Providers } from "./providers";
import "quill/dist/quill.snow.css";
import Script from "next/script";



export const metadata: Metadata = {
  title: "Synmac",
  description: "Chemicle Website",
 
};

async function getIndustries() {
  const res = await fetch("http://synmac.acetians.in/api/industry", {
    
    cache: "no-store"
  });

  const data = await res.json()
  return data.industries || [];
}
async function getSubIndustry() {
    const res = await fetch(
        `http://synmac.acetians.in/api/sub-industry`,
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
        `http://synmac.acetians.in/api/category`,
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
  const res = await fetch(`http://synmac.acetians.in/api/resources`, {
    // next : { revalidate: 300 }
    cache: "no-store",
  });

  return res.json();
}


async function getAllBlogs() {
  const res = await fetch(`http://synmac.acetians.in/api/blogs`, {
    // next : { revalidate: 300 }
    cache: "no-store",
  });

  return res.json();
}

async function getProduct() {
    const res = await fetch(
        `http://synmac.acetians.in/api/product`,
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
        `http://synmac.acetians.in/api/company-info`,
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


async function getAllNews() {
  const res = await fetch(`http://synmac.acetians.in/api/news`, {
    // next : { revalidate: 300 }
    cache: "no-store",
  });

  return res.json();
}
async function getAllStories() {
  const res = await fetch(`http://synmac.acetians.in/api/success`, {
    // next : { revalidate: 300 }
    cache: "no-store",
  });

  return res.json();
}





export default async function RootLayout({ children }: any) {
  const industries = await getIndustries();
  const getAllSubIndustory = await getSubIndustry();
  const getAllProuductCategory = await getCategory();
  const allResources = await getAllResources();
  const getProducts = await getProduct();
  const getCompanyData = await getCompanyInfo();
  const getBlogs = await getAllBlogs()
  const getStories = await getAllStories()
  const getNews = await getAllNews()


  return (
    <html lang="en">

       <head>
        <Script
          id="gtm-script"
          strategy="beforeInteractive"
        >
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MLS7S5VK');
          `}
        </Script>
      </head>


      <body>

     <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MLS7S5VK"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>


       
        <Providers>
           <Navbar getStories={getStories} getNews={getNews} getBlogs={getBlogs} getCompanyData={getCompanyData} productCategory={getAllProuductCategory}  subIndustory={getAllSubIndustory} data={industries} product={getProducts} allResources={allResources} />
   {children}
        </Providers>
     
        <Footer />
      </body>
    </html>
  );
}
