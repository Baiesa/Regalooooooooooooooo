import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; // Import AppDispatch to type the dispatch function
import { login } from '../features/authActions'; // Import the login action
import { FaSpinner } from 'react-icons/fa'; 

interface LoginModalProps {
  closeModal: () => void;
  openSignUpModal: () => void;  // Add openSignUpModal prop
}

const LoginModal: React.FC<LoginModalProps> = ({ closeModal, openSignUpModal }) => {
  const dispatch: AppDispatch = useDispatch(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    setErrorMessage(null); // Clear any existing error messages
    try {
      await dispatch(login(username, password)); // Dispatch the login action
      closeModal(); // Close modal on successful login
    } catch (error) {
      if (error instanceof Error && (error.message.includes('timeout') || error.message.includes('Network Error'))) {
        setErrorMessage('The backend is currently booting up, please wait a moment.');
      } else {
        setErrorMessage('Invalid username or password'); // Set error message if login fails
      }
    } finally {
      setLoading(false); // Stop loading after request completes
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
          Sign In
        </h2>

        <hr className="border-t-[1px] border-[#4A6B3C] mb-6" />

        {/* Show Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {errorMessage}
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center mb-4">
            <FaSpinner className="animate-spin text-4xl text-[#4A6B3C]" />
            <p className="ml-2 text-[#4A6B3C]">The backend is booting up, please wait...</p>
          </div>
        )}

        {/* Login Form */}
        {!loading && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border border-[#4A6B3C] rounded-md text-[#4A6B3C] placeholder-[#4A6B3C] focus:outline-none focus:border-[#4A6B3C] transition duration-150"
              />
            </div>
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-[#4A6B3C] rounded-md text-[#4A6B3C] placeholder-[#4A6B3C] focus:outline-none focus:border-[#4A6B3C] transition duration-150"
              />
            </div>

            {/* Keep Me Signed In */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 h-4 w-4 border-gray-300 text-[#4A6B3C] focus:ring-[#4A6B3C]"
              />
              <label htmlFor="rememberMe" className="text-[#4A6B3C] text-sm">
                Keep Me Signed In
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#4ca330] text-[#f1faeb] p-3 rounded-lg font-semibold mt-4"
            >
              Sign In
            </button>
          </form>
        )}

        {/* Signup Link */}
        <div className="mt-6 text-center">
          <p className="text-[#4A6B3C]">
            Don't have an account?{" "}
            <button
              onClick={() => {
                closeModal(); // Close the login modal
                openSignUpModal(); // Open the sign-up modal
              }}
              className="text-[#4A6B3C] underline focus:outline-none"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;



