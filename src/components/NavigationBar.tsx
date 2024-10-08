import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState, AppDispatch } from "../store"; // Import Redux types
import { logout } from "../features/authSlice"; // Import the logout action
import { useNavigate } from "react-router-dom";
import regalooologo from "../assets/images/white-logo.webp";
import { clearCart } from "@/features/shoppingCartSlice";
import lock from "@/assets/images/image 25.png";
import guy from "@/assets/images/image 1.png";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "./ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavigationBarProps {
  openSignUpModal: () => void;
  openLoginModal: () => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ openLoginModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve the authentication state from the store
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  // Get the shopping cart from the store
  const { shoppingCart, totalPrice } = useSelector(
    (state: RootState) => state.shoppingCart
  );

  // Logout function and clear the cart
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Clear any existing timeout when the mouse enters
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    // Set a timeout to delay closing the dropdown
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 300); // 300ms delay
  };

  return (
    <nav className="w-full h-16 bg-[#4ca330] flex items-center justify-between px-8 relative">
      {/* Logo */}
      <img
        src={regalooologo}
        alt="Regalooo Logo"
        className="cursor-pointer h-16 w-auto "
        onClick={() => navigate("/")}
      ></img>

      {/* Main Navigation Links */}
      <div className="hidden lg:flex space-x-10">
        <DropdownMenu>
          <DropdownMenuTrigger className="text-white font-quicksand font-bold">
            Categories
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#F1FAEB] text-black font-quicksand cursor-pointer">
            <DropdownMenuLabel
              onClick={() => navigate("/products")}
              className="cursor-pointer"
            >
              Shop All
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigate("/category/women's%20clothing")}
              className="cursor-pointer"
            >
              Women's Clothing
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/category/men's%20clothing")}
              className="cursor-pointer"
            >
              Men's Clothing
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/category/electronics")}
              className="cursor-pointer"
            >
              Electronics
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate("/category/jewelery")}
              className="cursor-pointer"
            >
              Jewelery
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Sheet>
          <SheetTrigger>
            <div className="text-[#f1faeb] text-base font-bold font-['Quicksand'] cursor-pointer">
              How it Works
            </div>
          </SheetTrigger>
          <SheetContent className="bg-[#ebeeea]">
            <SheetHeader>
              <SheetTitle className="text-2xl ">
                Gifting with Regaloo:{" "}
              </SheetTitle>
              <SheetDescription className="text-2xl pb-10">
                Simplified and Secure
              </SheetDescription>
              <img src={lock} alt="Lock image" className="h-36 w-36 mx-auto " />
            </SheetHeader>
            <SheetTitle className="text-lg mt-10 text-center mb-2 ">
              Private & Secure
            </SheetTitle>
            <SheetDescription className="mb-10 text-center">
              Your gift recipient will receive an email letting them know they
              have a surprise gift waiting, along with a request to approve and
              accept it by securely entering their delivery address – all
              without revealing it to you.
            </SheetDescription>
            <img src={guy} alt="Lock image" className="h-36 w-36 mx-auto " />
            <SheetTitle className="text-lg mt-10 text-center mb-2">
              Easy Confirmation
            </SheetTitle>
            <SheetDescription className="mb-10 text-center">
              Once your gift recipient confirms the gift and enters their
              address, we’ll notify you when it’s ready to be shipped
            </SheetDescription>
            <SheetDescription className="mb-10 text-center font-bold">
              Your recipient’s privacy is our top priority. Their address will
              be used solely for this delivery and will remain completely
              anonymous.
            </SheetDescription>
            <SheetClose asChild>
              <Button className="bg-[#ebeeea] outline-green-600 text-green-600 outline min-w-full hover:bg-green-100">
                Got It
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
        <div
          className="text-[#f1faeb] text-base font-bold font-['Quicksand'] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Help
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-[300px] h-[45px] flex items-center">
        <input
          type="text"
          placeholder="Search Gifts"
          className="w-full h-full pl-4 pr-12 rounded-full bg-white text-base font-bold font-['Quicksand'] text-[#576653] outline-none"
        />
        <button className="absolute right-2 top-1 w-[35px] h-[35px] bg-[#316a21] rounded-full flex items-center justify-center">
          <i className="fas fa-search text-white"></i>
        </button>
      </div>

      {/* User Authentication & Cart Section */}
      <div className="flex items-center space-x-6">
        {isAuthenticated ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white font-quicksand font-bold">
                {" "}
                <span className="text-[#f1faeb] font-['Quicksand']">
                  Welcome, {user?.name}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#F1FAEB] text-black font-quicksand cursor-pointer">
                <DropdownMenuItem
                  onClick={() => navigate("/account")}
                  className="cursor-pointer"
                >
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer"
                >
                  Orders
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Logout
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Button
            onClick={openLoginModal}
            className="text-[#f1faeb] text-sm font-bold font-['Quicksand']"
          >
            Sign In
          </Button>
        )}
      </div>

      {/* Cart Icon */}
      <div
        className="relative cursor-pointer"
        onClick={() => navigate("/cart")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <i className="fas fa-shopping-cart text-[#f1faeb] text-xl"></i>
        {shoppingCart.length > 0 && (
          <span className="absolute top-[-8px] right-[-8px] bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {shoppingCart.length}
          </span>
        )}

        {/* Cart Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-[350px] bg-[#F1FAEB] shadow-lg rounded-lg p-6 z-50 border border-gray-200">
            <h4 className="font-semibold text-lg mb-2">
              Shopping Cart ({shoppingCart.length} item
              {shoppingCart.length > 1 ? "s" : ""})
            </h4>
            <hr className="border-t border-gray-400 mb-4" />

            {shoppingCart.length > 0 ? (
              <div>
                {shoppingCart.slice(0, 2).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between mb-4"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.image || "https://via.placeholder.com/50"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded mr-4"
                      />
                      <div>
                        <div className="text-black text-sm font-bold">
                          {item.name}
                        </div>
                        <div className="text-black text-sm">
                          Qty: {item.quantity}
                        </div>
                        <div className="text-black text-sm font-semibold">
                          Total Price: $
                          {(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="text-black text-sm font-medium">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                ))}
                {shoppingCart.length > 2 && (
                  <div className="text-right text-black text-sm font-semibold mb-2">
                    + {shoppingCart.length - 2} more items
                  </div>
                )}

                <div className="flex justify-between w-full mt-2 border-t border-gray-300 pt-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div
                  className="w-full h-12 bg-green-500 text-white rounded-lg flex items-center justify-center cursor-pointer hover:bg-green-600 mt-4"
                  onClick={() => navigate("/cart")}
                >
                  <div className="text-white text-lg font-bold">Go To Cart</div>
                </div>
              </div>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
