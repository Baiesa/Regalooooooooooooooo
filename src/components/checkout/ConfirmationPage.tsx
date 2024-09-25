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

const ConfirmationPage = () => {
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

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="confirmation-page text-center p-8">
      <h1 className="text-3xl font-bold mb-6">Your Gift is Almost Ready!</h1>
      <p className="mb-4">
        We’ve sent an email to your recipient, letting them know about their
        special gift. They’ll be prompted to securely provide their delivery
        address.
      </p>
      <p className="mb-4">
        Once they’ve confirmed their details, we’ll notify you and guide you
        through the final steps to ship the gift.
      </p>
      <p className="mb-6">
        Keep an eye on your inbox for updates – we’ll let you know as soon as
        the recipient has approved and provided their address!
      </p>

      {/* Display order information */}
      <h2 className="text-2xl font-semibold mb-4">Order Information</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-info p-4 mb-4 border rounded-lg">
          <p className="font-bold">Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Delivery Address: {order.delivery_address || "Pending"}</p>
          <p>Order Date: {new Date(order.date).toLocaleDateString()}</p>
          <div className="products mt-4">
            <h3 className="text-xl mb-2">Products:</h3>
            <ul>
              {order.products.map((product) => (
                <li key={product.id} className="mb-2">
                  {product.name} - ${product.price} (Qty: {product.stock_qty})
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfirmationPage;
