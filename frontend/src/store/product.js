import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  // setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (
      !newProduct.name.trim() ||
      !newProduct.image.trim() ||
      !String(newProduct.price).trim()
    ) {
      return { success: false, message: "please fill in all fields." };
    }
    const res = await fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    if (data.success) {
      set((state) => ({ products: [...state.products, data.data] }));
    }
    return { success: data.success, message: data.message };
  },

  fetchProducts: async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };

    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },

  updateProduct: async (pid, updatedProduct) => {
    if (
      !updatedProduct.name.trim() ||
      !updatedProduct.image.trim() ||
      !String(updatedProduct.price).trim()
    ) {
      return { success: false, message: "please fill in all fields." };
    }
    const res = await fetch(`http://localhost:5000/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (data.success) {
      // update the ui immediately, without needing a refresh
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));
    }
    return { success: data.success, message: data.message };
  },
}));
