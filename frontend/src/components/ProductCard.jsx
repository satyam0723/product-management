import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateProd, deleteProd } from "../features/products/productSlice.js";

const ProductCard = ({ product }) => {
  // console.log(product._id);
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setUpdatedProduct(product);
  }, [isModalOpen]);

  const deleteProduct = async () => {
    const res = await fetch(
      `/api/products/${product._id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();

    if (data.success) dispatch(deleteProd(product._id));
    return { success: data.success, message: data.message };
  };
  const updateProduct = async () => {
    if (
      !updatedProduct.name.trim() ||
      !updatedProduct.image.trim() ||
      !String(updatedProduct.price).trim()
    ) {
      return { success: false, message: "please fill in all fields." };
    }
    const res = await fetch(
      `/api/products/${product._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    );
    const data = await res.json();
    if (data.success) {
      const newProduct = data.data;
      const pid = product._id;
      dispatch(updateProd({ pid, newProduct }));
    }
    return { success: data.success, message: data.message };
  };
  const handleDeleteProduct = async () => {
    const { success, message } = await deleteProduct();
    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const { success, message } = await updateProduct();
    if (success) {
      toast.success("Product updated successfully");
      setIsModalOpen(false);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg w-64 h-[340px] border dark:border-transparent border-black/20">
      <img src={product.image} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white">{product.name}</h2>
        <p className="text-blue-400 text-lg font-bold">Rs.{product.price}</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700 text-white px-4 py-2 rounded flex items-center"
          >
            ✏ Edit
          </button>
          <button
            onClick={handleDeleteProduct}
            className="bg-red-600 text-white px-4 py-2 rounded flex items-center"
          >
            🗑 Delete
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/10 backdrop-blur-sm z-50">
            <div
              className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold mb-4">Update Product</h2>
              <form onSubmit={handleUpdateProduct}>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full border p-2 mb-3 rounded"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      name: e.target.value,
                    })
                  }
                />
                <input
                  type="number"
                  placeholder="Price"
                  className="w-full border p-2 mb-3 rounded"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  className="w-full border p-2 mb-3 rounded"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      image: e.target.value,
                    })
                  }
                />

                <div className="flex justify-end gap-2 mt-4">
                  <input
                    type="submit"
                    value="Update"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  />

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
              >
                &times;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
