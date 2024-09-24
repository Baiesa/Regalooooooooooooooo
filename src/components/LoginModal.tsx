import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store'; // Import AppDispatch to type the dispatch function
import { login } from '../features/authActions'; // Import the login action

interface LoginModalProps {
  closeModal: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ closeModal }) => {
  const dispatch: AppDispatch = useDispatch(); 

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(username, password)); // Dispatch the login action
      closeModal(); // Close modal on successful login
    } catch (error) {
      setErrorMessage('Invalid username or password'); // Set error message if login fails
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
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        {/* Show error message */}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

