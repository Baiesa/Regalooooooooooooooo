import React from 'react';

const BillingComponent: React.FC = () => {
  
  
  
  
  
  return (
    <div className="container p-6 max-w-lg rounded-md  mx-auto">
      <form>
        {/* First and Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              value="John"
              className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              value="Doe"
              className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {/* Address Line 1, City, State */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Address Line 1</label>
          <input
            type="text"
            name="address1"
            value="123 Main St"
            className="w-full border border-gray-300 p-2 rounded bg-gray-100"
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">City</label>
          <input
            type="text"
            name="city"
            value="Los Angeles"
            className="w-full border border-gray-300 p-2 rounded bg-gray-100"
            readOnly
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">State</label>
            <input
              type="text"
              name="state"
              value="CA"
              className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value="90001"
              className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              readOnly
            />
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value="john.doe@example.com"
              className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              readOnly
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value="(123) 456-7890"
              className="w-full border border-gray-300 p-2 rounded bg-gray-100"
              readOnly
            />
          </div>
        </div>
      </form>
            {/* Continue Button */}
            <button
        className="mt-4 w-full py-2 px-4 rounded bg-[#4ca330] text-white hover:bg-green-900"
      >
        Continue to Payment Details
      </button>
    </div>
  );
};

export default BillingComponent;


