import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchProductById, fetchProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import type { Product, Variant } from "../types";

/**
 * SingleProductPage
 * - Option C price behavior: product.price is base; variant price (if present) overrides.
 * - Variant price fields normalized (price_per_100 | pricePer100 | price).
 */

const SingleProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState<number>(100);

  // Preset quick-add quantities
  const presetQuantities = [100, 200, 300, 500, 1000];

  // Normalize variant shape to always have pricePer100 (number), grams, finish, id
  const normalizeVariant = (v: any): Variant & { pricePer100: number } => {
    const price =
      Number(v.pricePer100 ?? v.price_per_100 ?? v.price ?? 0) || 0;
    return {
      ...v,
      pricePer100: price,
      grams: v.grams,
      finish: v.finish,
      id: v.id,
    };
  };

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    (async () => {
      try {
        const data = await fetchProductById(id);

        // Ensure variants normalized
        const normalizedVariants = (data.variants || []).map(normalizeVariant);

        const normalizedProduct: Product & { variants: any[] } = {
          ...data,
          variants: normalizedVariants,
        };

        setProduct(normalizedProduct);
        setSelectedVariant(normalizedVariants[0] ?? null);
      } catch (err) {
        console.error("Failed to load product", err);
        setProduct(null);
      } finally {
        setLoading(false);
      }

      try {
        const all = await fetchProducts();
        setRelated((all || []).filter((p: Product) => p.id !== Number(id)).slice(0, 6));
      } catch (err) {
        // ignore related errors
        console.error("Failed to load related", err);
      }
    })();
  }, [id]);

  // Derived lists and helper
  const finishes = useMemo(
    () =>
      product ? [...new Set(product.variants.map((v: any) => v.finish))] : [],
    [product]
  );

  // GSMs available for currently selected finish (if none selected, show all unique GSMs)
  const gsms = useMemo(() => {
    if (!product) return [];
    if (selectedVariant) {
      // GSMs available for the selected finish
      return [
        ...new Set(
          product.variants
            .filter((v: any) => v.finish === selectedVariant.finish)
            .map((v: any) => v.grams)
        ),
      ];
    }
    return [...new Set(product.variants.map((v: any) => v.grams))];
  }, [product, selectedVariant]);

  // Helper: find variant by finish + grams
  const findVariant = (finish: string, grams: number) =>
    product?.variants.find(
      (v: any) => v.finish === finish && Number(v.grams) === Number(grams)
    );

  // Unit price (per 100) — variant overrides product.price when available
  const unitPricePer100 = useMemo(() => {
    if (!product) return 0;
    const variantPrice = (selectedVariant as any)?.pricePer100 ?? 0;
    if (variantPrice && variantPrice > 0) return variantPrice;
    // product.price may be stored as price = number (per 100)
    return Number((product as any).price ?? 0);
  }, [product, selectedVariant]);

  // Total price: (unitPricePer100 / 100) * quantity
  const totalPrice = useMemo(() => {
    return (Number(unitPricePer100 || 0) / 100) * Number(quantity || 0);
  }, [unitPricePer100, quantity]);

  // UI guards
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-600">
        Loading product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-700">
        <h1 className="text-2xl font-bold mb-3">Product Not Found</h1>
        <Link to="/" className="text-blue-600 underline">
          Back to Products
        </Link>
      </div>
    );
  }

  // Handlers
  const handlePresetAdd = (n: number) => setQuantity((prev) => Math.max(100, prev + n));

  const handleCustomQuantity = (val: number) => setQuantity(Math.max(100, Math.floor(val)));

  const handleSelectFinish = (finish: string) => {
    // Keep same grams if possible, otherwise pick first matching
    const grams = selectedVariant?.grams;
    const match = findVariant(finish, grams ?? -1) || product.variants.find((v: any) => v.finish === finish);
    if (match) setSelectedVariant(match);
  };

  const handleSelectGsm = (grams: number) => {
    // Keep same finish if possible
    const finish = selectedVariant?.finish;
    const match = findVariant(finish ?? "", grams) || product.variants.find((v: any) => v.grams === grams);
    if (match) setSelectedVariant(match);
  };

  const handleAddToCart = () => {
    // Keep backward compatibility: addToCart(product, variant, quantity)
    // If variant is null, pass null — cart logic should handle fallback (product.price)
    addToCart(product, selectedVariant, quantity);
  };

  return (
    <main className="container mx-auto px-4 py-8 flex flex-col gap-10 h-full overflow-y-auto">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>{" "}
        / <Link to="/products" className="hover:text-blue-600">Products</Link>{" "}
        / <span className="ml-1 text-gray-700">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl overflow-hidden shadow bg-white"
        >
          <img src={product.image} alt={product.title} className="w-full h-96 object-cover" />
        </motion.div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-gray-600 mt-3">{product.description}</p>

          {/* MATERIAL SELECTOR */}
          {finishes.length > 0 && (
            <div className="mt-6">
              <label className="text-gray-700 font-semibold mb-2 block text-lg">Material</label>
              <div className="flex gap-3 flex-wrap">
                {finishes.map((finish) => {
                  const active = selectedVariant?.finish === finish;
                  return (
                    <button
                      key={finish}
                      onClick={() => handleSelectFinish(finish)}
                      className={`px-5 py-2 rounded-2xl border text-sm font-medium transition-all ${
                        active ? "bg-blue-600 text-white border-blue-700 shadow" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {finish}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* GSM SELECTOR (filtered by selected finish) */}
          {gsms.length > 0 && (
            <div className="mt-6">
              <label className="text-gray-700 font-semibold mb-2 block text-lg">Thickness (GSM)</label>
              <div className="flex gap-3 flex-wrap">
                {gsms.map((g: any) => {
                  const active = selectedVariant?.grams === g;
                  return (
                    <button
                      key={g}
                      onClick={() => handleSelectGsm(Number(g))}
                      className={`px-5 py-2 rounded-2xl border text-sm font-medium transition-all ${
                        active ? "bg-blue-600 text-white border-blue-700 shadow" : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                      }`}
                    >
                      {g}gsm
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Variant preview */}
          {selectedVariant && (
            <div className="mt-6 p-4 rounded-xl border bg-gray-50 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Selected Variant</h3>
              <p className="text-gray-700"><span className="font-medium">Material:</span> {selectedVariant.finish}</p>
              <p className="text-gray-700"><span className="font-medium">Thickness:</span> {selectedVariant.grams}gsm</p>
              <p className="text-gray-700 mt-2">
                <span className="font-medium">Unit price (per 100):</span>{" "}
                ₦{Number(selectedVariant.pricePer100 ?? unitPricePer100 ?? 0).toLocaleString()}
              </p>
            </div>
          )}

          {/* QUANTITY SELECTOR */}
          <div className="mt-6">
            <label className="text-gray-700 font-medium mb-2 block">Quantity</label>

            {/* Preset + add behavior */}
            <div className="flex flex-wrap gap-3 mb-3">
              {presetQuantities.map((q) => (
                <button
                  key={q}
                  onClick={() => handlePresetAdd(q)}
                  className="px-4 py-2 rounded-xl border text-sm bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
                >
                  +{q}
                </button>
              ))}
              {/* Quick reset */}
              <button
                onClick={() => setQuantity(100)}
                className="px-4 py-2 rounded-xl border text-sm bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>

            {/* Manual input */}
            <input
              type="number"
              min={100}
              step={100}
              value={quantity}
              onChange={(e) => handleCustomQuantity(Number(e.target.value))}
              className="border px-4 py-2 rounded-xl w-40"
            />
          </div>

          {/* PRICING */}
          <div className="mt-6">
            <div className="text-sm text-gray-500">Unit price (per 100):</div>
            <div className="text-3xl font-bold text-blue-700">₦{Number(unitPricePer100 || 0).toLocaleString()}</div>

            <div className="mt-4 text-sm text-gray-500">Total:</div>
            <div className="text-2xl font-bold text-gray-900">₦{Number(totalPrice || 0).toLocaleString()}</div>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-medium shadow hover:bg-blue-700 transition active:scale-95"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <section>
        <h2 className="text-xl font-semibold mb-4">You may also like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {related.map((p) => (
            <Link
              key={p.id}
              to={`/product/${p.id}`}
              className="group bg-white border rounded-xl p-3 hover:shadow-lg transition"
            >
              <img src={p.image} className="h-40 w-full object-cover rounded-lg" />
              <p className="mt-3 font-medium group-hover:text-blue-700">{p.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default SingleProductPage;
