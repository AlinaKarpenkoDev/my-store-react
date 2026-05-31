import { createContext, useState, useEffect } from "react";
export const OrderContext = createContext();
export default function OrderProvider({ children }) {
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  function addOrder(order) {
    setOrders([order, ...orders]);
  }

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}
