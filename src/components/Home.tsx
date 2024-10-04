import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import neiman from "../assets/images/image 13.png";
import sephora from "../assets/images/image 8.png";
import harry from "../assets/images/image 9.png";
import tiffany from "../assets/images/image 10.png";
import moleskine from "../assets/images/image 11.png";
import apple from "../assets/images/image 12.png";
import hero from "../assets/images/pexels-olly-3784379 1.png";
import shopbag from "../assets/images/pexels-karolina-grabowska-5650020 1.png";
import { Product } from "@/interface/types";
import axios from "axios";
import { Category } from "../interface/types";

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const featuredBrands = [
    { name: "Sephora", image: sephora, alt: "Sephora" },
    { name: "Harry & David", image: harry, alt: "Harry & David" },
    { name: "Tiffany & Co.", image: tiffany, alt: "Tiffany & Co." },
    { name: "Neiman Marcus", image: neiman, alt: "Neiman Marcus" },
    { name: "Moleskine", image: moleskine, alt: "Moleskine" },
    { name: "Apple", image: apple, alt: "Apple" },
  ];

  // Fetch products and sort by categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>("https://fakestoreapi.com/products");
        const products = response.data;

        // Map categories to an object for easier sorting
        const categoryMap: Record<string, Product[]> = {
          "women's clothing": [],
          "men's clothing": [],
          electronics: [],
          jewelery: [],
          
        };

        // Sort products into categories
        products.forEach((product) => {
          if (categoryMap[product.category]) {
            categoryMap[product.category].push(product);
          }
        });

        // Convert categoryMap object to an array of categories
        const categoriesArray: Category[] = Object.keys(categoryMap).map((category) => ({
          title: category,
          viewAllLink: `/category/${category}`,
          products: categoryMap[category],
        }));

        setCategories(categoriesArray);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: `url(${hero})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex flex-col justify-center items-end h-full px-6 lg:px-20">
          <h1 className="text-white font-quicksand shadow-sm font-bold text-4xl lg:text-4xl max-w-lg">
            Send the Perfect Gift, Privately and Securely
          </h1>
          <button
            className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
            onClick={() => navigate("/products")}
          >
            Send Your Gift Today
          </button>
        </div>
      </div>

      {/* Featured Brands */}
      <div className="bg-[#F5FAF4] py-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-2 text-[#2e4823] font-quicksand">Featured Brands</h2>
          <a href="/products" className="font-quicksand text-sm underline text-[#4ca330]">
            Shop All
          </a>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
            {featuredBrands.map((brand, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full flex items-center justify-center ">
                  <img
                    src={brand.image}
                    alt={brand.alt}
                    className="w-36 h-36 object-contain rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Free Shipping Section */}
      <div className="bg-[#ebecee] text-[#2e4823] shadow-lg ">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-7xl font-bold font-quicksand">Free Shipping <span className="font-normal">On Orders Over $50</span></h2>
          </div>
          <div className="mt-6 md:mt-0 ">
            <img src={shopbag} alt="Shopping Bag" />
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-[#F5FAF4] py-10">
        <div className="container mx-auto">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && categories.map((category, index) => (
            <div key={index} className="mb-10">
              <div className="flex justify-between items-center mb-6 ">
                <h2 className="text-4xl text-[#2e4823] font-bold font-quicksand">{category.title.charAt(0).toUpperCase()+ category.title.slice(1).toLowerCase()}</h2>
                <a href={category.viewAllLink} className="text-sm underline text-gray-700">View All</a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
                {category.products.slice(0, 4).map((product) => (
                  <div
                    key={product.id}
                    className="bg-[#F5FAF4]  p-4 rounded-lg"
                    onClick={() => handleViewDetails(product)}
                  >
                    <img
                      src={product.image || "https://via.placeholder.com/150"}
                      alt={product.title}
                      className="w-full h-48 object-cover object-center rounded-t-md"
                    />
                    <div className="text-lg font-semibold mt-4">{product.title}</div>
                    <div className="text-gray-500 mt-2">${product.price.toFixed(2)}</div>
                    <div className="text-yellow-500 mt-2">
                      {"★".repeat(Math.round(product.rating.rate))}
                      {"☆".repeat(5 - Math.round(product.rating.rate))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Section */}
      <div className="bg-[#F5FAF4] py-10">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            className="bg-cover bg-center p-4 flex flex-col items-center justify-center shadow-lg"
            style={{ backgroundImage: 'url(https://via.placeholder.com/600x300)' }}
          >
            <p className="font-bold text-white text-2xl">Promotional Area</p>
          </div>

          <div
            className="bg-cover bg-center p-4 flex flex-col items-center justify-center shadow-lg"
            style={{ backgroundImage: 'url(https://via.placeholder.com/600x300)' }}
          >
            <p className="font-bold text-black text-2xl">Promotional Area</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

