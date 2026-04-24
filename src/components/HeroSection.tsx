'use client';

import { useState, useEffect } from "react";
import heroBg1 from "@/assets/hero-bg.jpg";
import heroBg2 from "@/assets/hero-bg-2.jpg";
import heroBg3 from "@/assets/hero-bg-3.jpg";
import heroBg4 from "@/assets/img4.png";
import heroBg5 from "@/assets/img5.png";
import heroBg6 from "@/assets/img6.jpeg";
import heroBg7 from "@/assets/img7.png";
import heroBg8 from "@/assets/img8.jpeg";
import heroBg9 from "@/assets/img9.jpeg";
import heroBg10 from "@/assets/img10.jpeg";
import heroBg11 from "@/assets/img11.png";


import Image from "next/image";
import { BiChevronDown, BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Link from "next/link";

const slides = [heroBg8, heroBg7, heroBg6,heroBg10];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);




  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
     
      {/* Slides */}
      {slides.map((src, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
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
      

      
      {/* Overlay */}
      <div className="absolute inset-0  bg-[linear-gradient(to_right,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.6)_30%,rgba(0,0,0,0.3)_45%,rgba(0,0,0,0.3)_50%)] z-1" />

      
      <div className="relative z-10 container mx-auto max-w-6xl">
        <div className="max-w-2xl animate-fade-in-up">
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6 text-white">
            Engineering Specialty Chemicals for a{" "}
            <span className="text-[#cd2626]">Better Tomorrow</span>
          </h1>
          
          <p className="text-white/80 text-sm sm:text-base md:text-lg max-w-xl mb-6 sm:mb-8 md:mb-10 leading-relaxed">
            Custom formulations delivering performance, sustainability, and precision across industries.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link 
            href={"/product"}
             
              className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#cd2626] text-white rounded-lg font-medium hover:bg-[#b32020] transition-colors text-center text-sm sm:text-base"
            >
              View Products
            </Link>
            
            <Link
              href="/contact-us"
              className="px-6 sm:px-8 py-3 sm:py-3.5 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors text-center text-sm sm:text-base"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-30 sm:bottom-16 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
              i === current ? "bg-[#cd2626] w-6 sm:w-8" : "bg-white/60 hover:bg-white/80 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white animate-bounce z-10 cursor-pointer">
        <BiChevronDown  className="md:size-10" />
      </div>
    </section>
  );
};

export default HeroSection;