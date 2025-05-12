import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: !!localStorage.getItem("jwt"),
    token: localStorage.getItem("jwt") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      login(state) {
        state.isAuthenticated = true;
        state.token = localStorage.getItem("jwt");
      },
      logout(state) {
        state.isAuthenticated = false;
        state.token = null;
        localStorage.removeItem("jwt");
      },
    },
});

// Export actions for dispatching
export const { login, logout } = authSlice.actions;

// Export reducer for store configuration
export default authSlice.reducer;
  
