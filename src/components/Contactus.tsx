

"use client";

import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LiaAngleRightSolid } from "react-icons/lia";


const FloatingInput = ({ label, name, value, handleChange }: any) => (
  <div className="relative w-full">
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      placeholder=" "
      className="peer w-full border-b-2 border-black bg-transparent outline-none py-2 focus:border-red-500"
    />

    <label
      className={`pointer-events-none absolute left-0 transition-all duration-200
      ${value ? "-top-3 text-sm text-red-500" : "top-2 text-gray-400"}
      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-red-500`}
    >
      {label} <span className="text-red-500">*</span>
    </label>
  </div>
);

const FloatingTextarea = ({ label, name, value, handleChange }: any) => (
  <div className="relative w-full">
    <textarea
      name={name}
      value={value}
      onChange={handleChange}
      placeholder=" "
      rows={4}
      className="peer w-full border-b-2 border-black bg-transparent outline-none py-2 focus:border-red-500 resize-none"
    />

    <label
      className={`pointer-events-none absolute left-0 transition-all duration-200
      ${value ? "-top-3 text-sm text-red-500" : "top-2 text-gray-400"}
      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-red-500`}
    >
      {label} <span className="text-red-500">*</span>
    </label>
  </div>
);

const FloatingSelect = ({ label, name, value, handleChange }: any) => (
  <div className="relative w-full">
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className="peer w-full border-b-2 border-black bg-transparent outline-none py-2 focus:border-red-500"
    >
      <option value="" disabled hidden></option>

      {countries.map((country) => (
        <option key={country.code} value={country.name}>
          {country.flag} {country.name}
        </option>
      ))}
    </select>

    <label
      className={`pointer-events-none absolute left-0 transition-all duration-200
      ${value ? "-top-3 text-sm text-red-500" : "top-2 text-gray-400"}
      peer-focus:-top-3 peer-focus:text-sm peer-focus:text-red-500`}
    >
      {label} <span className="text-red-500">*</span>
    </label>
  </div>
);






