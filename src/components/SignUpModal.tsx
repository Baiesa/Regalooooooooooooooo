import React from "react";

interface SignUpModalProps {
  closeModal: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ closeModal }) => {
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
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
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
