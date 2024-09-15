import React, { useState } from 'react';
import {  useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';

interface BillingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const BillingComponent: React.FC = () => {
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors] = useState<Partial<BillingInfo>>({});

  const navigate = useNavigate();

  const { totalPrice } = useSelector(
    (state: RootState) => state.shoppingCart
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value,
    });
  };

//   const validate = (): boolean => {
//     const newErrors: Partial<BillingInfo> = {};
//     if (!billingInfo.fullName) newErrors.fullName = 'Full Name is required';
//     if (!billingInfo.email) newErrors.email = 'Email is required';
//     if (!billingInfo.address) newErrors.address = 'Address is required';
//     if (!billingInfo.city) newErrors.city = 'City is required';
//     if (!billingInfo.state) newErrors.state = 'State is required';
//     if (!billingInfo.zipCode) newErrors.zipCode = 'Zip Code is required';
//     if (!billingInfo.cardNumber) newErrors.cardNumber = 'Card Number is required';
//     if (!billingInfo.expiryDate) newErrors.expiryDate = 'Expiry Date is required';
//     if (!billingInfo.cvv) newErrors.cvv = 'CVV is required';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };



  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-semibold mb-6">Billing Information</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* Personal Information */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={billingInfo.fullName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={billingInfo.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Address Information */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={billingInfo.address}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address}</p>
          )}
        </div>
        <div className="flex space-x-4">
          <div className="mb-4 w-1/2">
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={billingInfo.city}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div className="mb-4 w-1/2">
            <label className="block mb-1 font-medium">State</label>
            <input
              type="text"
              name="state"
              value={billingInfo.state}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Zip Code</label>
          <input
            type="text"
            name="zipCode"
            value={billingInfo.zipCode}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm">{errors.zipCode}</p>
          )}
        </div>

        {/* Payment Information */}
        <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={billingInfo.cardNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">{errors.cardNumber}</p>
          )}
        </div>
        <div className="flex space-x-4">
          <div className="mb-4 w-1/2">
            <label className="block mb-1 font-medium">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={billingInfo.expiryDate}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm">{errors.expiryDate}</p>
            )}
          </div>
          <div className="mb-4 w-1/2">
            <label className="block mb-1 font-medium">CVV</label>
            <input
              type="text"
              name="cvv"
              value={billingInfo.cvv}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Pay ${totalPrice.toFixed(2)}
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-3"
          onClick={() => navigate('/shipping')}
        >
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default BillingComponent;
