import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/component/Navbar";
import Footer from "@/components/component/Footer";
import { Providers } from "./providers";
import "quill/dist/quill.snow.css";
import Script from "next/script";
import { Toaster } from "react-hot-toast";



export const metadata: Metadata = {
  title: "Synmac",
  description: "Chemicle Website",
 
};


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



async function getNavData() {
    const res = await fetch(
        `https://synmac-backend.serverscripts.in/api/v1/user/navbar`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        }
    );


    const data = await res.json()

    return data;
}






export default async function RootLayout({ children }: any) {

  const getCompanyData = await getCompanyInfo();

  const getNav = await getNavData()


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

         <script async src="https://www.googletagmanager.com/gtag/js?id=G-HYD5J2SJ6N"></script>

         
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

          <Toaster position="top-right" />
           <Navbar 
            getCompanyData={getCompanyData}
            data={getNav.data}  />
   {children}
        </Providers>
     
        <Footer />
      </body>
    </html>
  );
}