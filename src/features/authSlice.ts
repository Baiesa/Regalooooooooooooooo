import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state for authentication
interface AuthState {
  token: string | null;
  user: { id: string; name: string; acct_id: string } | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string; user: { id: string, name: string,  acct_id: string } }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;

// Optional: function to load auth state from localStorage (persistence)
export const loadAuthState = (): AuthState => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('authUser');
  if (token && user) {
    return { token, user: JSON.parse(user), isAuthenticated: true };
  }
  return initialState;
}