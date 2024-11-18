import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBookings = createAsyncThunk('booking/fetchBookings', async () => {
    const response = await axios.get('https://backend-pi-bay-65.vercel.app/bookings');
    return response.data;
});

export const addBooking = createAsyncThunk('booking/addBooking', async (booking) => {
    const response = await axios.post('https://backend-pi-bay-65.vercel.app/bookings', booking);
    return response.data;
});

export const deleteBooking = createAsyncThunk('booking/deleteBooking', async (id) => {
    await axios.delete(`https://backend-pi-bay-65.vercel.app/bookings/${id}`);
    return id;
});

const bookingSlice = createSlice({
    name: 'booking',
    initialState: { bookings: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.bookings = action.payload;
            })
            .addCase(addBooking.fulfilled, (state, action) => {
                state.bookings.push(action.payload);
            })
            .addCase(deleteBooking.fulfilled, (state, action) => {
                state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
            });
    },
});

export default bookingSlice.reducer;
