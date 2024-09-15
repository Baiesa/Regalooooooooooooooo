// ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { addToCart } from '@/features/shoppingCartSlice';
import { Item } from '@/interface/types';
import { Product } from '@/interface/types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from URL parameters
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `https://regaloowebsite-1.onrender.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product details.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Product not found.</p>;
  }

  const handleAddToCart = (product: Product) => {
    console.log('Adding product to cart:', product);
    const item: Item = { ...product, quantity: 1 };
    dispatch(addToCart(item));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <img
          className="w-full md:w-1/2 h-64 md:h-auto object-cover"
          src={product.image || 'https://via.placeholder.com/500'}
          alt={product.name}
        />
        <div className="p-6 md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-bold text-green-600 mb-4">
            ${product.price.toFixed(2)}
          </p>
          {/* Rating Stars */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 fill-current ${
                  index < (product.rating || 0)
                    ? 'text-yellow-500'
                    : 'text-gray-300'
                }`}
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M10 15l-5.878 3.09L5.956 11 1 7.09l6.122-.94L10 1l2.878 5.15L19 7.09 14.044 11l1.834 7.09z" />
              </svg>
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.rating ? product.rating.toFixed(1) : 'No reviews'}
            </span>
          </div>
          {/* Add to Cart Button */}
          <button
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </button>
          {/* Back to Products Button */}
          <button
            className="mt-4 bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            onClick={() => navigate('/products')}
          >
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
