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

const LanguageSelector = ({ textColorClass }: { textColorClass: string }) => {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Google Translate script
    if (!document.getElementById("google-translate-script")) {
      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      };
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.head.appendChild(script);
    }

    // Hide Google Translate bar via style
    const style = document.createElement("style");
    style.textContent = `
      .goog-te-banner-frame, .skiptranslate, #google_translate_element { display: none !important; }
      body { top: 0 !important; }
      .goog-te-gadget { display: none !important; }
    `;
    document.head.appendChild(style);

    return () => { document.head.removeChild(style); };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectLanguage = (langCode: string) => {
    setCurrentLang(langCode);
    setOpen(false);

    // Trigger Google Translate
    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
  };

  const currentLabel = languages.find((l) => l.code === currentLang)?.label || "EN";

  return (
    <div ref={ref} className="relative">
      <div id="google_translate_element" className="hidden" />
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${textColorClass}`}
        aria-label="Select language"
      >
        <FaGlobe size={16} />
        <span className="hidden sm:inline">{currentLabel}</span>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-lg border border-border bg-background shadow-xl py-1 z-50 max-h-64 overflow-y-auto">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                currentLang === lang.code ? "text-primary font-medium" : "text-foreground"
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
