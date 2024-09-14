import { useEffect, useState } from "react";
import axios from "axios";
import { RootState } from '../store'; 
import { useSelector } from "react-redux";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_qty: number;
}

interface Order {
  customeraccnt_id: number;
  date: string;
  delivery_address?: string | null;
  id: number;
  products: Product[]; // Updated to reflect product objects
  status: string;
}

const Orders = () => {
  // Database User from context
  const { user } = useSelector((state: RootState) => state.auth);

  // State for orders, filtered orders, and products
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>("https://regaloowebsite-1.onrender.com/orders");
      setOrders(response.data);
      console.log("Orders fetched:", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders.");
    }
  };

  // Fetch orders and products when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      await fetchOrders();
      setLoading(false); // Mark loading as complete after API call
    };
    fetchData();
  }, []);


  return (
    <div className="shadow-lg mt-10 rounded-lg p-6 bg-white">
      <h3 className="text-center text-2xl font-semibold pb-4">Orders</h3>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <div className="flex flex-wrap -mx-4">
          {orders.map((order, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-6">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-4">
                  <h4 className="text-xl font-medium">Order ID: {order.id}</h4>
                  <p className="text-gray-600 mb-2 truncate">
                    Customer: {user?.name}
                  </p>
                  <p>Order Date: {order.date || "N/A"}</p>
                  <p>Delivery Address: {order.delivery_address || "N/A"}</p>
                  <p>Status: {order.status}</p>

                  <p className="font-semibold mt-3">Products:</p>
                  {order.products.length > 0 ? (
                    order.products.map((product) => (
                      <div key={product.id}>
                        <p className="text-gray-700">- {product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.description}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ${product.price}
                        </p>
                        <p className="text-sm text-gray-500">
                          Stock Qty: {product.stock_qty}
                        </p>
                      </div>
                    ))
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



