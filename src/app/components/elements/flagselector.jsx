"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSelector({ languages, selectedLang }) {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname(); // Get current path

  const changeLanguage = (key) => {
    // Extract current path segments
    const segments = pathname.split("/").filter(Boolean); // Remove empty segments
    segments[0] = key; // Replace first segment with new locale

    const newPath = `/${segments.join("/")}`; // Construct new URL
    router.push(newPath); // Redirect to new locale
  };
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 bg-white border rounded shadow hover:bg-gray-100"
      >
        {selectedLang &&  <span className="mr-2">{languages[selectedLang].flag}</span>}
        {/*languages[selectedLang].name*/}
        <span className="ml-2">▼</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white border rounded shadow z-40">
          {Object.entries(languages).map(([key, language]) => (
            <button
              key={key}
              onClick={() => changeLanguage(key)}
              className="flex items-center w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}