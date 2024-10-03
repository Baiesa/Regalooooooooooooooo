// import { useEffect, useState } from "react";
// import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
<div className="confirmation-page text-center p-8 bg-[#F1FAEB]">
  <h1 className="text-[#316a21] text-[40px] font-bold font-['Quicksand']">
    Your Gift is Almost Ready!
  </h1>
  <p className="text-[#2e4823] text-lg font-normal font-['Quicksand']">
    We’ve sent an email to your recipient, letting them know about their special gift. They’ll be prompted to securely provide their delivery address.
  </p>
  <p className="text-[#2e4823] text-xl font-normal font-['Quicksand']">
    Once they’ve confirmed their details, we’ll notify you and guide you through the final steps to ship the gift.
  </p>
  <p className="text-[#2e4823] text-xl font-normal font-['Quicksand']">
    Keep an eye on your inbox for updates – we’ll let you know as soon as the recipient has approved and provided their address!
  </p>

  {/* First Button */}
  <Button
    className="mt-4 w-1/2 md:w-1/3 py-2 px-4 rounded bg-[#4ca330] text-white hover:bg-green-900"
    onClick={() => navigate("/orders")}
  >
    To Orders
  </Button>

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

export default ConfirmationPage;
