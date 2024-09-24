import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

interface RecipientInfo {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  giftMessage: string;
}

interface RecipientProps {
  setRecipientInfo: (info: RecipientInfo) => void;
}

const RecipientInformation: React.FC<RecipientProps> = ({ setRecipientInfo }) => {
  // Use a single state to manage all recipient info
  const [recipientInfo, setLocalRecipientInfo] = useState<RecipientInfo>({
    recipientName: '',
    recipientEmail: '',
    senderName: '',
    giftMessage: '',
  });

  // Pass the info up to the parent component whenever recipientInfo changes
  useEffect(() => {
    setRecipientInfo(recipientInfo);
  }, [recipientInfo, setRecipientInfo]);

  // Handle changes for all input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLocalRecipientInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Handle save button click
  const handleSave = () => {
    // You can add any additional logic here (e.g., calling an API to save the data)
    console.log('Saving recipient info:', recipientInfo);
    // Optionally, notify the parent component that the form is submitted
  };

  return (
    <div className="recipient-info bg-gray-200 p-6 rounded-md w-full max-w-lg mx-auto">
      <h5 className="text-lg font-bold mb-2">Recipient Information</h5>

      {/* Information Section */}
      <p className="text-sm mb-4">
        <strong>Includes tracking information and a gift receipt</strong>
        <br />
        Your recipient will receive an email to enter their address anonymously, along with your gift message. Once they provide their address, you’ll receive a notification to pay for and ship the item.
      </p>

      {/* Recipient Information Fields */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Recipient's Information:</label>
        <input
          type="text"
          name="recipientName"
          placeholder="Name"
          value={recipientInfo.recipientName}
          onChange={handleChange}
          className="border rounded-md w-full p-2 text-sm mb-3"
          required
        />
        <input
          type="email"
          name="recipientEmail"
          placeholder="Email Address"
          value={recipientInfo.recipientEmail}
          onChange={handleChange}
          className="border rounded-md w-full p-2 text-sm"
          required
        />
      </div>

      {/* From Fields */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">From:</label>
        <input
          type="text"
          name="senderName"
          placeholder="Name"
          value={recipientInfo.senderName}
          onChange={handleChange}
          className="border rounded-md w-full p-2 text-sm mb-3"
          required
        />
        <textarea
          name="giftMessage"
          placeholder="Gift Message"
          value={recipientInfo.giftMessage}
          onChange={handleChange}
          className="border rounded-md w-full p-2 text-sm h-24"
          required
        />
      </div>

      {/* Save Button */}
      <Button onClick={handleSave} className="bg-green-500 text-white p-2 rounded-md">
        Save Information
      </Button>
    </div>
  );
};

export default RecipientInformation;


