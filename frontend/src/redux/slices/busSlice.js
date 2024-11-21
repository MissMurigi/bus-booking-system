import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import  API_BASE_URL from '../../config/api';

// Async thunks
export const fetchBuses = createAsyncThunk('buses/fetchBuses', async () => {
  const response = await axios.get(`${API_BASE_URL}/buses`);
  return response.data;
});

export const fetchDriverBuses = createAsyncThunk('buses/fetchDriverBuses', async (driverId) => {
  const response = await axios.get(`${API_BASE_URL}/buses/driver/${driverId}`);
  return response.data;
});

export const addBus = createAsyncThunk('buses/addBus', async (busData) => {
  const response = await axios.post(`${API_BASE_URL}/buses`, busData);
  return response.data;
});

export const updateBus = createAsyncThunk('buses/updateBus', async (busData) => {
  const response = await axios.put(`${API_BASE_URL}/buses/${busData.bus_id}`, busData);
  return response.data;
});

export const deleteBus = createAsyncThunk('buses/deleteBus', async (busId) => {
  await axios.delete(`${API_BASE_URL}/buses/${busId}`);
  return busId;
});

const busSlice = createSlice({
  name: 'buses',
  initialState: {
    buses: [],
    driverBuses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBuses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBuses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.buses = action.payload;
      })
      .addCase(fetchBuses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchDriverBuses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDriverBuses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.driverBuses = action.payload;
      })
      .addCase(fetchDriverBuses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBus.fulfilled, (state, action) => {
        state.buses.push(action.payload);
      })
      .addCase(updateBus.fulfilled, (state, action) => {
        const index = state.buses.findIndex(bus => bus.bus_id === action.payload.bus_id);
        if (index !== -1) {
          state.buses[index] = action.payload;
        }
      })
      .addCase(deleteBus.fulfilled, (state, action) => {
        state.buses = state.buses.filter(bus => bus.bus_id !== action.payload);
      });
  },
});

export default busSlice.reducer;