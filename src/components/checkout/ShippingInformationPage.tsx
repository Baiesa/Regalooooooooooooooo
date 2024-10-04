import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RecipientConfirmationPage from "./RecipientConfirmationPage";

interface FormData {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  email: string;
  phone: string;
}

const ShippingInformationPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const location = useLocation();

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Extract token from URL query parameters
    const params = new URLSearchParams(location.search);
    const tokenFromUrl = params.get('token');
    setToken(tokenFromUrl);
  }, [location]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!token) {
      alert('Invalid or missing token.');
      return;
    }

    try {
      const response = await axios.post(
        `https://regaloo-updated-code.onrender.com/orders/address_update/${token}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        setIsOpen(true);
      } else {
        alert(`Error: ${response.data.Message || 'Unexpected response from server.'}`);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // Server responded with a status code outside 2xx
          console.error('Server Error:', error.response.data);
          alert(`Error: ${error.response.data.Message || 'Server error occurred.'}`);
        } else if (error.request) {
          // Request was made but no response received
          console.error('Network Error:', error.request);
          alert('Network error. Please try again later.');
        } else {
          // Something happened in setting up the request
          console.error('Error:', error.message);
          alert('An unexpected error occurred.');
        }
      } else {
        console.error('Unexpected Error:', error);
        alert('An unexpected error occurred.');
      }
    }
  };

  return (
    <>
      <div className="text-center text-4xl mt-10">
        You have accepted the gift! Now let's get it delivered!
      </div>

      <h2 className="text-center text-3xl mt-10">Enter your address via Regaloo</h2>
      <div className="container p-6 max-w-lg rounded-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          {/* Address Line 1, Address Line 2, City, State */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Address Line 1</label>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Address Line 2</label>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-1 font-medium">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
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
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full py-2 px-4 rounded bg-[#4ca330] text-white hover:bg-green-900"
          >
            Submit and Confirm
          </button>
        </form>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* Modal content */}
          <div className="bg-[#F1FAEB] p-6 rounded-lg shadow-lg">
            <RecipientConfirmationPage />
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingInformationPage;





