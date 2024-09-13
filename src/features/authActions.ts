import axios from 'axios';
import { AppDispatch } from '../store';
import { loginSuccess } from './authSlice';

export const login = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post('https://regaloowebsite-1.onrender.com/login', {
      username,
      password,
    });

    const { token, user } = response.data; // Destructure token and user from the response

    // Assuming the response is successful and contains the token and user data
    dispatch(loginSuccess({ token, user }));

    // Save the token and user data in localStorage for persistence
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(user));

  } catch (error: any) {
    console.error('An error occurred during login:', error);
    // Check if the error contains a response from the server
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('An error occurred during login.');
    }
  }
};

