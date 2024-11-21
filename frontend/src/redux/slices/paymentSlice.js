import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

// Fetch payments
export const fetchPayments = createAsyncThunk('payment/fetchPayments', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/payment`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch payments');
    }
});

// Add a payment
export const addPayment = createAsyncThunk('payment/addPayment', async (payment, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/payment`, payment);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to add payment');
    }
});

const paymentSlice = createSlice({
    name: 'payment',
    initialState: { payments: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.payments = action.payload;
                state.loading = false;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addPayment.fulfilled, (state, action) => {
                state.payments.push(action.payload);
            });
    },
});

export default paymentSlice.reducer;
