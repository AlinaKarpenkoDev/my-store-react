import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "ua"
  );

  const toggleLanguage = () => {
    setLanguage(language === "ua" ? "en" : "ua");
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
