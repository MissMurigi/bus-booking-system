import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import  API_BASE_URL from '../../config/api';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/login`, credentials);
        const { access_token, role } = response.data;

        localStorage.setItem('token', access_token);
        localStorage.setItem('role', role);

        return { token: access_token, role };
    } catch (error) {
        const errorMessage = axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : 'Login failed';
        return rejectWithValue(errorMessage);
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, role: null, error: null },
    reducers: {
        logout(state) {
            state.token = null;
            state.role = null;
            state.error = null;
            localStorage.removeItem('token');
            localStorage.removeItem('role');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.role = action.payload.role;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;