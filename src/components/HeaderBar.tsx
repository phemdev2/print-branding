import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Menu, X, ShoppingCart } from "lucide-react";

export default function Header({ onCartOpen }: { onCartOpen: () => void }) {
  const [mobileMenu, setMobileMenu] = useState(false);
  const { cart } = useCart();

  const cartCount = cart.reduce((n, item) => n + 1, 0);

  return (
    <header className="w-full border-b bg-gray-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold select-none">
          PrintZ<span className="text-blue-400">i</span>on
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link to="/" className="hover:text-blue-400 transition">Products</Link>
          <a href="#" className="hover:text-blue-400 transition">Resellers</a>
          <a href="#" className="hover:text-blue-400 transition">Merch</a>
          <a href="#" className="hover:text-blue-400 transition">Marketplace</a>
        </nav>

        {/* ACTION BUTTONS */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-sm hover:text-blue-400 transition">Sign in</button>

          <button className="text-sm bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm transition">
            Create Account
          </button>

          {/* CART ICON */}
          <button
            onClick={onCartOpen}
            className="relative hover:opacity-80 transition"
          >
            <ShoppingCart size={24} />

            {/* Cart bubble */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileMenu(true)}
          className="md:hidden text-white hover:opacity-80"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* MOBILE MENU SLIDE */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden">
          <div className="bg-gray-800 w-72 h-full p-6 shadow-xl flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold">
                Menu
              </h1>
              <button
                onClick={() => setMobileMenu(false)}
                className="text-white"
              >
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-lg">
              <Link
                to="/"
                className="hover:text-blue-400"
                onClick={() => setMobileMenu(false)}
              >
                Products
              </Link>
              <a href="#" className="hover:text-blue-400">Resellers</a>
              <a href="#" className="hover:text-blue-400">Merch</a>
              <a href="#" className="hover:text-blue-400">Marketplace</a>
            </nav>

            <div className="mt-auto flex flex-col gap-4">
              <button className="text-left text-sm hover:text-blue-300">
                Sign in
              </button>

              <button className="bg-blue-600 w-full py-2 rounded-lg hover:bg-blue-700 transition">
                Create Account
              </button>

              {/* CART BTN MOBILE */}
              <button
                onClick={() => {
                  setMobileMenu(false);
                  onCartOpen();
                }}
                className="flex items-center gap-3 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg mt-4"
              >
                <ShoppingCart size={22} />
                <span className="font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
