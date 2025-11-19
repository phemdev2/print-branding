import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/HeaderBar";
import CartDrawer from "./components/CartDrawer";

import ProductsPage from "./pages/ProductsPage";
import SingleProductPage from "./pages/SingleProductPage";

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">

      {/* HEADER */}
      <Header onCartOpen={() => setCartOpen(true)} />

      {/* CART DRAWER */}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      {/* PAGE CONTENT */}
      <main className="flex-grow overflow-y-auto">
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<SingleProductPage />} />
        </Routes>
      </main>

    </div>
  );
}
