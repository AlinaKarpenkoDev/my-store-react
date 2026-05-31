import { useEffect, useState, useContext } from "react";
import ProductCard from "./../components/ProductCard";
import Skeleton from "./../components/Skeleton";
import { LanguageContext } from "./../context/LanguageContext";
import { dict } from "./../utils/translations";

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    }
    getProducts();
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts =
    sortOrder === "asc"
      ? [...filteredProducts].sort((a, b) => a.price - b.price)
      : sortOrder === "desc"
      ? [...filteredProducts].sort((a, b) => b.price - a.price)
      : filteredProducts;

  const categories = ["all", ...new Set(products.map((item) => item.category))];

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 dark:bg-zinc-900 dark:border-zinc-800">
      <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8 text-center">
        {t.catalogTitle}
      </h2>
      <div className="mb-10 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:max-w-md px-5 py-3 border border-zinc-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 transition-all text-zinc-700 bg-white dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full md:w-auto px-5 py-3 border border-zinc-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:border-zinc-600 transition-all text-zinc-700 bg-white cursor-pointer dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
          >
            <option value="default">{t.sortDefault}</option>
            <option value="asc">{t.sortAsc}</option>
            <option value="desc">{t.sortDesc}</option>
          </select>
        </div>

        <ul className="flex flex-wrap gap-3">
          {categories.map((item) => {
            return (
              <li key={item}>
                <button
                  onClick={() => setSelectedCategory(item)}
                  className={`px-5 py-2.5 rounded-xl font-medium capitalize transition-all duration-300 active:scale-95 ${
                    selectedCategory === item
                      ? "bg-zinc-900 text-white shadow-md dark:bg-zinc-700 dark:border-zinc-700"
                      : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-700 shadow-sm"
                  }`}
                >
                  {t.categories[item] || item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading
          ? [...Array(8)].map((_, index) => <Skeleton key={index} />)
          : sortedProducts.map((item) => {
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
  );
}
