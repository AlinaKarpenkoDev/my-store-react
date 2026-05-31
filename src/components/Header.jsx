import { Link } from "react-router-dom";
import { useContext } from "react";
import { dict } from "./../utils/translations";
import { CartContext } from "./../context/CartContext";
import { WishlistContext } from "./../context/WishlistContext";
import { ThemeContext } from "./../context/ThemeContext";
import { LanguageContext } from "./../context/LanguageContext";

export default function Header() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { language, toggleLanguage } = useContext(LanguageContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const t = dict[language] || dict["ua"];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 dark:bg-zinc-700 dark:border-zinc-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link
          to="/"
          className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight hover:scale-105 transition-transform"
        >
          My Store
        </Link>

        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-6 items-center text-sm sm:text-base w-full md:w-auto">
          <Link
            to="/"
            className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors"
          >
            {t.home}
          </Link>
          <Link
            to="/catalog"
            className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors"
          >
            {t.catalog}
          </Link>
          <Link
            to="/wishlist"
            className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors flex items-center gap-1"
          >
            {t.wishlist}{" "}
            <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-0.5 rounded-full text-xs font-bold">
              {wishlist.length}
            </span>
          </Link>
          <Link
            to="/orders"
            className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors"
          >
            {t.orders}
          </Link>
          <Link
            to="/cart"
            className="text-zinc-600 dark:text-zinc-300 font-medium hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors flex items-center gap-1"
          >
            {t.cart}{" "}
            <span className="bg-blue-100 text-zinc-700 dark:bg-blue-900/30 dark:text-zinc-400 px-2 py-0.5 rounded-full text-xs font-bold">
              {cart.length}
            </span>
          </Link>

          <div className="flex items-center gap-3 border-l border-zinc-200 dark:border-zinc-700 pl-4 ml-1">
            <button
              onClick={toggleTheme}
              className="text-xl cursor-pointer hover:scale-110 transition-transform"
              title="Змінити тему"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={toggleLanguage}
              className="font-bold text-lg uppercase cursor-pointer text-zinc-800 dark:text-zinc-200 hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors"
            >
              {language}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
