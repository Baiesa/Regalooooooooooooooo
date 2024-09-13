import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState} from '../store'; 
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/shoppingCartSlice"; // Assuming you're using Redux to manage the cart

interface Product {
  product_id: number;
  name: string;
  price: number;
}

const ProductList = () => {
  // Database User from context
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // State for list of products
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://regaloowebsite-1.onrender.com/products"); 
      setProductList(response.data); 
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products");
      setLoading(false);
    }
  };

  // Fetch the products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle adding a product to the shopping cart
  const handleAddShoppingCart = (product: Product) => {
    if (isAuthenticated) {
      dispatch(addToCart({ ...product, id: Date.now().toString() })); // Add product to the cart with a unique ID
    } else {
      alert("Please login to add items to your cart");
      navigate("/login");
    }
  };

  return (
    <div className="container mx-auto pt-5">
      <h3 className="text-2xl font-semibold mb-6">Products</h3>
      <div className="flex flex-wrap -mx-4">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          productList.map((product) => (
            <div key={product.product_id} className="w-full md:w-1/3 px-4 mb-6">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h4 className="text-xl font-medium">{product.name}</h4>
                  <p className="text-lg text-gray-700">${product.price.toFixed(2)}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      onClick={() => handleAddShoppingCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
