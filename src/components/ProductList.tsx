import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/shoppingCartSlice";
import { useNavigate } from "react-router-dom";
import { Item } from "../interface/types";
import { Product } from "../interface/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ProductList = () => {
  const rating = Math.floor(Math.random() * 5) + 1;

  // State for list of products
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProductList([...response.data]); // Combine fetched products with static ones if any
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products");
 // Fallback to static products if the fetch fails
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);
  
  const handleAddShoppingCart = (product: Product) => {
    const item: Item = { ...product, quantity: 1 };
    dispatch(addToCart(item));
  };
  
  const handleViewDetails = (product: Product) => {
    navigate(`/products/${product.id}`);
  };
  
  return (
    <div>
    <div className="container mx-auto py-5">
      <h2 className="text-3xl font-bold mb-4 text-center">Shop all</h2>
  
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2">
          <button className="bg-gray-200 px-4 py-2 rounded">Filter</button>
          <button className="bg-gray-200 px-4 py-2 rounded">Sort</button>
        </div>
        <p className="text-lg">{productList.length} Results</p>
      </div>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading &&
          !error &&
          productList.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-48 object-cover"
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.title}
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold mb-2">{product.title}</h4>

  
                {/* Rating Stars */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 fill-current ${
                        index < Math.round(rating)
                          ? "text-yellow-500"
                          : "text-gray-300"
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
  
                <button
                  className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleViewDetails(product)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>

      {/* Pagination */}
      <Pagination className="pt-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ProductList;
