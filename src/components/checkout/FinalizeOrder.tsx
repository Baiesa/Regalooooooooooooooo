import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import axios from "axios";

import ShippingOptions from "./ShippingOptions";
import { useLocation } from "react-router-dom"; // Import useLocation
import ShippingConfirmationPage from "./ShippingConfirmationPage";

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

const FinalizeOrderPage: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const [shippingOption, setShippingOption] = React.useState<string>("");

  const location = useLocation();
  const { order } = location.state as { order: Order };

  const totalPrice = order.products.reduce(
    (total, product) => total + product.price * product.stock_qty,
    0
  );

  const openItems = [
    "billing-address",
    "payment-details",
    "recipient-info",
    "shipping-options",
  ];

  const handleFinalizeOrder = async (orderId: number) => {
    try {
      const response = await axios.post(`https://regaloo-updated-code.onrender.com/orders/shipping`,{
        order_id: orderId,
        
      });
      console.log(response);
      setIsOpen(true);
    } catch (error) {
      console.error("Error finalizing order:", error);
    } 
  }

  return (
    <div className="checkout-container flex justify-between p-8 bg-[#ebeeea] ">
      {/* Left side accordion */}
      <div className="accordion-section flex-2 mr-8 w-full">
        <Accordion
          type="multiple"
          defaultValue={openItems}
          className="w-full bg-[#F1FAEB] "
        >
          {/* Billing Address */}
          <AccordionItem value="billing-address" className="">
            <AccordionTrigger className="bg-[#316a21] text-[#f1faeb] rounded-sm text-lg pl-3">
              Billing Address
            </AccordionTrigger>
            <AccordionContent className="block mt-4 ml-3">
              <p>Chris Mund</p>
              <p>555 Elm Street Unit 1234</p>
              <p>Las Vegas, NV 12345</p>
            </AccordionContent>
          </AccordionItem>

          {/* Payment Details */}
          <AccordionItem value="payment-details">
            <AccordionTrigger className="bg-[#316a21] text-[#f1faeb] rounded-sm text-lg pl-3">
              Payment Details
            </AccordionTrigger>
            <AccordionContent className="block mt-4 ml-3">
              {/* Static Payment Method Options */}
              <div className="mt-4 text-lg">
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="radio"
                    name="payment-method"
                    value="card"
                    className="form-radio"
                    checked={true}
                    readOnly
                  />
                  <span className="text-sm font-medium">Credit Card</span>
                </label>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Recipient Information */}
          <AccordionItem value="recipient-info">
            <AccordionTrigger className="bg-[#316a21] text-[#f1faeb] rounded-sm text-lg pl-3">
              Recipient Information
            </AccordionTrigger>
            <AccordionContent className="block mt-4 ml-3">
              <h1 className="text-lg">{order.recipient_name}</h1>
              <div className="flex items-center space-x-2">
                <label className="text-base font-medium text-black">
                  Address Confirmed
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded-md appearance-none border border-gray-300 checked:bg-green-600 checked:border-transparent focus:outline-none"
                  checked={!!order.delivery_address}
                  
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Shipping Options */}
          <AccordionItem value="shipping-options">
            <AccordionTrigger className="bg-[#316a21] text-[#f1faeb] rounded-sm text-lg pl-3">
              Shipping Options
            </AccordionTrigger>
            <AccordionContent>
              <ShippingOptions
                shippingOption={shippingOption}
                setShippingOption={setShippingOption}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="max-w-lg mx-auto p-6 bg-[#f1faeb] rounded-md ">
        {/* Order Summary Header */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
        </div>

        {/* Subtotal, Shipping, and Tax */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm">
              Subtotal (Items: {order.products.length})
            </span>
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
            <span className="text-lg font-semibold">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
          <p className="text-xs mt-2">
            *Shipping costs and taxes will be calculated once the gift recipient
            confirms their address.
          </p>
        </div>


        {/* Button placed below the Order Summary */}
        <div className="mt-6 flex justify-center">
          <button
            className="mt-4 w-full py-2 px-4 rounded bg-[#4ca330] text-white hover:bg-green-900"
            onClick={() => handleFinalizeOrder(order.id)}
          >
            Finalize Order
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* Modal content */}
          <div className="bg-[#F1FAEB] p-6 rounded-lg shadow-lg ">
            <ShippingConfirmationPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalizeOrderPage;
