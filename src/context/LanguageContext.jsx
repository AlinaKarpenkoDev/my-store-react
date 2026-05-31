import { createContext, useState, useEffect } from "react";

export const LanguageContext = createContext();

export default function LanguageProvider({ children }) {
  // Розумне отримання: якщо знаходимо старі збереження з лапками,
  // метод .replace(/"/g, "") автоматично їх вирізає!
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("language");
    return saved ? saved.replace(/"/g, "") : "ua";
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
