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
  const rating = 3; // Hardcoded rating for now

  // State for list of products
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Static product list
  const staticProducts: Product[] = [
    {
      id: 100,
      name: "Static Product 1",
      description: "This is a static product",
      price: 25.99,
      image: "",
    },
    {
      id: 101,
      name: "Static Product 2",
      description: "This is another static product",
      price: 35.99,
      image: "",
    },
    {
      id: 102,
      name: "Static Product 3",
      description: "This is yet another static product",
      price: 45.99,
      image: "",
    },
    {
      id: 103,
      name: "Static Product 4",
      description: "This is a static product",
      price: 25.99,
      image: "",
    },
    {
      id: 104,
      name: "Static Product 5",
      description: "This is another static product",
      price: 35.99,
      image: "",
    },
    {
      id: 105,
      name: "Static Product 6",
      description: "This is a static product",
      price: 25.99,
      image: "",
    },
    {
      id: 106,
      name: "Static Product 7",
      description: "This is another static product",
      price: 35.99,
      image: "",
    },
    {
      id: 107,
      name: "Static Product 8",
      description: "This is yet another static product",
      price: 45.99,
      image: "",
    },
    {
      id: 108,
      name: "Static Product 9",
      description: "This is yet another static product",
      price: 45.99,
      image: "",
    },
    {
      id: 108,
      name: "Static Product 10",
      description: "This is yet another static product",
      price: 45.99,
      image: "",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://regaloo-updated-code.onrender.com/products/"
      );
      setProductList([...response.data, ...staticProducts]); // Combine fetched products with static ones
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products");
      setProductList(staticProducts); // Fallback to just static products if fetch fails
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
    <div className="container mx-auto py-5">
      <h2 className="text-3xl font-bold mb-4 text-center">Gifts For Her</h2>

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
                        index < rating ? "text-yellow-500" : "text-gray-300"
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
