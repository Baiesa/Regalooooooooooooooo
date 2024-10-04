import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams to capture the category
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

const CategoryProductList = () => {
  const { category } = useParams(); // Get the category from the URL

  // State for list of products
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();


  // Function to fetch products filtered by category
  const fetchProductsByCategory = async (category: string) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/category/${category}`
      );
      setProductList(response.data);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category); // Fetch products based on the category from the URL
    }
  }, [category]);



  const handleViewDetails = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div>
      <div className="container mx-auto py-5">
        <h2 className="text-4xl text-[#2e4823] font-bold font-quicksand text-center my-10">
          {category &&
            category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
        </h2>

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
                className="  overflow-hidden"
              >
                <img
                  className="w-full h-48 object-cover cursor-pointer"
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.title}
                  onClick={() => handleViewDetails(product)}
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold mb-2">
                    {product.title}
                  </h4>
                  <div className="flex items-center justify-between mt-4">
                    <p className="text-lg font-bold">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  {/* Rating Stars */}
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 fill-current ${
                          index < Math.round(product.rating?.rate || 0)
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

export default CategoryProductList;
