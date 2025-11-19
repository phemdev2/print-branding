import React from "react";
import { useCart } from "../context/CartContext";

const CartDrawer = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform z-50 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-xl font-bold">Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[calc(100%-64px)]">
        {cart.length === 0 ? (
          <p className="text-gray-500">No items in cart</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.id + item.variant.finish} className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.title}</p>
                    <p className="text-sm text-gray-500">
                      {item.variant.finish} • {item.quantity} pcs
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    ₦{item.totalPrice.toLocaleString()}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 text-xs hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-auto border-t pt-4 flex justify-between items-center font-bold text-gray-800">
              <p>Total:</p>
              <p>
                ₦{cart.reduce((sum, item) => sum + item.totalPrice, 0).toLocaleString()}
              </p>
            </div>

            <button
              onClick={clearCart}
              className="mt-2 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
