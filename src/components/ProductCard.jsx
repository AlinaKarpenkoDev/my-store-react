import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "./../context/CartContext";
import { WishlistContext } from "./../context/WishlistContext";
import { LanguageContext } from "../context/LanguageContext";
import { dict } from "../utils/translations";

export default function ProductCard({ image, title, price, id }) {
  const { addToCart, cart, updateQuantity } = useContext(CartContext);
  const { wishlist, toggleWishlist } = useContext(WishlistContext);
  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];

  const isProduct = cart.find((item) => {
    return item.id === id;
  });

  const isLiked = wishlist.find((item) => item.id === id);
  return (
    <div className="bg-white dark:bg-zinc-700 border border-zinc-100 dark:border-zinc-700 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 flex flex-col group h-full relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist({ id, title, price, image });
        }}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm shadow-md hover:bg-white dark:hover:bg-zinc-700 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer flex items-center justify-center border border-zinc-100 dark:border-zinc-600"
      >
        <span className="text-xl leading-none drop-shadow-sm">
          {isLiked ? "❤️" : "🤍"}
        </span>
      </button>

      <div className="h-56 w-full mb-4 overflow-hidden rounded-xl bg-white dark:bg-zinc-200 flex items-center justify-center p-4">
        <img
          src={image}
          alt={title}
          className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <Link to={`/catalog/${id}`}>
        <h3
          className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-2 line-clamp-2 flex-grow"
          title={title}
        >
          {title}
        </h3>
      </Link>

      <div className="mt-auto">
        <span className="text-2xl font-bold text-zinc-700 mb-4 block">
          ${price}
        </span>

        {isProduct ? (
          <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-700 rounded-xl p-1 border border-zinc-200 dark:border-zinc-600 h-[52px]">
            <button
              onClick={() => updateQuantity(id, isProduct.quantity - 1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-zinc-600 shadow-sm hover:bg-zinc-100 active:scale-95 transition-all text-xl font-medium cursor-pointer"
            >
              -
            </button>
            <span className="font-semibold text-zinc-800 text-sm sm:text-base dark:text-zinc-200">
              {isProduct.quantity} {t.inCart}
            </span>
            <button
              onClick={() => updateQuantity(id, isProduct.quantity + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-white text-zinc-600 shadow-sm hover:bg-zinc-100 active:scale-95 transition-all text-xl font-medium cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart({ id, title, price, image })}
            className="w-full h-[52px] bg-zinc-900 text-white font-medium rounded-xl hover:bg-zinc-700 transition-colors active:scale-95 shadow-md cursor-pointer"
          >
            {t.addToCart}
          </button>
        )}
      </div>
    </div>
  );
}
