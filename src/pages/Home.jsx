import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import ProductCard from "./../components/ProductCard";
import { LanguageContext } from "./../context/LanguageContext";
import { dict } from "./../utils/translations";

export default function Home() {
  const [popularProducts, setPopularProducts] = useState([]);
  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];

  useEffect(() => {
    async function getPopularProducts() {
      const response = await fetch(`https://fakestoreapi.com/products?limit=4`);
      const data = await response.json();
      setPopularProducts(data);
    }
    getPopularProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 text-zinc-900 dark:text-white py-24 px-4 text-center shadow-sm dark:shadow-lg border-b border-zinc-200 dark:border-zinc-700 transition-colors duration-300">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            {t.heroWelcome}{" "}
            <span className="text-zinc-500 dark:text-zinc-300">My Store!</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10 font-medium">
            {t.heroDescription}
          </p>
          <Link
            to="/catalog"
            className="bg-zinc-800 text-white dark:bg-zinc-700 font-bold text-lg py-4 px-10 rounded-full hover:bg-zinc-700 dark:hover:bg-zinc-600 active:scale-95 transition-all shadow-[0_0_20px_rgba(39,39,42,0.15)] dark:shadow-[0_0_20px_rgba(82,82,91,0.5)]"
          >
            {t.heroButton}
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="flex justify-between items-end mb-10 border-b border-zinc-200 dark:border-zinc-700 pb-4">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            {t.popularTitle}
          </h2>
          <Link
            to="/catalog"
            className="text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 font-medium transition-colors"
          >
            {t.seeAll}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularProducts.map((item) => {
            return (
              <ProductCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                price={item.price}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
