import { useState } from "react";
import { useProductStore } from "../store/product.js";
import { ToastContainer, toast } from "react-toastify";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log(newProduct);
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast.success("Product added successfully");
      setNewProduct({ name: "", price: "", image: "" });
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen p-30">
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">
          Create new Product
        </h1>

        <div >
          <form onSubmit={handleAddProduct} className="bg-blue-50 shadow-lg rounded-lg space-y-4 p-6">
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

            <input
              type="submit"
              value="Add product"
              className="cursor-pointer w-full bg-blue-500 text-white rounded-lg py-2"
              // onClick={handleAddProduct}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
