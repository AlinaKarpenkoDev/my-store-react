import { useContext, useState } from "react";
import { CartContext } from "./../context/CartContext";
import { OrderContext } from "./../context/OrderContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { LanguageContext } from "../context/LanguageContext";
import { dict } from "../utils/translations";

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const { addOrder } = useContext(OrderContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { language } = useContext(LanguageContext);
  const t = dict[language] || dict["ua"];

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (name.trim().length < 3) {
      newErrors.name = t.errShortName;
    }
    if (phone.trim().length < 10) {
      newErrors.phone = t.errPhone;
    }
    if (!email.includes("@")) {
      newErrors.email = t.errEmail;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    } else {
      setErrors({});
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        items: cart,
        total: totalPrice,
      };

      addOrder(newOrder);
      clearCart();
      toast.success(t.orderSuccess);
      navigate("/");
    }
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-xl mx-auto px-4 py-10 min-h-[70vh]">
      <h2 className="text-3xl font-bold text-zinc-800 dark:text-white mb-8 text-center border-b border-zinc-200 dark:border-zinc-700 pb-4 transition-colors">
        {t.checkoutTitle}
      </h2>

      <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-sm dark:shadow-md border border-zinc-100 dark:border-zinc-700 transition-colors">
        <div className="bg-zinc-50 dark:bg-zinc-700/50 rounded-2xl p-6 mb-8 text-center border border-zinc-100 dark:border-zinc-600 transition-colors">
          <p className="text-zinc-600 dark:text-zinc-400 font-medium mb-1">
            {t.toPay}
          </p>
          <p className="text-3xl font-black text-zinc-900 dark:text-white">
            ${totalPrice.toFixed(2)}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              {t.nameLabel}
            </label>
            <input
              type="text"
              placeholder={t.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3 border border-zinc-200 dark:border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-all bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-500"
            />
            {errors.name && (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {errors.name}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              {t.phoneLabel}
            </label>
            <input
              type="tel"
              placeholder="+38 (000) 000-00-00"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-5 py-3 border border-zinc-200 dark:border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-all bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-500"
            />
            {errors.phone && (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {errors.phone}
              </span>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-zinc-200 dark:border-zinc-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400 transition-all bg-zinc-50 dark:bg-zinc-900/50 text-zinc-900 dark:text-white focus:bg-white dark:focus:bg-zinc-800 placeholder-zinc-400 dark:placeholder-zinc-500"
            />
            {errors.email && (
              <span className="text-red-500 dark:text-red-400 text-sm mt-1 block">
                {errors.email}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold text-lg py-4 rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 transition-all shadow-md mt-4 cursor-pointer"
          >
            {t.confirmOrder}
          </button>
        </form>
      </div>
    </div>
  );
}
