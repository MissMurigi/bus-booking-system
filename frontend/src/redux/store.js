import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import busReducer from './slices/busSlice';
import bookingReducer from './slices/bookingSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        bus: busReducer,
        booking: bookingReducer,
    },
});

export default store;
