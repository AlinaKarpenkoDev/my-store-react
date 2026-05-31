import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();
export default function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("my_wishlist")) || []
  );

  useEffect(() => {
    localStorage.setItem("my_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    const existingProduct = wishlist.find((item) => {
      return item.id === product.id;
    });
    if (existingProduct) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };
  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}
