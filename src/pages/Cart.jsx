import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./../context/CartContext";
import { LanguageContext } from "./../context/LanguageContext";
import { dict } from "./../utils/translations";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8 text-center border-b border-zinc-200 dark:border-zinc-700 pb-4">
        {t.cartTitle}
      </h2>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl mb-6">😔</span>
          <h2 className="text-2xl font-medium text-zinc-600 dark:text-zinc-300 mb-8">
            {t.cartEmpty}
          </h2>
          <Link
            to="/catalog"
            className="bg-zinc-700 text-white font-bold py-3 px-8 rounded-xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg hover:shadow-zinc-600/40"
          >
            {t.backToCatalog}
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700 p-6 sm:p-8 flex flex-col gap-6 transition-colors">
            {cart.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-6 border-b border-zinc-100 dark:border-zinc-700 pb-6 last:border-0 last:pb-0"
                >
                  <Link
                    to={`/catalog/${item.id}`}
                    className="h-24 w-24 flex-shrink-0 bg-zinc-50 dark:bg-zinc-200 rounded-xl p-2 flex items-center justify-center"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full object-contain mix-blend-multiply"
                    />
                  </Link>

                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">
                      ${item.price} {t.pricePerPiece}
                    </p>
                  </div>

                  <div className="text-center sm:text-right flex flex-col items-center sm:items-end gap-3 mt-4 sm:mt-0">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-red-400 hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1"
                    >
                      {t.remove}
                    </button>

                    <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-700 rounded-xl p-1 border border-zinc-200 dark:border-zinc-600">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-600 dark:text-white shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-500 active:scale-95 transition-all text-lg cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold text-zinc-800 dark:text-zinc-100">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-zinc-600 dark:text-white shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-500 active:scale-95 transition-all text-lg cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className="block font-bold text-zinc-700 text-xl">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700 p-6 sm:p-8 mt-2 flex flex-col gap-6 transition-colors">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-700 pb-6">
              <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-100">
                {t.totalSum}
              </span>
              <span className="text-4xl font-black text-zinc-900 dark:text-white">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="block text-center w-full bg-zinc-900 text-white font-bold text-xl py-4 rounded-2xl hover:bg-zinc-700 active:scale-95 transition-all shadow-lg hover:shadow-zinc-600/30"
            >
              {t.checkoutButton}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
