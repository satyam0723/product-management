import { useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProd } from "../features/products/productSlice.js";

const HomePage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    const prod = data.data;
    dispatch(setProd(prod));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      const prod = data.data;
      dispatch(setProd(prod));
    };
    fetchProducts();
  }, [dispatch]);
  // console.log("products:", products);

  return (
    <div className="bg-black min-h-screen pt-9 p-16">
      <div className="text-white text-3xl font-bold text-center mb-6">
        Current Products
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <div className="text-white text-center font-bold">
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
