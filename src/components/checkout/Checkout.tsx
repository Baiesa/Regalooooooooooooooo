import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

import RecipientInformation from "./RecipientInformation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
// import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import PaymentDetails from "./PaymentDetails";
import BillingComponent from "./BillingComponent";
import OrderSummary from "./OrderSummary";
import ConfirmationPage from "./ConfirmationPage";
import { clearCart } from "@/features/shoppingCartSlice";

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
  const dispatch = useDispatch();

  const [recipientInfo, setRecipientInfo] =
    React.useState<RecipientInfo | null>(null);

  // Get the shopping cart from the Redux store
  const { shoppingCart } = useSelector(
    (state: RootState) => state.shoppingCart
  );

  // Navigation hook
  // const navigate = useNavigate();

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
    name: item.title,
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
    } finally {
      dispatch(clearCart());
    }
  };

  return (
    <div className="checkout-container flex justify-between p-8 bg-[#ebeeea] ">
      {/* Left side accordion */}
      <div className="accordion-section flex-2 mr-8 w-full">
        <Accordion type="single" collapsible className="w-full bg-[#F1FAEB] ">
          {/* Billing Address */}
          <AccordionItem value="billing-address " className="">
            <AccordionTrigger className="bg-[#316a21] text-[#f1faeb] rounded-sm text-lg pl-3" >Billing Address</AccordionTrigger>
            <AccordionContent>
              {/* Static BillingComponent - not functional */}
              <BillingComponent />
            </AccordionContent>
          </AccordionItem>

          {/* Payment Details */}
          <AccordionItem value="payment-details">
            <AccordionTrigger className="bg-[#316a21] text-[#f1faeb] rounded-sm text-lg pl-3" >Payment Details</AccordionTrigger>
            <AccordionContent>
              {/* Static PaymentDetails - not functional */}
              <PaymentDetails />
            </AccordionContent>
          </AccordionItem>

          {/* Recipient Information */}
          <AccordionItem value="recipient-info">
            <AccordionTrigger className="bg-[#316a21] text-[#f1faeb] rounded-sm text-lg pl-3" >Recipient Information</AccordionTrigger>
            <AccordionContent>
              {/* Pass setRecipientInfo function to RecipientInformation */}
              <RecipientInformation setRecipientInfo={setRecipientInfo} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Right side order summary */}
      <div className="max-w-3xl mx-auto p-6 bg-[#F1FAEB] rounded-md">
      {/* Order Summary Section */}
      <OrderSummary />

      {/* Button placed below the Order Summary */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleSendGiftApproval}
          className="mt-4 w-full py-2 px-4 rounded bg-[#4ca330] text-white hover:bg-green-900"
        >
          Send Gift Approval
        </button>

      </div>
    </div>
    {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* Modal content */}
          <div className="bg-[#F1FAEB] p-6 rounded-lg shadow-lg ">
            <ConfirmationPage/>

          </div>
        </div>
      )}
  </div>
  );
};

export default CheckoutPage;
