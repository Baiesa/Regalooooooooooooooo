import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import RecipientInformation from "./RecipientInformation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import PaymentDetails from "./PaymentDetails";
import BillingComponent from "./BillingComponent";

// Define RecipientInfo type
interface RecipientInfo {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  giftMessage: string;
}

const sendOrder = async (orderData: any) => {
  try {
    const response = await axios.post(
      "https://regaloowebsite-1.onrender.com/orders",
      orderData,
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting order:", error);
    throw error;
  }
};

const CheckoutPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth); // Access auth state from Redux

  
  const [recipientInfo, setRecipientInfo] =
    React.useState<RecipientInfo | null>(null);

  // Get the shopping cart from the Redux store
  const { shoppingCart } = useSelector(
    (state: RootState) => state.shoppingCart
  );

  // Navigation hook
  const navigate = useNavigate();

  // Function to handle sending the order
  const handleSendGiftApproval = async () => {
    if (!recipientInfo) {
      alert("Please fill out the recipient information.");
      return;
    }

    try {
      // Package the data for the API call
      const orderData = {
        customeraccnt_id: user?.acct_id,
        recipient_email: recipientInfo.recipientEmail,
        recipient_name: recipientInfo.recipientName,
        sender_name: recipientInfo.senderName,
        gift_message: recipientInfo.giftMessage,
        products: shoppingCart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          stock_qty: item.quantity,
        })),
      };

      // Send the API call via Axios
      const result = await sendOrder(orderData);
      console.log("Order submitted successfully:", result);

      // Navigate to a success page or show a confirmation message
      navigate("/confirmation");
    } catch (error) {
      console.error("Error placing the order:", error);
    }
  };

  return (
    <div className="checkout-container flex justify-between p-8">
      {/* Left side accordion */}
      <div className="accordion-section flex-2 mr-8 w-full">
        <Accordion type="single" collapsible className="w-full bg-gray-100">
          {/* Billing Address */}
          <AccordionItem value="billing-address">
            <AccordionTrigger>Billing Address</AccordionTrigger>
            <AccordionContent>
              {/* Static BillingComponent - not functional */}
              <BillingComponent />
            </AccordionContent>
          </AccordionItem>

          {/* Payment Details */}
          <AccordionItem value="payment-details">
            <AccordionTrigger>Payment Details</AccordionTrigger>
            <AccordionContent>
              {/* Static PaymentDetails - not functional */}
              <PaymentDetails />
            </AccordionContent>
          </AccordionItem>

          {/* Recipient Information */}
          <AccordionItem value="recipient-info">
            <AccordionTrigger>Recipient Information</AccordionTrigger>
            <AccordionContent>
              {/* Pass setRecipientInfo function to RecipientInformation */}
              <RecipientInformation setRecipientInfo={setRecipientInfo} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Right side order summary */}
      <div className="order-summary flex-1 p-6 border border-gray-300 rounded-md">
        <h5 className="text-lg font-bold mb-4">Order Summary</h5>
        {/* Show shopping cart details */}
        {shoppingCart.map((item) => (
          <div key={item.id} className="mb-2">
            <p>
              {item.name} - ${item.price} x {item.quantity}
            </p>
          </div>
        ))}

        <button
          onClick={handleSendGiftApproval}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Send Gift Approval
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
