import { Link } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";
import { dict } from "../utils/translations";
import { useContext } from "react";

export default function Footer() {
  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];

  return (
    <footer className="bg-zinc-700 text-zinc-300 py-8 px-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm">© 2026 My Store. {t.rights}.</div>

        <nav className="flex gap-6 text-sm font-medium">
          <Link to="/about" className="hover:text-white transition-colors">
            {t.about}
          </Link>
          <Link to="/about" className="hover:text-white transition-colors">
            {t.contacts}
          </Link>
          <Link to="/about" className="hover:text-white transition-colors">
            {t.terms}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
