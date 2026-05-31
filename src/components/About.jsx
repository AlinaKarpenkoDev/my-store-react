import { useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { dict } from "../utils/translations";

export default function About() {
  const [openId, setOpenId] = useState(null);

  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];

  const toggleFaq = (index) => {
    // Якщо клікаємо на те ж саме питання - закриваємо, інакше - відкриваємо нове
    setOpenId(openId === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-10 text-center tracking-tight transition-colors">
        {t.aboutTitle}
      </h1>

      <div className="flex flex-col gap-8">
        {/* Секція: Про нас */}
        <section className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-colors hover:shadow-md">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <span>👋</span> {t.aboutSection}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {t.aboutDesc}
          </p>
        </section>

        {/* Секція: Контакти */}
        <section className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-colors hover:shadow-md">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <span>📞</span> {t.contactsSection}
          </h2>
          <ul className="text-zinc-600 dark:text-zinc-300 space-y-3">
            <li>
              <strong>Email:</strong> support@mystore.com
            </li>
            <li>
              <strong>{t.phoneLabel}</strong> +38 (000) 123-45-67
            </li>
            <li>
              <strong>{t.addressLabel}</strong> {t.addressText}
            </li>
          </ul>
        </section>

        {/* Секція: Умови використання */}
        <section className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700 transition-colors hover:shadow-md">
          <h2 className="text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-4 flex items-center gap-2">
            <span>📜</span> {t.termsSection}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {t.termsDesc}
          </p>
        </section>

        {/* Секція: FAQ Акордеон */}
        <section className="mt-8 border-t border-zinc-200 dark:border-zinc-700 pt-10">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 text-center transition-colors">
            {t.faqTitle}
          </h2>

          <div className="flex flex-col gap-4">
            {/* Перебираємо масив питань прямо зі словника */}
            {t.faqs.map((item, index) => {
              const isOpen = openId === index;

              return (
                <div
                  key={index}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "bg-blue-50 border-blue-200 dark:bg-zinc-800 dark:border-blue-900 shadow-md"
                      : "bg-white border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 shadow-sm hover:shadow-md"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left p-5 sm:p-6 flex justify-between items-center cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                  >
                    <span className="font-bold text-lg text-zinc-800 dark:text-zinc-100 pr-4">
                      {item.question}
                    </span>
                    <span
                      className={`text-3xl font-light text-zinc-600 transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-red-400" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="p-5 sm:p-6 pt-0 text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-700">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
