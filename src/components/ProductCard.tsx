import React from "react";
import type { Product } from "../types";
import { Link } from "react-router-dom";

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {

  // Safe: prevents Infinity when no variants exist
  const minPrice =
    product.variants && product.variants.length > 0
      ? Math.min(...product.variants.map((v) => Number(v.pricePer100 || 0)))
      : Number(product.price || 0);

  const firstVariant =
    product.variants && product.variants.length > 0
      ? product.variants[0]
      : null;

  return (
    <div
      className="
        group bg-white rounded-2xl border border-gray-200 shadow-sm
        hover:shadow-xl hover:border-gray-300 hover:-translate-y-1
        transition-all duration-300 ease-out
      "
    >
      {/* Image */}
      <div className="relative h-52 w-full overflow-hidden rounded-t-2xl bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* GSM Badge (safe) */}
        {firstVariant && (
          <span
            className="
              absolute bottom-3 left-3 text-xs font-medium
              bg-white/90 px-2.5 py-1 rounded-full border border-gray-300
              backdrop-blur-sm shadow-sm
            "
          >
            {firstVariant.grams}gsm
          </span>
        )}

        {/* Hover overlay */}
        <div
          className="
            absolute inset-0 bg-gradient-to-t from-black/20 to-transparent
            opacity-0 group-hover:opacity-60 transition duration-500
          "
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="
            font-semibold text-gray-900 text-[17px] truncate
            group-hover:text-blue-700 transition-colors
          "
        >
          {product.title}
        </h3>

        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price + CTA */}
        <div className="mt-5 flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-blue-700">
              ₦{Number(minPrice).toLocaleString()}
            </p>

            <span
              className="
                text-[11px] text-gray-400 uppercase tracking-wide block
              "
            >
              Starting Price
            </span>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="
              px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium
              shadow-sm hover:bg-blue-700 hover:shadow-lg
              transition-all active:scale-95
            "
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
