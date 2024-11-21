import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookingReducer from './slices/bookingSlice';
import scheduleReducer from './slices/scheduleSlice';
import paymentReducer from './slices/paymentSlice';
import busReducer from './slices/busSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        booking: bookingReducer,
        schedule: scheduleReducer,
        payment: paymentReducer,
        buses: busReducer,

    },
});

export default store;



