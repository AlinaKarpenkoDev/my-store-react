import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "./../context/CartContext";
import { LanguageContext } from "../context/LanguageContext";
import { dict } from "../utils/translations";

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { addToCart, cart, updateQuantity } = useContext(CartContext);
  const { id } = useParams();

  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];

  useEffect(() => {
    async function getProductId() {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    }
    getProductId();
  }, [id]);

  const productId = Number(id);
  const isProduct = cart.find((item) => item.id === productId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 min-h-[70vh]">
      <Link
        to="/catalog"
        className="inline-block mb-8 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-400 font-medium transition-colors"
      >
        {t.backToCatalog}
      </Link>

      {product === null ? (
        <div className="flex justify-center items-center h-64">
          <h2 className="text-3xl font-bold text-zinc-400 dark:text-zinc-500 animate-pulse">
            {t.loadingDetails}
          </h2>
        </div>
      ) : (
        <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-700 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 transition-colors">
          <div className="flex justify-center items-center bg-zinc-50 dark:bg-zinc-200 rounded-2xl p-8">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 object-contain mix-blend-multiply"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="uppercase text-sm font-bold text-zinc-400 dark:text-zinc-500 tracking-wider mb-2">
              {t.categories[product.category] || product.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-6 leading-tight">
              {product.title}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-auto">
              <span className="text-4xl font-black text-zinc-700 dark:text-zinc-400 block mb-6">
                ${product.price}
              </span>

              {isProduct ? (
                <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-700 rounded-2xl p-2 border border-zinc-200 dark:border-zinc-600">
                  <button
                    onClick={() =>
                      updateQuantity(productId, isProduct.quantity - 1)
                    }
                    className="w-14 h-14 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-600 dark:text-white text-zinc-600 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-500 active:scale-95 transition-all text-3xl font-medium cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-semibold text-zinc-800 dark:text-zinc-100 text-xl text-center">
                    {t.inCartDetails} {isProduct.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(productId, isProduct.quantity + 1)
                    }
                    className="w-14 h-14 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-600 dark:text-white text-zinc-600 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-500 active:scale-95 transition-all text-3xl font-medium cursor-pointer"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-zinc-900 text-white font-bold text-xl py-5 rounded-2xl hover:bg-zinc-700 active:scale-95 transition-all shadow-lg hover:shadow-zinc-600/30 cursor-pointer"
                >
                  {t.addToCart}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
