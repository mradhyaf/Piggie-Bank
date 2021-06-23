import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null
}

export const userSlice = createSlice({
  name: user,
  initialState,
  reducers: {
    signIn: (state, action) => state.currentUser = action.payload,
    signOut: state => state.currentUser = null,
  },
})