import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import Footer from "./components/Footer";   // ← ADD THIS
import "./index.css";

// --- FIX VIEWPORT HEIGHT FOR MOBILE BROWSERS ---
function fixVH() {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
}
fixVH();
window.addEventListener("resize", fixVH);
// ------------------------------------------------

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <App />

          {/* GLOBAL FOOTER */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
