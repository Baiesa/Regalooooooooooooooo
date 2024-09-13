import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { RootState} from '../store'; 
import { useSelector } from "react-redux";

interface Order {
  order_id: string;
  customer_id: string;
  date: string;
  products: string[]; // Assuming products are stored as an array of product IDs in orders
}

interface Product {
  product_id: string;
  name: string;
}

const Orders = () => {
  // Database User from context
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  // State for orders, filtered orders, and products
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>("API");
      setOrders(response.data);
      console.log("Orders fetched:", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders.");
    }
  };

  // Fetch all products from the API
  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>("API");
      setProductList(response.data);
      console.log("Products fetched:", response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    }
  };

  // Fetch orders and products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchOrders();
      await fetchProducts();
      setLoading(false); // Mark loading as complete after both API calls
    };
    fetchData();
  }, []);

  // Filter the orders based on the customer ID
  useEffect(() => {
    if (orders.length > 0 && user !== null) {
      const filtered = orders.filter(
        (order) => order.customer_id === user.id
      );
      setFilteredOrders(filtered);
    }
  }, [orders, user?.id]);

  // Helper function to find a product by its ID
  const getProductById = (productId: string) => {
    return productList.find((product) => product.product_id === productId);
  };

  return (
    <div className="shadow-lg mt-10 rounded-lg p-6 bg-white">
      <h3 className="text-center text-2xl font-semibold pb-4">Orders</h3>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : filteredOrders.length > 0 ? (
        <div className="flex flex-wrap -mx-4">
          {filteredOrders.map((order, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h4 className="text-xl font-medium">Order ID: {order.order_id}</h4>
                  <p className="text-gray-600 mb-2 truncate">
                    Customer: {user?.name}
                  </p>
                  <p>Order Date: {order.date || "N/A"}</p>

                  <p className="font-semibold mt-3">Products:</p>
                  {order.products.length > 0 ? (
                    order.products.map((productId) => {
                      const product = getProductById(productId);
                      return product ? (
                        <p key={product.product_id} className="text-gray-700">- {product.name}</p>
                      ) : (
                        <p key={productId} className="text-gray-500">Product not found.</p>
                      );
                    })
                  ) : (
                    <p>No products found.</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="w-full text-center">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;


