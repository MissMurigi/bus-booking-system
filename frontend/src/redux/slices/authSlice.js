import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post('https://backend-pi-bay-65.vercel.app/users/login', credentials);
    const { token, role } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    return { token, role };
});

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, role: null, error: null },
    reducers: {
        logout(state) {
            state.token = null;
            state.role = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
