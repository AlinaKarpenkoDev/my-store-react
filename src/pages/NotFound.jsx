import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { dict } from "../utils/translations";

export default function NotFound() {
  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-black text-zinc-200 mb-4 select-none">
        404
      </h1>

      <p className="text-zinc-500 text-lg mb-8 max-w-md">{t.notFoundText}</p>

      <Link
        to="/"
        className="bg-zinc-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg hover:shadow-zinc-600/40"
      >
        {t.prev}
      </Link>
    </div>
  );
}
