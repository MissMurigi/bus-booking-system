import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

// Fetch schedules
export const fetchSchedules = createAsyncThunk('schedule/fetchSchedules', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/schedule`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to fetch schedules');
    }
});

// Add a schedule
export const addSchedule = createAsyncThunk('schedule/addSchedule', async (schedule, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/schedule`, schedule);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || 'Failed to add schedule');
    }
});

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState: { schedules: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedules.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSchedules.fulfilled, (state, action) => {
                state.schedules = action.payload;
                state.loading = false;
            })
            .addCase(fetchSchedules.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addSchedule.fulfilled, (state, action) => {
                state.schedules.push(action.payload);
            });
    },
});

export default scheduleSlice.reducer;
