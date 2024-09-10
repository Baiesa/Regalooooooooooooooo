import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { RootState, AppDispatch } from '../store'; // Import Redux types
import { logout } from '../features/authSlice'; // Import the logout action

interface NavigationBarProps {
  openSignUpModal: () => void;
  openLoginModal: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ openSignUpModal, openLoginModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth); // Access auth state from Redux

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-green-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">regaloooooooooooooooooooooooo</div>

        <div className="space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-white">Welcome, {user?.name}</span>
              <Button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={openSignUpModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Sign Up
              </Button>
              <Button
                onClick={openLoginModal}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Login
              </Button>
              <button>New button</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
