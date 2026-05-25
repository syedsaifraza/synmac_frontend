"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { LiaAngleRightSolid } from "react-icons/lia";
import Header from "./component/Header";
// @ts-ignore: react-google-recaptcha has no declaration file
import ReCAPTCHA from "react-google-recaptcha";
import {
  HiOutlineClock,
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
} from "react-icons/hi";
import { useSelector } from "react-redux";

export default function Contactus() {
  const [captchaValue, setCaptchaValue] = useState<any>("");
  const captchaRef = useRef<any>(null);
  const { industories, company_info } = useSelector(
    (state: any) => state.resources,
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: [] as number[],
    phone: "",
    requirements: "",
    reach_time: "",
    hear_about_us: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!captchaValue) {
      toast.error("Please verify captcha");
      return;
    }
    setIsSubmitting(true);

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: "form_submission",
        form_name: "contact_us",
        form_location: "Contact Us Page",
      });
    }

    toast
      .promise(
        fetch(
          "https://synmac-backend.serverscripts.in/api/v1/user/contactus/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...formData, captchaToken: captchaValue }),
          },
        ).then((res) => {
          if (!res.ok) throw new Error("Failed");
          setCaptchaValue("");
          captchaRef.current.reset();
          setFormData({
            name: "",
            email: "",
            company: "",
            industry: [],
            phone: "",
            requirements: "",
            reach_time: "",
            hear_about_us: "",
          });
          return res.json();
        }),
        {
          loading: "Sending...",
          success: "Message sent successfully!",
          error: "Something went wrong",
        },
      )
      .finally(() => setIsSubmitting(false));
  };

  const handleIndustriesSelect = (e: any) => {
    const { checked, value } = e.target;
    const numValue = Number(value);

    if (checked) {
      setFormData((prev) => ({
        ...prev,
        industry: [...prev.industry, numValue],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        industry: prev.industry.filter((id) => id !== numValue),
      }));
    }
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div>
        <Header
          title={"Contact Us"}
          background_image="https://t3.ftcdn.net/jpg/03/38/11/34/360_F_338113434_1OTf8iR1bYPskGDwvGP1pnBPPQ6bJdhB.jpg"
          description="We'd love to hear from you. Whether you have a question, feedback, or just want to say hello — feel free to reach out."
        />

        <div className="border-b border-gray-200 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row gap-1 items-center max-w-6xl mx-auto font-medium text-sm sm:text-base">
            <Link href="/" className="hover:text-[#cd2626] transition">
              Home
            </Link>
            <LiaAngleRightSolid size={12} />
            <h1 className="text-gray-600">Contact Us</h1>
          </div>
        </div>

        <div className="max-w-6xl mx-auto py-16">
          <div className="flex flex-col lg:flex-row box-border gap-10">
            <div className="space-y-5 w-full flex-1 box-content">
              <h1 className="text-4xl text-gray-900 font-semibold">
                Request for Services
              </h1>
              <div className="max-w-4xl">
                <p className="text-gray-600 text-lg fonts">
                  Use the following form below to place an order, receive a
                  price quote, request samples, check product availability or
                  for general questions. Synmac Team will immediately start
                  working to meet your needs..
                </p>
              </div>

              <div className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="Enter Name"
                      onChange={handleChange}
                      name="name"
                      value={formData.name}
                      type="text"
                      className="border border-gray-300 p-2 rounded-md"
                    />
                    <input
                      placeholder="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="border p-2 border-gray-300 rounded-md"
                    />
                    <input
                      placeholder="Company Name"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      type="text"
                      className="border p-2 border-gray-300 rounded-md"
                    />
                    <input
                      placeholder="Phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      type="tel"
                      className="border p-2 border-gray-300 rounded-md"
                    />
                  </div>

                  <p className="text-xl font-semibold text-gray-600">
                    Service you interested in{" "}
                    <span className="text-red-700">*</span>
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-300 rounded-xl p-4">
                    {industories?.map((ind: any) => (
                      <div
                        key={ind.id}
                        className="space-x-3 bg-gray-200 p-2 rounded-md fonts"
                      >
                        <input
                          value={ind.id}
                          onChange={handleIndustriesSelect}
                          checked={formData.industry.includes(ind.id)}
                          type="checkbox"
                        />
                        <label>{ind.name}</label>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-700 font-semibold mb-2">
                        Best Time to Reach
                      </label>
                      <select
                        name="reach_time"
                        className="border p-2 border-gray-300 rounded-md"
                        onChange={handleSelectChange}
                        value={formData.reach_time}
                      >
                        <option value="">Please select</option>
                        <option value="Morning (9AM - 12PM)">
                          Morning (9AM - 12PM)
                        </option>
                        <option value="Afternoon (12PM - 3PM)">
                          Afternoon (12PM - 3PM)
                        </option>
                        <option value="Evening (3PM - 6PM)">
                          Evening (3PM - 6PM)
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-700 font-semibold mb-2">
                        Hear About Us
                      </label>
                      <select
                        name="hear_about_us"
                        value={formData.hear_about_us}
                        onChange={handleSelectChange}
                        className="border p-2 border-gray-300 rounded-md"
                      >
                        <option value="">Please select</option>
                        <option value="Google Search">Google Search</option>
                        <option value="Social Media">Social Media</option>
                        <option value="Referral">Referral</option>
                        <option value="Advertisement">Advertisement</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <textarea
                    name="requirements"
                    placeholder="Message*"
                    className="border border-gray-300 w-full h-40 resize-none p-4 rounded-xl"
                    value={formData.requirements}
                    onChange={handleChange}
                  />

                  <ReCAPTCHA
                    ref={captchaRef}
                    sitekey="6LeVmfssAAAAAFNZidDT3B2RWy2xYawxd5CkoP3Y"
                    onChange={(value: any) => setCaptchaValue(value)}
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting || captchaValue === ""}
                    className={`
    px-6 py-3 font-semibold transition text-white
    ${
      captchaValue === ""
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-black hover:bg-gray-800"
    }
  `}
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </form>
              </div>
            </div>

            <div className="w-full lg:w-1/3">
              <div className="bg-gray-50 rounded-2xl p-6">
                {/* Headquarter */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <HiOutlineLocationMarker className="text-blue-600" />
                    Our Headquarter
                  </h2>
                  <p className="text-gray-600 leading-relaxed fonts">
                    {company_info?.head_office?.address}
                  </p>
                </div>

                {/* Contact Details */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Telephone
                    </h2>
                    <a
                      href={`tel:${company_info?.regional_headquarter?.phone}`}
                      className="text-blue-600 font-medium flex items-center gap-2 hover:underline"
                    >
                      <HiOutlinePhone className="text-gray-400" />
                      {company_info?.regional_headquarter?.phone}
                    </a>
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Mobile
                    </h2>
                    <a
                      href={`tel:${company_info?.head_office?.phone}`}
                      className="text-blue-600 font-medium flex items-center gap-2 hover:underline"
                    >
                      <HiOutlinePhone className="text-gray-400" />
                      {company_info?.head_office?.phone}
                    </a>
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Email
                    </h2>
                    <a
                      href={`mailto:${company_info?.contact_by_email?.general_enquiries_email}`}
                      className="text-blue-600 font-medium flex items-center gap-2 hover:underline break-all"
                    >
                      <HiOutlineMail className="text-gray-400" />
                      {company_info?.contact_by_email?.general_enquiries_email}
                    </a>
                  </div>

                  <div className="pt-2">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <HiOutlineClock className="text-gray-400" />
                      Opening Hours
                    </h2>
                    <div className="space-y-1 text-sm text-gray-700 fonts">
                      <p>Monday - Friday: 9:30AM - 5:30PM</p>
                      <p>Saturday: 10:30AM - 3:30PM</p>
                      <p className="text-red-500">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200">
          <div className="py-10 max-w-6xl mx-auto">
            <h1
              className="text-center text-3xl font-bold"
              onClick={() => console.log(company_info)}
            >
              Our Office Locations
            </h1>
            <p className="text-gray-500 text-center mt-4 max-w-4xl mx-auto fonts">
              Lorem ipsum dolor sit amet consectetur to adipiscing elit sed dot
              eiusmod tempor sit amet consectetur to adipiscing elit sed dot
              eiusmod tempor incididunt labore et dolore magna aliqua. Veniam
              quis nostrud exercitation ullamco.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-10">
              {company_info?.global_contacts.map((res: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-gray-100 border border-gray-200 p-5 relative min-h-50"
                >
                  <p className="font-semibold text-gray-800 mb-2">
                    {res.country_name}
                  </p>
                  <p className="line-clamp-6 text-sm font-light text-gray-500 fonts">
                    {res.country_address}
                  </p>

                  <div className="absolute bottom-0 flex flex-col my-4">
                    {res.country_email && (
                      <a
                        href={`mailto:${res.country_email}`}
                        target="_blank"
                        className="py-1 cursor-pointer text-xs text-blue-600 hover:text-blue-800 transition-all duration-300 ease-in-out"
                      >
                        Email: {res.country_email}
                      </a>
                    )}

                    {res.country_phone && (
                      <a
                        href={`tel:${res.country_phone}`}
                        target="_blank"
                        className="py-1 cursor-pointer text-xs text-gray-600 hover:text-gray-800 transition-all duration-300 ease-in-out"
                      >
                        Phone: {res.country_phone}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Toaster position="top-right" />
      </div>
    </>
  );
}
