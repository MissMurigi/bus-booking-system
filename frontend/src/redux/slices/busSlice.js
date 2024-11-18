import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all buses
export const fetchBuses = createAsyncThunk('bus/fetchBuses', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://backend-pi-bay-65.vercel.app/buses');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch buses');
    }
});

// Fetch buses assigned to a specific driver
export const fetchDriverBuses = createAsyncThunk(
    'bus/fetchDriverBuses',
    async (driverId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`https://backend-pi-bay-65.vercel.app/buses/driver/${driverId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch driver buses');
        }
    }
);

// Add a new bus
export const addBus = createAsyncThunk('bus/addBus', async (bus, { rejectWithValue }) => {
    try {
        const response = await axios.post('https://backend-pi-bay-65.vercel.app/buses', bus);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to add bus');
    }
});

// Update an existing bus
export const updateBus = createAsyncThunk('bus/updateBus', async (bus, { rejectWithValue }) => {
    try {
        const response = await axios.put(`https://backend-pi-bay-65.vercel.app/buses/${bus.id}`, bus);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to update bus');
    }
});

// Delete a bus
export const deleteBus = createAsyncThunk('bus/deleteBus', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`https://backend-pi-bay-65.vercel.app/buses/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to delete bus');
    }
});

// Bus slice
const busSlice = createSlice({
    name: 'bus',
    initialState: {
        buses: [],
        driverBuses: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all buses
            .addCase(fetchBuses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBuses.fulfilled, (state, action) => {
                state.buses = action.payload;
                state.loading = false;
            })
            .addCase(fetchBuses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch driver buses
            .addCase(fetchDriverBuses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDriverBuses.fulfilled, (state, action) => {
                state.driverBuses = action.payload;
                state.loading = false;
            })
            .addCase(fetchDriverBuses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Add a bus
            .addCase(addBus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addBus.fulfilled, (state, action) => {
                state.buses.push(action.payload);
                state.loading = false;
            })
            .addCase(addBus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update a bus
            .addCase(updateBus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBus.fulfilled, (state, action) => {
                const index = state.buses.findIndex((bus) => bus.id === action.payload.id);
                if (index >= 0) state.buses[index] = action.payload;
                state.loading = false;
            })
            .addCase(updateBus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete a bus
            .addCase(deleteBus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBus.fulfilled, (state, action) => {
                state.buses = state.buses.filter((bus) => bus.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteBus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default busSlice.reducer;
