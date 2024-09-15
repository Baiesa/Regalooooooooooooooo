import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShippingInfo {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const ShippingInformationPage: React.FC = () => {
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState<Partial<ShippingInfo>>({});
  const [isReglooOption, setIsReglooOption] = useState<boolean>(false);
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [recipientEmailError, setRecipientEmailError] = useState<string>('');
  const [recipientMessage, setRecipientMessage] = useState<string>('');
  const [recipientMessageError, setRecipientMessageError] = useState<string>('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (): boolean => {
    let isValid = true;
    const newErrors: Partial<ShippingInfo> = {};
    if (!shippingInfo.fullName) {
      newErrors.fullName = 'Full Name is required';
      isValid = false;
    }
    if (!shippingInfo.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    }
    if (!isReglooOption) {
      if (!shippingInfo.address) {
        newErrors.address = 'Address is required';
        isValid = false;
      }
      if (!shippingInfo.city) {
        newErrors.city = 'City is required';
        isValid = false;
      }
      if (!shippingInfo.state) {
        newErrors.state = 'State is required';
        isValid = false;
      }
      if (!shippingInfo.zipCode) {
        newErrors.zipCode = 'Zip Code is required';
        isValid = false;
      }
    } else {
      if (!recipientEmail) {
        setRecipientEmailError('Recipient Email is required');
        isValid = false;
      } else {
        setRecipientEmailError('');
      }

      // Optional message validation
      if (!recipientMessage) {
        setRecipientMessageError('Message is required');
        isValid = false;
      } else if (recipientMessage.length > 500) {
        setRecipientMessageError('Message cannot exceed 500 characters');
        isValid = false;
      } else {
        setRecipientMessageError('');
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleProceed = () => {
    if (!validate()) {
      return;
    }

    // Proceed to the next step, e.g., confirmation page
    if (isReglooOption) {
      console.log('Proceeding with Regloo Option:', recipientEmail, recipientMessage);
      // Handle logic for Regloo Option
    } else {
      console.log('Proceeding with Shipping Address:', shippingInfo);
      // Handle logic for traditional shipping
    }

    // Navigate to the confirmation page
    navigate('/confirmation', {
      state: { shippingInfo, recipientEmail, recipientMessage },
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>

      {/* Shipping Option Selection */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Select Shipping Option:</label>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            name="shippingOption"
            value="address"
            checked={!isReglooOption}
            onChange={() => setIsReglooOption(false)}
            className="mr-2"
          />
          <label>Ship to Address</label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="radio"
            name="shippingOption"
            value="regloo"
            checked={isReglooOption}
            onChange={() => setIsReglooOption(true)}
            className="mr-2"
          />
          <label>Regloo Option</label>
        </div>
      </div>

      {isReglooOption ? (
        <div>
          {/* Regloo Option - Enter Recipient Email */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Recipient's Email</label>
            <input
              type="email"
              name="recipientEmail"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {recipientEmailError && (
              <p className="text-red-500 text-sm">{recipientEmailError}</p>
            )}
          </div>

          {/* Message Box */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Message to Recipient</label>
            <textarea
              name="recipientMessage"
              value={recipientMessage}
              onChange={(e) => setRecipientMessage(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded"
              rows={4}
              placeholder="Enter your message here"
            ></textarea>
            {recipientMessageError && (
              <p className="text-red-500 text-sm">{recipientMessageError}</p>
            )}
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceed}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Proceed to Confirmation
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleProceed();
          }}
        >
          {/* Personal Information */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={shippingInfo.fullName}
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
              value={shippingInfo.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Address Information */}
          <div className="mb-4">
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={shippingInfo.address}
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
                value={shippingInfo.city}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>
            <div className="mb-4 w-1/2">
              <label className="block mb-1 font-medium">State</label>
              <input
                type="text"
                name="state"
                value={shippingInfo.state}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded"
              />
              {errors.state && (
                <p className="text-red-500 text-sm">{errors.state}</p>
              )}
            </div>
          </div>
          <div className="mb-6">
            <label className="block mb-1 font-medium">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={shippingInfo.zipCode}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm">{errors.zipCode}</p>
            )}
          </div>

          {/* Proceed Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Proceed to Confirmation
          </button>
        </form>
      )}
    </div>
  );
};

export default ShippingInformationPage;
