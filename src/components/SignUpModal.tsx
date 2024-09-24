import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store"; // Import your AppDispatch type
import { login } from "../features/authActions"; // Import your login action

interface SignUpModalProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ closeModal }) => {
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

      const customerId = customerResponse.data.customer_id; // The API returns customer_id

      if (customerId) {
        // Step 2: Create the account using the stored customer ID
        const accountResponse = await axios.post(
          "https://regaloo-updated-code.onrender.com/customeraccnt",
          {
            username: inputUsername,
            password: inputPassword,
            customer_id: customerId,
          }
        );
        console.log("Account created:", accountResponse.data);

        const accountId = accountResponse.data.account_id; // The API returns account_id

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
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded-lg shadow-lg">
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Sign Up</h2>

        {/* Show error message */}
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={inputName}
            onChange={(e) => setInputName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={inputPhone}
            onChange={(e) => setInputPhone(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;
