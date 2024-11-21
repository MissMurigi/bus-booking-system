import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import  API_BASE_URL from '../../config/api';

// Fetch all bookings
export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  const response = await axios.get(`${API_BASE_URL}/booking`);
  return response.data;
});

// Add a new booking
export const addBooking = createAsyncThunk('bookings/addBooking', async (booking) => {
    const response = await axios.post(`${API_BASE_URL}/booking`, booking);
    return response.data;
    
});

// Delete a booking

export const deleteBooking = createAsyncThunk('bookings/deleteBooking', async (bookingId) => {
  await axios.delete(`${API_BASE_URL}/booking/${bookingId}`);
  return bookingId;
});

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(booking => booking.id !== action.payload);
      });
  },
});

export default bookingSlice.reducer;