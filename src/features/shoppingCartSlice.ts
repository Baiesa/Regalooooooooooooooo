// shoppingCartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../interface/types";

interface ShoppingCartState {
  shoppingCart: Item[];
  totalItems: number;
  totalPrice: number;
}

// Initial state
const initialState: ShoppingCartState = {
  shoppingCart: [],
  totalItems: 0,
  totalPrice: 0,
};

// Load shopping cart state from localStorage
export const loadShoppingCartState = (): ShoppingCartState => {
  const shoppingCartState = localStorage.getItem("shoppingCartState");
  if (shoppingCartState) {
    return JSON.parse(shoppingCartState);
  } else {
    return initialState;
  }
};

// Utility function to save the state to localStorage
const saveShoppingCartState = (state: ShoppingCartState) => {
  localStorage.setItem("shoppingCartState", JSON.stringify(state));
};

// Shopping cart slice
export const shoppingCartSlice = createSlice({
  name: "shopping cart",
  initialState: loadShoppingCartState(),
  reducers: {
    // Add an item to the cart
    addToCart: (state, action: PayloadAction<Item>) => {
      const { id, price } = action.payload;
      const existingItem = state.shoppingCart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        state.totalItems += 1;
      } else {
        state.shoppingCart.push({ ...action.payload });
      }

      state.totalItems += 1;
      state.totalPrice += price;
      saveShoppingCartState(state); // Persist state to localStorage
    },
    // Remove an item from the cart
    removeFromCart: (state, action: PayloadAction<Item>) => {
      const { id, price } = action.payload;
      const existingItem = state.shoppingCart.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          state.totalItems -= 1;
        } else {
          state.shoppingCart = state.shoppingCart.filter((item) => item.id !== id);
        }

        state.totalItems = Math.max(0, state.totalItems - 1);
        state.totalPrice = Math.max(0, state.totalPrice - price);
        saveShoppingCartState(state); // Persist state to localStorage
      }
    },
    // Clear the entire cart
    clearCart: (state) => {
      state.shoppingCart = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem("shoppingCartState"); // Remove from localStorage
    },
  },
});

// Export actions
export const { addToCart, removeFromCart, clearCart } = shoppingCartSlice.actions;

// Export reducer
export default shoppingCartSlice.reducer;

