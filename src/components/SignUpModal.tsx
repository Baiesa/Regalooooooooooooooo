import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store"; // Import your AppDispatch type
import { login } from "../features/authActions"; // Import your login action

interface SignUpModalProps {
  closeModal: () => void;
  openLoginModal: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ closeModal, openLoginModal }) => {
  // Set up the customer to be submitted
  const [inputName, setInputName] = useState<string>("");
  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputPhone, setInputPhone] = useState<string>("");

  // Set up the account to be submitted
  const [inputUsername, setInputUsername] = useState<string>("");
  const [inputPassword, setInputPassword] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Dispatch function from Redux
  const dispatch: AppDispatch = useDispatch();

  // Form submission begins the process of creating a customer and an account separately
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");

    try {
      // Step 1: Create the customer
      const customerResponse = await axios.post(
        "https://regaloo-updated-code.onrender.com/customers",
        {
          name: inputName,
          email: inputEmail,
          phone: inputPhone,
        }
      );
      console.log("Customer created:", customerResponse.data);

      const customerId = customerResponse.data.id; // The API returns customer_id

      if (customerId) {
        // Step 2: Create the account using the stored customer ID
        const accountResponse = await axios.post(
          "https://regaloo-updated-code.onrender.com/customeraccnt",
          {
            username: inputUsername,
            password: inputPassword,
            customer_id: customerId,
            role_id: 1, // Default role_id for customers
          }
        );
        console.log("Account created:", accountResponse.data);

        const accountId = accountResponse.data.customer_id; // The API returns account_id

        if (accountId) {
          // Step 3: Dispatch the login action to auto-login the user
          try {
            await dispatch(login(inputUsername, inputPassword)); // Dispatch the login action
            closeModal(); // Close the modal on successful login
          } catch (error) {
            setErrorMessage("Failed to log in after sign-up.");
            console.error("Login error:", error);
          }
        } else {
          console.error("Failed to retrieve account ID.");
          setErrorMessage("Failed to create account. Please try again.");
        }
      } else {
        console.error("Failed to retrieve customer ID.");
        setErrorMessage("Failed to create customer. Please try again.");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Axios error during customer or account creation:",
          error.response
        );
        setErrorMessage("Error during sign-up. Please try again.");
      } else {
        console.error("Unexpected error during sign-up:", error);
        setErrorMessage("Unexpected error during sign-up.");
      }
    }
  };

  return (
<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
  <div className="bg-[#F5FAF4] w-full max-w-md mx-auto p-8 rounded-lg shadow-xl relative">
    {/* Close Button */}
    <div className="flex justify-end">
      <button
        onClick={closeModal}
        className="text-[#4A6B3C] hover:text-black text-2xl transition duration-150"
      >
        &times;
      </button>
    </div>

    {/* Modal Header */}
    <h2 className="text-xl font-semibold text-[#4A6B3C] mb-4 text-left">
      Sign Up
    </h2>

    <hr className="border-t-[1px] border-[#4A6B3C] mb-6" />

    {/* Show Error Message */}
    {errorMessage && (
      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
        {errorMessage}
      </div>
    )}

    {/* Sign Up Form */}
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Name"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          className="w-full p-3 border border-[#4A6B3C] rounded-md text-[#4A6B3C] placeholder-[#4A6B3C] focus:outline-none focus:border-[#4A6B3C] transition duration-150"
          required
        />
      </div>

      {/* Email Input */}
      <div className="relative">
        <input
          type="email"
          placeholder="Email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          className="w-full p-3 border border-[#4A6B3C] rounded-md text-[#4A6B3C] placeholder-[#4A6B3C] focus:outline-none focus:border-[#4A6B3C] transition duration-150"
          required
        />
      </div>

      {/* Phone Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Phone"
          value={inputPhone}
          onChange={(e) => setInputPhone(e.target.value)}
          className="w-full p-3 border border-[#4A6B3C] rounded-md text-[#4A6B3C] placeholder-[#4A6B3C] focus:outline-none focus:border-[#4A6B3C] transition duration-150"
          required
        />
      </div>

      {/* Username Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          className="w-full p-3 border border-[#4A6B3C] rounded-md text-[#4A6B3C] placeholder-[#4A6B3C] focus:outline-none focus:border-[#4A6B3C] transition duration-150"
          required
        />
      </div>

      {/* Password Input */}
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          className="w-full p-3 border border-[#4A6B3C] rounded-md text-[#4A6B3C] placeholder-[#4A6B3C] focus:outline-none focus:border-[#4A6B3C] transition duration-150"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-[#4ca330] text-[#f1faeb] p-3 rounded-lg font-semibold mt-4"
        
      >
        Sign Up
      </button>
    </form>

    {/* Optional Login Link */}
    <div className="mt-6 text-center">
      <p className="text-[#4A6B3C]">
        Already have an account?{" "}
        <button
          onClick={() => {
            closeModal(); // Close the sign-up modal
            openLoginModal(); // Open the login modal
          }}
          className="text-[#4A6B3C] underline focus:outline-none"
        >
          Sign In
        </button>
      </p>
    </div>
  </div>
</div>


  );
};

export default SignUpModal;
