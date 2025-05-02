import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  isInitialized: false // Tracks if auth state has been checked
};

// Auth slice reducer
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = 'loading';
      state.error = null; // Clear previous errors on new attempt
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.status = 'succeeded';
      state.isInitialized = true;
    },
    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
      state.isInitialized = true;
    },
    logout: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
    initializeAuth: (state) => {
      state.isInitialized = true;
    }
  }
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout, 
  initializeAuth 
} = authSlice.actions;

export default authSlice.reducer;