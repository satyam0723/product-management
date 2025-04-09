import { useEffect } from "react";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  console.log("products:", products);

  return (
    <div className="bg-black min-h-screen pt-9 p-16">
      <div className="text-white text-3xl font-bold text-center mb-6">
        Current Products
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
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
