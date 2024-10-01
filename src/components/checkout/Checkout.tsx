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
import OrderSummary from "./OrderSummary";
import ConfirmationPage from "./ConfirmationPage";

// Define RecipientInfo type
interface RecipientInfo {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  giftMessage: string;
}



const CheckoutPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth); // Access auth state from Redux
  const [isOpen, setIsOpen] = React.useState(false);

  const [recipientInfo, setRecipientInfo] =
    React.useState<RecipientInfo | null>(null);

  // Get the shopping cart from the Redux store
  const { shoppingCart } = useSelector(
    (state: RootState) => state.shoppingCart
  );

  // Navigation hook
  const navigate = useNavigate();

  const sendOrder = async (orderData: any) => {
    try {
      const response = await axios.post(
        "https://regaloo-updated-code.onrender.com/orders/",
        orderData
      );
      return response.data;
    } catch (error) {
      console.error("Error submitting order:", error);
      throw error;
    }
  };
  // Function to handle sending the order
  const handleSendGiftApproval = async () => {
    console.log(recipientInfo)
    if (!recipientInfo) {
      alert("Please fill out the recipient information.");
      return;
    }

    try {
// Package the data for the API call
const orderData = {
  customeraccnt_id: Number(user?.acct_id), 
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

      console.log("Order data:", orderData);
      // Send the API call via Axios
      const result = await sendOrder(orderData);
      console.log("Order submitted successfully:", result);

      // Navigate to a success page or show a confirmation message
      setIsOpen(true);
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
      <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      {/* Order Summary Section */}
      <OrderSummary />

      {/* Button placed below the Order Summary */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSendGiftApproval}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Send Gift Approval
        </button>

      </div>
    </div>
    {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* Modal content */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <ConfirmationPage/>
            <button 
              className="bg-red-500 text-white px-4 py-2 rounded" 
              onClick={() => setIsOpen(false)}
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
  </div>
  );
};

export default CheckoutPage;