export default function Contactus({ data }: any) {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    phone: "",
    requirements: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    toast.promise(
      fetch("http://synmac.acetians.in/api/contact-us", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        if (!res.ok) throw new Error("Failed");
        setFormData({
          name: "",
          email: "",
          country: "",
          phone: "",
          requirements: "",
        })
        return res.json();
      }),
      {
        loading: "Sending...",
        success: "Message sent successfully!",
        error: "Something went wrong",
      }
    ).finally(() => setIsSubmitting(false));
  };


  function HeroSection() {

    return (
      <>
        <div
          className="relative h-100 bg-fixed px-20 bg-cover flex items-center"
          style={{
            backgroundImage:
              'url("https://t3.ftcdn.net/jpg/03/38/11/34/360_F_338113434_1OTf8iR1bYPskGDwvGP1pnBPPQ6bJdhB.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative z-10 px-6 max-w-4xl">
            <h1 className="text-5xl md:text-5xl max-w-xl text-white font-semibold tracking-wide mb-4">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6">
              We’d love to hear from you. Whether you have a question, feedback, or just
              want to say hello — feel free to reach out.
            </p>
          </div>
        </div>
        <div className="border-b border-gray-300 px-25 py-2">
          <div className="flex flex-row gap-1 items-center font-semibold">
            <Link href="/">Home</Link>
            <LiaAngleRightSolid />
            <h1>Contact Us</h1>
          </div>
        </div>
      </>
    );
  }


  function WebinarCard() {
    return (
      <div className="  flex justify-center  max-w-6xl mx-auto ">


        <div className="bg-white w-1/2  px-20 py-12  relative ">

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Global Sales & Service Agents (GSA)
          </h2>


          <p className="text-gray-600 text-lg mb-6 max-w-2xl">
            For all other requests in global markets, you can contact our Global Service Agents (GSA) through E-mails:


          </p>

          <p className="text-gray-900 font-medium mb-4">
            Synmac Presence through GSA-
          </p>


          <ul className="text-gray-600 text-xs mb-6 max-w-2xl flex flex-row gap-2">
            {
              ["India",
                "Latin America",
                "Australia",
                "Middle East",
                "Africa",
                "South East Asia"].map((country) => (
                  <li className="border border-[#06223a] text-[306223a] rounded-md p-1" >{country}</li>
                ))
            }


          </ul>

          {/* Link */}
          <a
            href="/global-contact"
            className="text-blue-600 font-medium flex items-center gap-2 hover:underline"
          >
            Global Contacts
            <span className="text-xl">›</span>
          </a>

        </div>
        <div className="w-1/2">
          {mapCard()}

        </div>

      </div>
    );
  }

  function mapCard() {
    return (
      <div className=" h-100 flex justify-center  w-full">

        <div
          className=" h-100 flex justify-center  w-full"
          dangerouslySetInnerHTML={{
            __html: data.map_embed_code || ""
          }}
        />



      </div>
    );
  }

  return (
    <div className="min-h-screen">

      {HeroSection()}

      {/* <div
        className="relative h-100 bg-fixed  bg-cover flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://t3.ftcdn.net/jpg/03/38/11/34/360_F_338113434_1OTf8iR1bYPskGDwvGP1pnBPPQ6bJdhB.jpg")',
        }}
      >

        <div className="absolute inset-0 bg-black/60"></div>


        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl text-white font-semibold tracking-wide mb-4">
            Contact Us
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto mb-6">
            We’d love to hear from you. Whether you have a question, feedback, or just
            want to say hello — feel free to reach out.
          </p>

          <button className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
            Get in Touch
          </button>
        </div>
      </div> */}

      <div className="flex flex-row box-border  max-w-6xl max-auto">
        <div className=" space-y-5 w-full  box-content p-20">
          <h1 className="text-5xl text-gray-900 font-semibold">Request for Services</h1>
          <div className="max-w-4xl">
            <p className="text-gray-600 text-xl ">Please let us know what service you are interested in by completing the form below. We will get in touch with you shortly.</p>

          </div>



          <div className="max-w-3xl space-y-4 px-3">

            <p className="text-2xl font-semibold text-gray-900 mb-4">Mandatory fields are marked with <span className="text-red-700">*</span></p>

            <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">

              <FloatingInput
                label="Your Name"
                name="name"
                value={formData.name}
                handleChange={handleChange}
              />

              <FloatingInput
                label="Your Email"
                name="email"
                value={formData.email}
                handleChange={handleChange}
              />

              <FloatingSelect
                label="Country"
                name="country"
                value={formData.country}
                handleChange={handleChange}
              />

              <FloatingInput
                label="Phone"
                name="phone"
                value={formData.phone}
                handleChange={handleChange}
              />

              <FloatingTextarea
                label="Your Requirements"
                name="requirements"
                value={formData.requirements}
                handleChange={handleChange}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-800 transition"
              >
                {isSubmitting ? "Sending..." : "Submit"}
              </button>

            </form>
          </div>




        </div>
        <div className="  w-1/2">
          <div className=" px-5 py-20 flex justify-center flex-col gap-5  ">

            <div className="bg-white  w-full  ">

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Head Office
              </h2>


              <p className="text-gray-600 text-sm mb-2 max-w-2xl">
                {data.head_office.address}

              </p>
              <a
                href="#"
                className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:underline"
              >
                {data.head_office.phone}
                <span className="text-md">›</span>
              </a>
            </div>
            <div className="bg-white w-full ">

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Regional Headquarters
              </h2>


              <p className="text-gray-600 text-sm mb-2 max-w-2xl">
                {data.regional_headquarter.address}



              </p>
              <a
                href="#"
                className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:underline"
              >
                {data.regional_headquarter.phone}
                <span className="text-xl">›</span>
              </a>
            </div>

            <div className="bg-white max-w-xl w-full ">

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact by E-mails:
              </h2>


              <p className="text-gray-600 text-sm mb-6 max-w-2xl">
                {data.contact_by_email.description}


              </p>

              <p className="text-gray-900 font-medium ">
                General Enquiries
              </p>

              <a
                href="#"
                className="text-blue-600 font-medium flex items-center gap-2 hover:underline mb-4"
              >
                {data.contact_by_email.general_enquiries_email}
                <span className="text-xl">›</span>
              </a>

              <p className="text-gray-900 font-medium  ">
                Export Enquiries
              </p>

              <a
                href="#"
                className="text-blue-600 font-medium flex items-center gap-2 hover:underline"
              >
                {data.contact_by_email.export_enquiries_email}
                <span className="text-xl">›</span>
              </a>


            </div>


          </div>
        </div>



      </div>



      <div className="space-y-4">
        {WebinarCard()}

      </div>



      <Toaster position="top-center" />
    </div>
  );
}

export const countries = [
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦" },
  { name: "Russia", code: "RU", flag: "🇷🇺" },
  { name: "Italy", code: "IT", flag: "🇮🇹" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
];

