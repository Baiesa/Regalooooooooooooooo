import React from "react";
import { useNavigate } from "react-router-dom";
import neiman from "../assets/images/image 13.png"
import sephora from "../assets/images/image 8.png"
import harry from "../assets/images/image 9.png"
import tiffany from "../assets/images/image 10.png"
import moleskine from "../assets/images/image 11.png"
import apple from "../assets/images/image 12.png"
import hero from "../assets/images/pexels-olly-3784379 1.png"
import shopbag from "../assets/images/pexels-karolina-grabowska-5650020 1.png"
import purplecandle from "../assets/images/Purplecandle.jpg"

const Home: React.FC = () => {
  
  const navigate = useNavigate();
  
  const featuredBrands = [
    { name: "Sephora", image: sephora, alt: "Sephora" },
    { name: "Harry & David", image: harry, alt: "Harry & David" },
    { name: "Tiffany & Co.", image: tiffany, alt: "Tiffany & Co." },
    { name: "Neiman Marcus", image: neiman, alt: "Neiman Marcus" },
    { name: "Moleskine", image: moleskine, alt: "Moleskine" },
    { name: "Apple", image: apple, alt: "Apple" },
  ];

  const productCategories = [
    {
      title: "Gifts For Her",
      viewAllLink: "/products",
      products: [
        { name: "Product Name", price: "$60.00", rating: 4, image: purplecandle },
        { name: "Product Name", price: "$60.00", rating: 5, image: "https://s3-alpha-sig.figma.com/img/704f/1f5c/4e0c53622edadca07f0f0a1b91a93df8?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oPtuT9z2k52mo~FnC3OZbBoXBSka0rOm0BU5OUXaEP8uRPoIc5gxyjPyuD8-5AKt~lpDuZcCUsfY0hsToq0SHQQdSOi40LjzTANAA6heIRbRnTEMOtiQZxDyeXOEqxA3W5KUeHI~uJwtExexRFSYTZvcDZoQ8eKVA6oFhITIV~4i-1ZUHXdJk50WqtxU~f2ydMJgFCwB69cWiu3uv8Xc9HCQvAdNeO4gCDJsIBXGgOaxQnkEwIdN5W-YflKOeA1uS8JGU-DLiUBfWeJT3DJG6LjrPZxSNHbAy7E9pHwgOPO25pmaAObBDDa6u8SRtpjI-l2JKU7SQ11hbT5jb7ZbHA__" },
        { name: "Product Name", price: "$60.00", rating: 4, image: "https://s3-alpha-sig.figma.com/img/e818/e45c/26b703962b5df8a9b2dd560d81368224?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Y0bYiFHtBRrW2nrHijeC9zUBmdDfK7aaKJy1ulrgdjXXQtvO4XPIlWDeHwDDXEAR1f9~Fkwx8uggEbmEYKhDNplW7sfsD5ytmQk6eHQSSFMoEc9Nglv1ucy4~DGH3EETAgKxP3Bfhpkm399GQcAi5ctmJR0CC1TGAryGAdSsHsG35lyX1G-7C4EcMZpTccNG2~QwbpCPcEO-p7GO1cIfsEWuMZmPiiaG5PW9wGjBtJiqytxuibmIqW6t55a6NPP3af1w9Sd~BkPnz-G4Dy6-1D1yU9mBCc3phsEZUVQpbRG9sAF296qpFkqpCkCOSpauWzz-L6dNqfrRsrQNfM5fAA__" },
        { name: "Product Name", price: "$60.00", rating: 5, image: "https://s3-alpha-sig.figma.com/img/0735/07cd/c758df441110974b28eed4eb608f68ff?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EHaN~55nrjtvtNj3B9MSStEf6y420NqipD~EXRZcwiNVLU6EPY6lpNjeLGrvqGAUUgfQDnlFUgCjWgtfIbzCUNnohXJD0ZUWs9KJb1bu02S5w~RUCaMkqZJRoWkkRW8gk1TvHDlDAiBJNIxNvVlPc3v4iD3vNxZYDAjG9W3qE777Xyh4MVc60Scw9ha6W4J5T7K9zilhzJv50TMTihXBkDTYa7CShP8QZtNB~~eEnr8mJ6GG~oWQ7X6kIujDIvGngloagKgZWRxdQsJ9X6CwrBps6tfCSdhOPFJDqPHZZ7HmfMq2vmNUtY9YyhqSQizrYaPI8cPZlggVCLgN7oyleg__" },
        { name: "Product Name", price: "$60.00", rating: 4, image: "path_to_image" },
        { name: "Product Name", price: "$60.00", rating: 5, image: "path_to_image" },

      ],
    },
    {
      title: "Gifts For Him",
      viewAllLink: "/products",
      products: [
        { name: "Product Name", price: "$100.00", rating: 3, image: "path_to_image" },
        { name: "Product Name", price: "$90.00", rating: 4, image: "path_to_image" },
        { name: "Product Name", price: "$100.00", rating: 3, image: "path_to_image" },
        { name: "Product Name", price: "$90.00", rating: 4, image: "path_to_image" },
        { name: "Product Name", price: "$100.00", rating: 3, image: "path_to_image" },
        { name: "Product Name", price: "$90.00", rating: 4, image: "path_to_image" },

      ],
    },
    {
      title: "Gifts For Kids",
      viewAllLink: "/products",
      products: [
        { name: "Product Name", price: "$80.00", rating: 4, image: "path_to_image" },
        { name: "Product Name", price: "$60.00", rating: 4, image: "path_to_image" },
        { name: "Product Name", price: "$80.00", rating: 4, image: "path_to_image" },
        { name: "Product Name", price: "$60.00", rating: 4, image: "path_to_image" },
        { name: "Product Name", price: "$80.00", rating: 4, image: "path_to_image" },
        { name: "Product Name", price: "$60.00", rating: 4, image: "path_to_image" },

      ],
    },
  ];
  
  return (
  <>
    <div
      className="relative bg-cover bg-center h-[500px]"
      style={{ backgroundImage: `url(${hero})` }}
    >
      {/* Overlay for Text */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-end h-full px-6 lg:px-20">
        <h1 className="text-white font-bold text-4xl lg:text-4xl max-w-lg ">
          Send the Perfect Gift,  Anonymously and Securely
        </h1>
        <button 
        className="mt-6 bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition" 
        onClick={() => navigate("/products")}>
          Send Your Gift Today
        </button>
      </div>
    </div>

{/* Featured Brands */}
<div className="bg-[#d9d9d9] py-10">
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-2 text-[#2e4823]">Featured Brands</h2>
    <a href="/products" className="text-sm underline text-[#4ca330]">Shop All</a>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
      {featuredBrands.map((brand, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full flex items-center justify-center ">
            <img
              src={brand.image || "https://via.placeholder.com/50"}
              alt={brand.alt}
              className="w-36 h-36 object-contain rounded"
            />
          </div>
      
        </div>
      ))}
    </div>
  </div>
</div>

{/* Free Shipping Add */}
<div className="bg-[#ebecee] text-[#2e4823] shadow-lg">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
    <div className="text-center md:text-left">
      <h2 className="text-5xl font-bold">Free Shipping on <br/> Orders Over $50</h2>
    </div>
    <div className="mt-6 md:mt-0">
      <img src={shopbag} alt="" />
      </div>

  </div>
</div>

{/* Products Section */}
<div className="bg-[#d9d9d9] py-10">
  <div className="container mx-auto">
    {productCategories.map((category, index) => (
      <div key={index} className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{category.title}</h2>
          <a href={category.viewAllLink} className="text-sm underline text-gray-700">View All</a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 ">
          {category.products.map((product, productIndex) => (
            <div key={productIndex} className="bg-[#d9d9d9]  ">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className=" w-full h-48 object-cover object-center"
              />
              <div className="text-lg font-semibold">{product.name}</div>
              <div className="text-gray-500">{product.price}</div>
              <div className="text-yellow-500">
                {"★".repeat(product.rating)}
                {"☆".repeat(5 - product.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

{/* Promotional Area */}
<div className="bg-gray-300 py-10">
  <div className="container mx-auto">
    <div className="flex flex-1 gap-4">
      
      {/* Left Large Promotional Area */}
      <div
        className="col-span-12 lg:col-span-6 bg-cover bg-center p-4 flex flex-col items-center justify-center shadow-lg"
        style={{ backgroundImage: 'url(https://s3-alpha-sig.figma.com/img/6149/7c7c/cba67b3f1d2bae7ba6be52b647909cde?Expires=1728259200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=X6PGbqv~pfTzsCOYEOUnZ3ptmDl3eC3TtiUBp32hiuqm1Mav8uzOFsEcg8h67aO1VrkIlu4ZLKx3jO5m36eebKve-e2sS3SQKRopF0SclOovkbUXH1sBRBHXmbugQcmTZA2kFK4~0UulcTUkeYUafCSUi7y8OiPs6PLb1VZxl9RSttvC5LN2CUrhJ3kJF2f0KZeXVD4w9dn2jqu-6TtjEdJWViKG0qMCOfW6YiWEiWzS87JPd58pgg~jXKwen~qyhDFUvQnhED9P7B4DQkxa-9eqJxCrIi6cpPzBS9t5YL03hby0dnq09gXmKHMgKdWsCtl1ER2Q4v3NmYQWhxlURQ__)' }}
      >
        <p className="font-bold text-white text-2xl">Promotional Area</p>
      </div>

      {/* Right Top Two Smaller Promotional Areas */}
      <div
        className="col-span-6 lg:col-span-3 bg-cover bg-center p-4 flex flex-col items-center justify-center shadow-lg"
        style={{ backgroundImage: 'url(https://via.placeholder.com/400x300)' }}
      >
        <p className="font-bold text-white text-xl">Promotional Area</p>
      </div>

      <div
        className="col-span-6 lg:col-span-3 bg-cover bg-center p-4 flex flex-col items-center justify-center shadow-lg"
        style={{ backgroundImage: 'url(https://via.placeholder.com/400x300)' }}
      >
        <p className="font-bold text-black text-xl">Promotional Area</p>
      </div>

      {/* Bottom Two Small Promotional Areas */}
      <div
        className="col-span-6 lg:col-span-2 bg-cover bg-center p-4 flex flex-col items-center justify-center shadow-lg"
        style={{ backgroundImage: 'url(https://via.placeholder.com/300x200)' }}
      >
        <p className="font-bold text-white text-lg">Promotional Area</p>
      </div>

      <div
        className="col-span-6 lg:col-span-2 bg-cover bg-center p-4 flex flex-col items-center justify-center shadow-lg"
        style={{ backgroundImage: 'url(https://via.placeholder.com/300x200)' }}
      >
        <p className="font-bold text-white text-lg">Promotional Area</p>
      </div>

      {/* Right Large Promotional Area */}
      <div
        className="col-span-12 lg:col-span-4 bg-cover bg-center p-4 flex flex-col items-center justify-center shadow-lg "
        style={{ backgroundImage: 'url(https://via.placeholder.com/600x300)' }}
      >
        <p className="font-bold text-white text-2xl">Promotional Area</p>
      </div>
      
    </div>
  </div>
</div>




</>
  );
};

export default Home;
