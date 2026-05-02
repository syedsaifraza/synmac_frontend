'use client'
import { useEffect, useState, useRef } from "react";
import { FaGlobe } from "react-icons/fa";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "zh-CN", label: "中文" },
  { code: "ar", label: "العربية" },
  { code: "pt", label: "Português" },
  { code: "ja", label: "日本語" },
];

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LanguageSelector = () => {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const ref = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (window.google && window.google.translate) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    document.body.appendChild(script);
  }, []);


  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);


  const selectLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setOpen(false);

    document.cookie = `googtrans=/en/${langCode}; path=/`;

  
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  const currentLabel =
    languages.find((l) => l.code === currentLang)?.label || "EN";

  return (
    <div ref={ref} className="relative">
     
      <div
        id="google_translate_element"
        style={{ display: "none" }}
      />

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium"
      >
        <FaGlobe size={16} />
        <span>{currentLabel}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50 max-h-64 overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                currentLang === lang.code ? "font-bold text-blue-600" : ""
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;