import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";


const ConfirmationPage = () => {

  return (
    <div className="confirmation-page text-center p-8">
      <h1 className="text-3xl font-bold mb-6">Your Gift is Almost Ready!</h1>
      <p className="mb-4">
        We’ve sent an email to your recipient, letting them know about their
        special gift. They’ll be prompted to securely provide their delivery
        address.
      </p>
      <p className="mb-4">
        Once they’ve confirmed their details, we’ll notify you and guide you
        through the final steps to ship the gift.
      </p>
      <p className="mb-6">
        Keep an eye on your inbox for updates – we’ll let you know as soon as
        the recipient has approved and provided their address!
      </p>
    <Button className="mr-5">Orders</Button>
    <Button className="ml-5">Home</Button>
    </div>
  );
};

export default ConfirmationPage;
