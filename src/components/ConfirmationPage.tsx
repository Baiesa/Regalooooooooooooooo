import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Item } from '../interface/types';
import { useLocation, useNavigate } from 'react-router-dom';


const ConfirmationPage: React.FC = () => {
  
  
  
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve state passed from ShippingInformationPage
  const { shippingInfo, recipientEmail, recipientMessage } = location.state || {};

  // Get shopping cart items from Redux store
  const { shoppingCart, totalPrice } = useSelector(
    (state: RootState) => state.shoppingCart
  );

  // If no shippingInfo or recipientEmail is available, redirect back to shipping page
  if (!shippingInfo && !recipientEmail) {
    navigate('/shipping');
    return null;
  }

  // const handleConfirmOrder = async () => {
  // try {
  //   const response = await axios.post('https://regaloowebsite-1.onrender.com/orders', {
  //     "customeraccnt_id": 1
  // });} catch (error) {
  //   console.error('An error occurred during order confirmation:', error);
  //   // Check if the error contains a response from the server
  //   if ((error as any).response && (error as any).response.data) {
  //     throw new Error((error as any).response.data.message || 'Order failed');
  //   } else {
  //     throw new Error('An error occurred during order confirmation.');
  //   }
  // }
  // }






  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-6">Order Confirmation</h2>

      {/* Shipping Information */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
        {shippingInfo?.address ? (
          <div className="bg-white shadow-md rounded p-4">
            <p><strong>Address:</strong> {shippingInfo.address}</p>
            <p><strong>City/State/Zip:</strong> {shippingInfo.city}, {shippingInfo.state}{' '}
              {shippingInfo.zipCode}</p>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded p-4">
            <p><strong>Recipient's Email:</strong> {recipientEmail}</p>
            {recipientMessage && (
              <div className="mt-2">
                <p><strong>Message to Recipient:</strong></p>
                <p className="p-2">{recipientMessage}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Order Summary</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCart.map((item: Item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                <td className="px-4 py-2">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <p className="text-xl font-semibold">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Confirm Order Button */}
      <div className="flex justify-end">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;

