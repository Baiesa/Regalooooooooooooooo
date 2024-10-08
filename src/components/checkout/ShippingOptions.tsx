import React from "react";

interface ShippingOptionsProps {
  shippingOption: string;
  setShippingOption: (option: string) => void;
}

const ShippingOptions: React.FC<ShippingOptionsProps> = ({
  shippingOption,
  setShippingOption,
}) => {
  const handleShippingOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShippingOption(event.target.value);
  };

  return (
<div className="shipping-options">
  <form>
    {/* Standard Shipping Option */}
    <div className="rounded-lg p-4 mb-4">
      <label className="flex items-center justify-between">
        <div>
          <input
            type="radio"
            name="shippingOption"
            value="Standard Shipping"
            checked={shippingOption === "Standard Shipping"}
            onChange={handleShippingOptionChange}
            className="mr-2 form-radio h-5 w-5 text-green-600"
          />
          <span className="font-semibold text-lg">Standard Shipping</span>
        </div>
        <span className="font-semibold text-gray-700">$5.97</span>
      </label>
      <p className="pl-7 text-sm text-gray-500 mt-1">Est/ Delivery</p>
      <p className="pl-7 text-sm font-medium text-gray-600 mt-1">10/19/24 - 10/31/24</p>
      <p className="pl-7 text-sm text-gray-500 mt-1">
        (Arrives 3-8 business days after processing, Monday-Friday Delivery)
      </p>
    </div>

    {/* Overnight Shipping Option */}
    <div className="rounded-lg p-4 mb-4">
      <label className="flex items-center justify-between">
        <div>
          <input
            type="radio"
            name="shippingOption"
            value="Overnight Shipping"
            checked={shippingOption === "Overnight Shipping"}
            onChange={handleShippingOptionChange}
            className="mr-2 form-radio h-5 w-5 text-green-600"
          />
          <span className="font-semibold text-lg">Overnight Shipping</span>
        </div>
        <span className="font-semibold text-gray-700">$26.99</span>
      </label>
      <p className="pl-7 text-sm text-gray-500 mt-1">Est/ Delivery</p>
      <p className="pl-7 text-sm font-medium text-gray-600 mt-1">10/17/24 - 10/18/24</p>
      <p className="pl-7 text-sm text-gray-500 mt-1">
        (Allow 24 hours for processing. Weekend orders will be picked up by carriers on Monday.)
      </p>
    </div>

    {/* 2-3 Days Shipping Option */}
    <div className="rounded-lg p-4 mb-4">
      <label className="flex items-center justify-between">
        <div>
          <input
            type="radio"
            name="shippingOption"
            value="2-3 Days Shipping"
            checked={shippingOption === "2-3 Days Shipping"}
            onChange={handleShippingOptionChange}
            className="mr-2 form-radio h-5 w-5 text-green-600"
          />
          <span className="font-semibold text-lg">2-3 Days Shipping</span>
        </div>
        <span className="font-semibold text-gray-700">$19.99</span>
      </label>
      <p className="pl-7 text-sm text-gray-500 mt-1">Est/ Delivery</p>
      <p className="pl-7 text-sm font-medium text-gray-600 mt-1">10/18/24 - 10/19/24</p>
      <p className="pl-7 text-sm text-gray-500 mt-1">
        (Allow 24 hours for processing. Weekend orders will be picked up by carriers on Monday.)
      </p>
    </div>
  </form>
  
</div>

  );
};

export default ShippingOptions;
