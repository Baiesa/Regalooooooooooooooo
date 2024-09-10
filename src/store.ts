// store.ts
import { configureStore, Middleware } from '@reduxjs/toolkit';
import shoppingCartReducer, { loadShoppingCartState } from './features/shoppingCartSlice';
import authReducer, { loadAuthState } from './features/authSlice'; 

// Middleware to save the shopping cart state to local storage
const localStorageMiddleware: Middleware<{}> = (store) => (next) => (action) => {
  const result = next(action);

  // Save shopping cart state to localStorage
  localStorage.setItem('shoppingCartState', JSON.stringify(store.getState().shoppingCart));

  // Save auth state (token and user) to localStorage
  const { token, user } = store.getState().auth;
  if (token) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));
  } else {
    // If logged out, remove from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  }

  return result;
};

// Create the store with both reducers
export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    auth: authReducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware), 
  preloadedState: {
    shoppingCart: loadShoppingCartState(), 
    auth: loadAuthState(), 
  },
});

// Export RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // This is the missing type
export default store;

