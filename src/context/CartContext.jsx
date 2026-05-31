import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();
export default function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("my_cart")) || []
  );

  useEffect(() => {
    localStorage.setItem("my_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    console.log("додано:", product);
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      setCart(
        cart.map((item) => {
          return item.id === product.id
            ? { ...product, quantity: item.quantity + 1 }
            : item;
        })
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    toast.success("Товар додано в кошик! 🛒");
  };

  const removeFromCart = (id) => {
    const filterRemove = cart.filter((item) => {
      return id !== item.id;
    });
    setCart(filterRemove);
  };
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      return removeFromCart(id);
    }
    const updateNewQuantity = cart.map((item) => {
      return item.id === id ? { ...item, quantity: newQuantity } : item;
    });
    setCart(updateNewQuantity);
  };

  const clearCart = () => {
    setCart([]);
  };
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
