import { useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProd } from "../features/products/productSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
      const data = await res.json();
      const prod = data.data;
      dispatch(setProd(prod));
    };
    fetchProducts();
  }, [dispatch]);
  // console.log("products:", products);

  return (
    <div className="bg-stone-100 dark:bg-gray-800 min-h-screen pt-9 p-16">
      <div className="text-black dark:text-white text-3xl font-bold text-center mb-6">
        Current Products
      </div>

      <div className="grid gap-6 grid-cols-[repeat(auto-fill,_minmax(16rem,_1fr))]">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-black text-center font-bold dark:text-white">
          No product Found
          <Link to={"/create"}>
            <div className="text-blue-500 hover:underline">
              Create a Product
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
