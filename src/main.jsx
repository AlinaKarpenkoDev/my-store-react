import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CartProvider from "./context/CartContext";
import WishlistProvider from "./context/WishlistContext";
import LanguageProvider from "./context/LanguageContext";
import OrderProvider from "./context/OrderContext";
import ThemeProvider from "./context/ThemeContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <OrderProvider>
      <CartProvider>
        <WishlistProvider>
          <StrictMode>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </StrictMode>
        </WishlistProvider>
      </CartProvider>
    </OrderProvider>
  </LanguageProvider>
);
