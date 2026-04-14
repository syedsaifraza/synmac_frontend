





"use client";

import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";


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



function WebinarCard() {
  return (
    <div className="  flex justify-center   w-full ">


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

      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14288.259087601296!2d80.246266!3d26.453641!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c4825aa18c777%3A0xce5295a5a5a5c008!2sSynmac%20Chemicals%20Pvt.%20Ltd.!5e0!3m2!1sen!2sus!4v1776070491444!5m2!1sen!2sus" width="100%" height="100%" style={{ border: 0 }} loading="lazy"></iframe>

    </div>
  );
}


export default function Page() {
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
      fetch("/api/contact-us", {
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

  return (
    <div className="min-h-screen">

      <div
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
      </div>

      <div className="flex flex-row box-border ">
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
                Synmac Chemicals Private Limited,<br />
                G-6, Bajrangbali Industrial Estate,<br />
                Panki Site-4 Kanpur-208 022 INDIA<br />

              </p>
              <a
                href="#"
                className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:underline"
              >
                +91-991 8888 777
                <span className="text-md">›</span>
              </a>
            </div>
            <div className="bg-white w-full ">

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Regional Headquarters
              </h2>


              <p className="text-gray-600 text-sm mb-2 max-w-2xl">
                Khasra No. 154, Plot No. 336,<br />
                Puth Khurd Village, Delhi 110039<br />
                India.<br />



              </p>
              <a
                href="#"
                className="text-blue-600 font-medium text-sm flex items-center gap-2 hover:underline"
              >
                +91-860 124 8888
                <span className="text-xl">›</span>
              </a>
            </div>

            <div className="bg-white max-w-xl w-full ">

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact by E-mails:
              </h2>


              <p className="text-gray-600 text-sm mb-6 max-w-2xl">
                For specific enquiries, please contact one of the following E-mails. We will be in response within 24 hours.
                Our team ensures timely assistance for all your queries and requirements.
                Please provide complete details so we can serve you more effectively.
                We value your time and strive to deliver accurate and helpful responses.
                For urgent matters, kindly mention “Priority” in your subject line.


              </p>

              <p className="text-gray-900 font-medium ">
                General Enquiries
              </p>

              <a
                href="#"
                className="text-blue-600 font-medium flex items-center gap-2 hover:underline mb-4"
              >
                info@synmacs.com
                <span className="text-xl">›</span>
              </a>

              <p className="text-gray-900 font-medium  ">
                Export Enquiries
              </p>

              <a
                href="#"
                className="text-blue-600 font-medium flex items-center gap-2 hover:underline"
              >
                export@synmacs.com
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

