import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "./../context/WishlistContext";
import ProductCard from "./../components/ProductCard";
import { LanguageContext } from "../context/LanguageContext";
import { dict } from "../utils/translations";

export default function Wishlist() {
  const { wishlist } = useContext(WishlistContext);
  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-[70vh]">
      <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8 text-center border-b border-zinc-200 dark:border-zinc-700 pb-4 transition-colors">
        {t.wishlistTitle}
      </h2>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl mb-6">💔</span>
          <h2 className="text-2xl font-medium text-zinc-600 dark:text-zinc-300 mb-8 text-center">
            {t.wishlistEmpty}
          </h2>
          <Link
            to="/catalog"
            className="bg-zinc-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg hover:shadow-zinc-600/40"
          >
            {t.backToCatalog}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => {
            return (
              <ProductCard
                key={item.id}
                id={item.id}
                price={item.price}
                title={item.title}
                image={item.image}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
