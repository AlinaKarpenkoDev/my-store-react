import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language") || "";
    return saved.toLowerCase().includes("en") ? "en" : "ua";
  });

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ua" ? "en" : "ua"));
  };

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
