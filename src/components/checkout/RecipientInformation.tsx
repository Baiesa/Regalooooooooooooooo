import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
    <div className="recipient-info p-6 rounded-md w-full max-w-lg mx-auto relative">
  <h5 className="text-lg font-bold mb-2">Recipient Information</h5>
  
  {/* Information Icon (Sheet Trigger) */}
  <Sheet>
    <SheetTrigger>
      <i className="fas fa-info-circle text-gray-500 cursor-pointer absolute top-2 right-2 text-xl"></i>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Gifting with Regaloo: </SheetTitle>
        <SheetDescription className='text-lg'>
        Simplified and Secure
        </SheetDescription>
      </SheetHeader>
      <SheetTitle className='text-sm mt-10'>Private & Secure</SheetTitle>
      <SheetDescription>
      Your gift recipient will receive an email letting them know they have a surprise gift waiting, along with a request to approve and accept it by securely entering their delivery address – all without revealing it to you.
        </SheetDescription>
        <SheetTitle className='text-sm mt-4'>Easy Confirmation</SheetTitle>
      <SheetDescription>
      Once your gift recipient confirms the gift and enters their address, we’ll notify you when it’s ready to be shipped
        </SheetDescription>
    </SheetContent>
  </Sheet>



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
      <Button onClick={handleSave}  className="mt-4 w-full py-2 px-4 rounded bg-[#4ca330] text-white hover:bg-green-900">
        Save Information
      </Button>
    </div>
  );
};

export default RecipientInformation;