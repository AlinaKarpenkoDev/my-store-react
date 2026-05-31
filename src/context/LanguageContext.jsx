import { createContext, useState, useEffect } from "react";
export const LanguageContext = createContext();
export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    JSON.parse(localStorage.getItem("language")) || '"ua"'
  );

  const toggleLanguage = () => {
    if (language == "ua") {
      setLanguage("en");
    } else {
      setLanguage("ua");
    }
  };

  useEffect(() => {
    localStorage.setItem("language", JSON.stringify(language));
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
