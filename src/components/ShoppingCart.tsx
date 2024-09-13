import { useCallback} from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, addToCart } from "../features/shoppingCartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { Item } from "../interface/types";

const ShoppingCart = () => {
  // Get the User from the store
  
  const { user } = useSelector((state: RootState) => state.auth);

  // Get the shopping cart from the store
  const { shoppingCart, totalPrice } = useSelector(
    (state: RootState) => state.shoppingCart
  );

  // Set up hooks
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Remove from cart function
  const handleRemoveFromCart = useCallback(
    (item: Item) => {
      try {
        dispatch(removeFromCart(item));
      } catch (error) {
        console.error("Error removing product from cart:", error);
      }
    },
    [dispatch]
  );

  // Increase quantity function
  const handleIncreaseQuantity = (item: Item) => {
    dispatch(addToCart(item)); // Since addToCart will handle quantity, we can reuse this action
  };

  // Get the current date and format it to make the API happy
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split("T")[0];

  // At this time you can only add 1 of each product to the order API will need to be updated to fix this
  const makeOrder = async () => {
    if (shoppingCart.length === 0) {
      alert("Please add items to your cart");
      navigate("/products", { replace: true });
    } else {
      try {
        const productIds = shoppingCart.map((item: Item) => item.product_id);
        const response = await axios.post("https://backendcore-advanced-flask-api-pilm.onrender.com/orders", {
          customer_id: user?.id,
          date: formattedDate,
          product_id: productIds,
        });

        alert("Order placed successfully");
        // Clear the cart
        dispatch(clearCart());
        // Navigate to the orders page
        navigate("/orders", { replace: true });
      } catch (error) {
        console.error("Error making order:", error);
      }
    }
  };

  return (
    <div>
      <div className="shopping-cart-container shadow-lg rounded-lg p-6 mt-10 max-w-3xl mx-auto">
        <h3 className="text-center mb-6 text-xl font-semibold">Shopping Cart</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(shoppingCart) && shoppingCart.length > 0 ? (
              shoppingCart.map((item: Item) => (
                <tr key={item.id} className="border-t">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                        onClick={() => handleIncreaseQuantity(item)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      Remove All
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total Price Section */}
        <div className="flex justify-end items-center mt-6">
          <h4 className="text-lg font-medium">Total: ${totalPrice.toFixed(2)}</h4>
          <button
            className="bg-blue-500 text-white px-6 py-2 ml-4 rounded hover:bg-blue-600"
            onClick={makeOrder}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;

