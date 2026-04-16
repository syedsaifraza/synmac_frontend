'use client';

import { useState, useEffect } from "react";
import heroBg1 from "@/assets/hero-bg.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";
import heroBg4 from "@/assets/img4.png";
import heroBg5 from "@/assets/img5.png";
import heroBg6 from "@/assets/img6.jpeg";
import heroBg7 from "@/assets/img7.png";

import Image from "next/image";
import { BiChevronDown } from "react-icons/bi";

const slides = [heroBg4,heroBg5,heroBg7,heroBg6];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
     
      {slides.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000  ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt="Synmac Chemicals laboratory and manufacturing"
            className="w-full h-full object-cover hero-zoom"
            width={1920}
            height={1080}
            priority={i === 0}
          />
        </div>
      ))}
      
   
      <div className="absolute inset-0 bg-black/60 z-1" />

      <div className="relative z-10 container mx-auto px-10">
        <div className="max-w-2xl animate-fade-in-up">
          <p className="text-sm font-medium tracking-widest uppercase mb-4 text-white/70">
           
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white">
            Engineering Specialty Chemicals for a{" "}
            <span className="text-[#cd2626]">Better Tomorrow</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Custom formulations delivering performance, sustainability, and precision across industries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/applications"
              className="px-8 py-3.5 bg-[#cd2626] text-white rounded-lg font-medium hover:bg-[#b32020] transition-colors text-center"
            >
              View Products
            </a>
            <a
              href="/contact"
              className="px-8 py-3.5 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors text-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>


      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-[#cd2626] w-6" : "bg-white"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

   
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white animate-bounce  text-2xl z-10">
        <BiChevronDown color="white" size={35} />
      </div>
    </section>
  );
};

export default HeroSection;