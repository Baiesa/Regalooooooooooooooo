import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { RootState, AppDispatch } from '../store'; // Import Redux types
import { logout } from '../features/authSlice'; // Import the logout action
import { useNavigate } from 'react-router-dom';

interface NavigationBarProps {
  openSignUpModal: () => void;
  openLoginModal: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ openSignUpModal, openLoginModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth); // Access auth state from Redux
  // Get the shopping cart from the store
  const { shoppingCart, totalPrice  } = useSelector(
    (state: RootState) => state.shoppingCart
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
<nav className="bg-green-600 p-4">
  <div className="container mx-auto flex justify-between items-center">
    
<div className="text-white text-xl" onClick={() => navigate("/")}>LOGO</div>
<div className="text-white text-xl" onClick={() => navigate("/")}>Categories</div>
<div className="text-white text-xl" onClick={() => navigate("/")}>What is Regalooo</div>
<div className="text-white text-xl" onClick={() => navigate("/")}>Help</div>
<input type="text" className="giftsearch" />
<Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate("/cart")}>Search</Button>



    <Button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => navigate("/orders")}>Orders</Button>

    <div className="space-x-4 flex items-center">
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
        </>
      )}
    </div>

    {/* Cart icon with badge */}
    <div className="relative group">
      <button className="relative" onClick={() => navigate("/cart")}>
        {/* Font Awesome Cart Icon */}
        <i className="fas fa-shopping-cart text-white text-2xl"></i>

        {/* Badge for number of items in the cart */}
        {shoppingCart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {shoppingCart.length}
          </span>
        )}
      </button>

      {/* Cart dropdown */}
      <div className="absolute right-0 mt-2 w-[350px] bg-white shadow-lg rounded-lg p-4 hidden group-hover:block z-10">
        <h4 className="font-bold text-lg mb-4">Your Cart</h4>
        {shoppingCart.length > 0 ? (
          <div className="w-full h-auto relative bg-[#f0f0f0] shadow-lg rounded-lg p-4">
            {shoppingCart.slice(0, 2).map((item) => (
              <div key={item.id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img
                    src={item.image || "https://via.placeholder.com/50"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded mr-4"
                  />
                  <div>
                    <div className="text-black text-sm font-bold">{item.name}</div>
                    <div className="text-black text-sm">Qty: {item.quantity}</div>
                  </div>
                </div>
                <div className="text-black text-sm font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}

            <div className="text-right text-black text-sm font-semibold mb-2">
              {shoppingCart.length > 2 ? `+ ${shoppingCart.length - 2} more items` : ""}
            </div>

            <div className="flex justify-between w-full mt-2">
              <span className="font-medium">Subtotal:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <div className="w-full h-12 bg-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-300 mt-4" onClick={() => navigate("/cart")}>
              <div className="text-black text-xl font-bold">View Cart</div>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  </div>
</nav>



  );
};

export default NavigationBar;
