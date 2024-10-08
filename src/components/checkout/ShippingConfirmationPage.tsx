import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const ShippingConfirmationPage = () => {
    const navigate = useNavigate();
  return (
    <div className="confirmation-page text-center p-8 bg-[#F1FAEB]">
      <h1 className="text-[#316a21] text-[40px] font-bold font-['Quicksand']">
        Your Gift is on its Way!
      </h1>
      <p className="text-[#2e4823] text-lg font-normal font-['Quicksand']">
        `Your recipient will receive an email with tracking information so they
        can follow the progress of their gift. You'll also receive an update
        once the package has been delivered.{" "}
      </p>
      <p className="text-[#2e4823] text-xl font-normal font-['Quicksand']">
        Estimated Delivery: October 25, 2024{" "}
      </p>
      <p className="text-[#2e4823] text-xl font-normal font-['Quicksand']">
        Thank you for choosing Regalooo to send your special gift!{" "}
      </p>

      {/* Add margin for spacing between buttons */}
      <Button
        className="mt-4 w-1/2 md:w-1/3 py-2 px-4 rounded bg-[#4ca330] text-white hover:bg-green-900 ml-4"
        onClick={() => navigate("/")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default ShippingConfirmationPage;
