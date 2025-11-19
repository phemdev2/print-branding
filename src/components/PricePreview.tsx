import React from "react";
import { products } from "../data";
import type { Product } from "../types";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const ProductsPage: React.FC = () => {
  return (
    <>
      <main
        className="container mx-auto px-4 py-10"
        aria-labelledby="products-heading"
      >
        <h1
          id="products-heading"
          className="text-3xl font-bold mb-8 text-gray-800"
        >
          Our Products
        </h1>

        <section
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          aria-label="Product items"
        >
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ProductsPage;
