import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  // Calculate total
  const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Ensure remove uses full key (id + variant info)
  const handleRemove = (item: any) => {
    removeFromCart(item.id, item.variant.finish, item.variant.grams);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No items in your cart yet.</p>
          <Link to="/" className="text-blue-600 hover:underline mt-4 block">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.variant.finish}-${item.variant.grams}`}
                className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md border"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {item.variant.finish} • {item.variant.grams}gsm
                    </p>
                    <p className="text-sm text-gray-600">
                      {item.quantity} pcs
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-blue-600">
                    ₦{item.totalPrice.toLocaleString()}
                  </div>
                  <button
                    onClick={() => handleRemove(item)}
                    className="text-red-600 text-sm hover:underline mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* TOTAL + CHECKOUT */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold text-gray-800">
              Total: ₦{total.toLocaleString()}
            </div>

            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Clear Cart
              </button>

              <button
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
