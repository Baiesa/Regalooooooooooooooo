import { useEffect, useState } from "react";
import axios from "axios";

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
  products: Product[];
  status: string;
}

const Orders = () => {
  // State for orders, filtered orders, and products
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all orders from the API
  const fetchOrders = async () => {
    try {
      const response = await axios.get<Order[]>(
        "https://regaloo-updated-code.onrender.com/orders"
      );
      setOrders(response.data);
      console.log("Orders fetched:", response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders and products when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-center text-3xl font-semibold pb-6">My Orders</h3>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">
                  Order #{order.id}
                </h4>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Order Date:</span>{" "}
                  {order.date || "N/A"}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Status:</span> {order.status}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Delivery Address:</span>{" "}
                  {order.delivery_address || "N/A"}
                </p>

                <p className="font-semibold mb-2">Products:</p>
                {order.products.length > 0 ? (
                  <ul className="space-y-2">
                    {order.products.map((product) => (
                      <li
                        key={product.id}
                        className="flex items-center space-x-4"
                      >
                        {/* Product Image Placeholder */}
                        <img
                          src="https://via.placeholder.com/50"
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div>
                          <p className="text-gray-700 font-medium">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {product.description}
                          </p>
                          <p className="text-sm text-gray-500">
                            Price: ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No products found.</p>
                )}
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




