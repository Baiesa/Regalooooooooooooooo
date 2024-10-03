import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const OrderSummary = () => {
  const { totalPrice, shoppingCart} = useSelector(
    (state: RootState) => state.shoppingCart
  );

  const navigate = useNavigate(); // Define navigate

  return (
    <div className="max-w-lg mx-auto p-6 bg-[#f1faeb] rounded-md ">
      {/* Order Summary Header */}
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>
      </div>

      {/* Subtotal, Shipping, and Tax */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm">Subtotal (Items: {shoppingCart.length})</span>
          <span className="text-sm">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm">*Shipping</span>
          <span className="text-sm">To Be Determined</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-sm">*Estimated Tax</span>
          <span className="text-sm">To Be Determined</span>
        </div>
      </div>

      {/* Estimated Total */}
      <div className="border-t border-b py-4 mb-4">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Estimated Total</span>
          <span className="text-lg font-semibold">${totalPrice.toFixed(2)}</span>
        </div>
        <p className="text-xs mt-2">
          *Shipping costs and taxes will be calculated once the gift recipient confirms their address.
        </p>
      </div>

      {/* Shopping Bag Header */}
      <div className="flex justify-between items-center mb-4 bg-[#F1FAEB]">
        <h3 className="text-lg font-semibold">Shopping Bag</h3>
        <button className="text-sm text-blue-500"
        onClick={() => navigate("/cart")}>edit</button>
      </div>

      {/* Shopping Bag Items */}
      <div className="border-t pt-4">
        {shoppingCart.length > 0 ? (
          <div className="w-full h-auto bg-[#F1FAEB] rounded-lg p-4">
            {shoppingCart.slice(0, 2).map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded mr-4"
                  />
                  <div>
                    <div className="text-black text-sm font-bold">{item.name}</div>
                    <div className="text-black text-sm">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-black text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            {shoppingCart.length > 2 && (
              <div className="text-right text-black text-sm font-semibold mb-2">
                + {shoppingCart.length - 2} more items
              </div>
            )}

          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;

