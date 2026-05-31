import { OrderContext } from "./../context/OrderContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { dict } from "../utils/translations";

export default function Orders() {
  const { orders } = useContext(OrderContext);
  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-[70vh]">
      <h2 className="text-3xl font-bold text-zinc-800 mb-8 text-center border-b pb-4 dark:text-white dark:border-zinc-700 transition-colors">
        {t.ordersTitle}
      </h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-6xl mb-6">🤷‍♀️</span>
          <h2 className="text-2xl font-medium text-zinc-600 mb-8 dark:text-zinc-300">
            {t.noOrders}
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
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-zinc-800 rounded-3xl shadow-sm p-6 sm:p-8 border border-zinc-100 dark:border-zinc-700 transition-all hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-zinc-100 dark:border-zinc-700 pb-4 mb-5 gap-4">
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-1">
                    {t.orderNum} {order.id}
                  </p>
                  <p className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                    {order.date}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-1">
                    {t.totalOrderSum}
                  </p>
                  <p className="text-2xl font-black text-zinc-700 dark:text-zinc-400">
                    ${order.total.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    // ОСЬ ФІКС ФОНУ: bg-white dark:bg-zinc-200 замість темного
                    className="h-20 w-20 sm:h-24 sm:w-24 bg-white dark:bg-zinc-200 rounded-xl p-2 flex items-center justify-center border border-zinc-200 dark:border-zinc-500 relative group cursor-pointer"
                    title={item.title}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
                    />
                    {item.quantity > 0 && (
                      <span className="absolute -top-2 -right-2 bg-zinc-900 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full shadow-md border-2 border-white dark:border-zinc-800">
                        x{item.quantity}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
