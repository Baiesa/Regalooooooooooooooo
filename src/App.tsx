import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './components/Home';

import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import { Provider } from 'react-redux';
import store from './store';

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
    <Router>
      {/* Pass modal handlers to NavigationBar */}
      <NavigationBar openSignUpModal={openSignUpModal} openLoginModal={openLoginModal} />

      {/* Render different pages with React Router */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      {/* Conditionally render modals */}
      {showSignUpModal && <SignUpModal closeModal={closeSignUpModal} />}
      {showLoginModal && <LoginModal closeModal={closeLoginModal} />}
    </Router>
    </Provider>
  );
};

export default App;