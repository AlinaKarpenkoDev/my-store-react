import { createContext, useState, useEffect } from "react";
export const LanguageContext = createContext();
export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || ["ua"]
  );

  const toggleLanguage = () => {
    if (language == "ua") {
      setLanguage("en");
    } else {
      setLanguage("ua");
    }
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
