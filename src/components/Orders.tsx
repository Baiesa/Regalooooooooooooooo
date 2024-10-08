import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useNavigate } from "react-router-dom";

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
  recipient_name: string;
}

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    if (!user) {
      setError("User not found.");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get<Order[]>(
        `https://regaloo-updated-code.onrender.com/orders`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await axios.delete(
        `https://regaloo-updated-code.onrender.com/orders/${orderId}`
      );
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error deleting order:", error);
      setError("Failed to delete order.");
    }
  };

  // Updated handleShipping function to pass order data
  const handleShipping = (order: Order) => {
    // Pass the order data via the state parameter
    navigate(`/orders/${order.id}/finalize`, { state: { order } });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-6 ">
      <h3 className="text-center text-3xl font-semibold pb-6">My Orders</h3>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full  rounded-lg bg-[#F1FAEB]">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left font-semibold">Order #</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Order Date
                </th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">
                  Delivery Address
                </th>
                <th className="px-4 py-2 text-left font-semibold">
                  Recipient Name
                </th>
                <th className="px-4 py-2 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.date || "N/A"}</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2">
                    {order.delivery_address ? (
                      <div className="flex items-center space-x-2">
                        <div className="bg-green-100 p-2 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6 text-green-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <span className="text-green-600">
                          Delivery Confirmed
                        </span>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-2">{order.recipient_name}</td>
                  <td className="px-4 py-2 text-right space-x-4">
                    <button
                      className={`bg-green-500 text-white px-4 py-2 rounded ${
                        !order.delivery_address
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-green-600"
                      }`}
                      disabled={!order.delivery_address}
                      onClick={() => handleShipping(order)} // Pass order object
                    >
                      Ship
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="w-full text-center">No orders found.</p>
      )}
    </div>
  );
};

export default Orders;
