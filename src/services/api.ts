import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

// ✅ Fetch all products
export const fetchProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
};

// ✅ Fetch single product by ID
export const fetchProductById = async (id: number | string) => {
  const res = await axios.get(`${API_BASE}/products/${id}`);
  return res.data;
};
