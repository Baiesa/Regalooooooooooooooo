import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Home from "./components/Home";
import "@fortawesome/fontawesome-free/css/all.min.css";
import SignUpModal from "./components/SignUpModal";
import LoginModal from "./components/LoginModal";
import { Provider } from "react-redux";
import store from "./store";
import ProductList from "./components/ProductList";
import Orders from "./components/Orders";
import ShoppingCart from "./components/ShoppingCart";
import ProductDetail from "./components/ProductDetail";
import ConfirmationPage from "./components/checkout/ConfirmationPage";
import Footer from "./components/Footer";
import Checkout from "./components/checkout/Checkout";
import ShippingInformationPage from "./components/checkout/ShippingInformationPage";
import CategoryProductList from "./components/CategoryProductList";

const App: React.FC = () => {
  // State management for modals
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  // Handlers for opening and closing modals
  const openSignUpModal = (): void => setShowSignUpModal(true);
  const closeSignUpModal = (): void => setShowSignUpModal(false);

  const openLoginModal = (): void => setShowLoginModal(true);
  const closeLoginModal = (): void => setShowLoginModal(false);

  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen bg-[#EBEEEA]">
        <Router>
          {/* Pass modal handlers to NavigationBar */}
          <NavigationBar openSignUpModal={openSignUpModal} openLoginModal={openLoginModal} />

          {/* Main content area: Takes up available space to push the footer to the bottom */}
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="cart" element={<ShoppingCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/shipping" element={<ShippingInformationPage />} />
              <Route path="/category/:category" element={<CategoryProductList />} />
            </Routes>
          </div>

          {/* Conditionally render modals */}
          {showSignUpModal && (
            <SignUpModal
              closeModal={closeSignUpModal}
              openLoginModal={openLoginModal}
            />
          )}
          {showLoginModal && (
            <LoginModal
              closeModal={closeLoginModal}
              openSignUpModal={openSignUpModal}
            />
          )}

          {/* Footer always at the bottom */}
          <Footer />
        </Router>
      </div>
    </Provider>
  );
};

export default App;


