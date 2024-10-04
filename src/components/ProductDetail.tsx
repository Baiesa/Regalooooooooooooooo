import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/shoppingCartSlice';
import { Item, Product } from '@/interface/types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from URL parameters
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch product details and similar products
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);

        // Fetch similar products based on category
        const similarResponse = await axios.get<Product[]>(
          `https://fakestoreapi.com/products/category/${response.data.category}`
        );
        setSimilarProducts(similarResponse.data.filter(item => item.id !== Number(id)));
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
    const item: Item = { ...product, quantity: 1 };
    dispatch(addToCart(item));
  };

  return (
    <div className="container mx-auto p-6 ">
      {/* Main Product Section */}
      <div className="bg-[#EBEEEA] overflow-hidden flex flex-col md:flex-row mb-10">
        <img
          className="w-full md:w-1/2 h-80 md:h-auto object-cover rounded-sm"
          src={product.image || 'https://via.placeholder.com/500'}
          alt={product.title}
        />
        <div className="p-6 md:w-1/2">
          <h2 className="text-3xl font-semibold mb-4 font-quicksand">{product.title}</h2>
          <h1 className='text-xl'>About This Item</h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-green-600 mb-4">${product.price.toFixed(2)}</p>
          {/* Rating Stars */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`w-5 h-5 fill-current ${
                  index < Math.round(product.rating?.rate || 0)
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
              {product.rating ? product.rating.rate : 'No reviews'}
            </span>
          </div>
          {/* Add to Cart Button */}
          <button
            className="bg-green-500 text-white px-6 py-2 mr-5 rounded hover:bg-green-600"
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

      {/* Similar Items Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Similar Items</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {similarProducts.slice(0, 4).map((similarProduct) => (
            <div key={similarProduct.id} className="bg-[#EBEEEA] p-2 rounded-lg">
              <img
                src={similarProduct.image || 'https://via.placeholder.com/150'}
                alt={similarProduct.title}
                className="w-full h-48 object-cover object-center rounded-t-md cursor-pointer"
                onClick={() => navigate(`/products/${similarProduct.id}`)}
              />
              <div className="text-lg font-semibold mt-4">{similarProduct.title}</div>
              <div className="text-gray-500 mt-2">${similarProduct.price.toFixed(2)}</div>
              <div className="text-yellow-500 mt-2">
                {"★".repeat(Math.round(similarProduct.rating?.rate || 0))}
                {"☆".repeat(5 - Math.round(similarProduct.rating?.rate || 0))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

