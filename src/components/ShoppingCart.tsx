import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, addToCart } from "../features/shoppingCartSlice";

import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { Item } from "../interface/types";

const ShoppingCart = () => {
  // Get the shopping cart from the store
  const { shoppingCart  } = useSelector(
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

  // Remove item entirely from cart
  const handleRemoveItem = (item: Item) => {
    dispatch(removeFromCart(item));
  };

  // Calculate subtotal
  const subtotal = shoppingCart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax;

  return (
    <div className="container mx-auto p-6">
      <div className="shopping-cart-container shadow-lg rounded-lg p-6 mt-10">
        <h3 className="text-center mb-6 text-2xl font-semibold">Shopping Cart</h3>
        {shoppingCart.length > 0 ? (
          <>
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left">Product</th>
                  <th className="border-b px-4 py-2 text-left">Price</th>
                  <th className="border-b px-4 py-2 text-left">Quantity</th>
                  <th className="border-b px-4 py-2 text-left">Total</th>
                  <th className="border-b px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {shoppingCart.map((item: Item) => (
                  <tr key={item.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2 flex items-center space-x-4">
                      <img
                        src={item.image || "https://via.placeholder.com/50"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <button
                          className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                          onClick={() => handleRemoveFromCart(item)}
                        >
                          &minus;
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
                          onClick={() => handleIncreaseQuantity(item)}
                        >
                          &#43;
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                        onClick={() => handleRemoveItem(item)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Cart Summary */}
            <div className="mt-6 flex flex-col items-end space-y-2">
              <div className="flex justify-between w-full md:w-1/2">
                <span className="font-medium">Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-full md:w-1/2">
                <span className="font-medium">Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between w-full md:w-1/2 text-xl font-semibold">
                <span>Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
              <button
                className="bg-blue-500 text-white px-6 py-2 mt-4 rounded hover:bg-blue-600"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <p className="text-lg">Your cart is empty.</p>
            <button
              className="mt-6 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCart;

