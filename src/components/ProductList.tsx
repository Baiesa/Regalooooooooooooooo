import { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { RootState} from '../store';
import { useDispatch } from "react-redux";
import { addToCart } from "../features/shoppingCartSlice"; // Assuming you're using Redux to manage the cart
import { useNavigate } from 'react-router-dom';
import { Item } from "../interface/types";
import { Product } from "../interface/types";



const ProductList = () => {

  const rating = 4; // Hardcoded rating for now
  
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
      const response = await axios.get(
        "https://regaloowebsite-1.onrender.com/products/"
      );
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
    console.log('Adding product to cart:', product);
    const item: Item = { ...product, quantity: 1 };
    dispatch(addToCart(item));
  };

  const handleViewDetails = (product: Product) => {
    navigate(`/products/${product.id}`);
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
        <div
          key={product.id}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-6"
        >
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              className="w-full h-48 object-cover"
              src={product.image || 'https://via.placeholder.com/300'}
              alt={product.name}
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold mb-2">{product.name}</h4>
              <p className="text-gray-600 text-sm mb-2">
                {product.description}
              </p>

              {/* Rating Stars */}
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-4 h-4 fill-current ${
                      index < rating                            // product.rating || 1
                        ? 'text-yellow-500'
                        : 'text-gray-300'
                    }`}
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M10 15l-5.878 3.09L5.956 11 1 7.09l6.122-.94L10 1l2.878 5.15L19 7.09 14.044 11l1.834 7.09z" />
                  </svg>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </p>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleAddShoppingCart(product)}
                >
                  Add to Cart
                </button>
              </div>

              {/* View Details Button */}
              <button
                className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleViewDetails(product)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
  </div>
</div>

  );
};

export default ProductList;
