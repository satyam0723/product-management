import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createProd } from "../features/products/productSlice.js";
import { Link } from "react-router";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const dispatch = useDispatch();

  const createProduct = async (newProduct) => {
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
    if (data.success) dispatch(createProd(data.data));
    return { success: data.success, message: data.message };
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast.success("Product added successfully");
      setNewProduct({ name: "", price: "", image: "" });
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="bg-stone-100 dark:bg-gray-800 min-h-screen p-30">
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-black dark:text-white">
          Create new Product
        </h1>

        <div>
          <form
            onSubmit={handleAddProduct}
            className="bg-blue-50 shadow-lg rounded-lg space-y-4 p-6"
          >
            <input
              type="text"
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            />

            <input
              type="number"
              inputMode="numeric"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            />

            <input
              type="url"
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            <div className="flex justify-between">
              <input
                type="submit"
                value="Add product"
                className="cursor-pointer bg-cyan-600 text-white rounded-lg p-2 "
              />
              <Link to="/">
                <div className="cursor-pointer bg-cyan-600 text-white rounded-lg p-2">
                  Return to Home
                </div>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
