import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '../Feature/auth/authSlice'; // Import the modalSlice reducer

export const store = configureStore({
  reducer: {
    modal: modalReducer, // Add modal slice to the store
    // other reducers can go here
  },
});
