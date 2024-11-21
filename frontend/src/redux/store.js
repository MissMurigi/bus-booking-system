// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/userSlice';  // Update the import to use userSlice

const store = configureStore({
  reducer: {
    user: userReducer,  // Assuming you're using 'user' as the key here
  },
});

export default store;
