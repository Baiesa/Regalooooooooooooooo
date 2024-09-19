import React from 'react';

const PaymentDetails: React.FC = () => {
  return (
    <div className="payment-details bg-gray-200 p-6 rounded-md w-full max-w-md mx-auto">
      <h5 className="text-lg font-bold mb-4">Payment Details</h5>

      {/* Static Payment Method Options */}
      <div className="mb-4">
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

        {/* Static Card Details Form */}
        <div className="card-details space-y-3">
          <input
            type="text"
            id="card-number"
            name="card-number"
            className="border rounded-md w-full p-2 text-sm bg-gray-100"
            placeholder="Card Number"
            value="1234 5678 9012 3456"
            readOnly
          />
          <input
            type="text"
            id="card-name"
            name="card-name"
            className="border rounded-md w-full p-2 text-sm bg-gray-100"
            placeholder="Name On Card"
            value="John Doe"
            readOnly
          />
          <div className="flex space-x-4">
            <input
              type="text"
              id="card-expiry"
              name="card-expiry"
              className="border rounded-md w-full p-2 text-sm bg-gray-100"
              placeholder="Expiration Date MM/YY"
              value="12/24"
              readOnly
            />
            <input
              type="text"
              id="card-cvc"
              name="card-cvc"
              className="border rounded-md w-full p-2 text-sm bg-gray-100"
              placeholder="Security Code"
              value="123"
              readOnly
            />
          </div>
        </div>

        <label className="flex items-center space-x-2 mt-4">
          <input
            type="radio"
            name="payment-method"
            value="paypal"
            className="form-radio"
            disabled // Disabled for static display
          />
          <span className="text-sm font-medium text-gray-400">PayPal</span>
        </label>
      </div>

      {/* Continue Button */}
      <button
        className="mt-4 w-full py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        Continue to Recipient Information
      </button>
    </div>
  );
};

export default PaymentDetails;

