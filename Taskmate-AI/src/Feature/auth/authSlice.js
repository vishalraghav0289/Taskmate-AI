// src/modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: null, // 'about', 'signup', 'login', etc.
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // openModal mean isactive
    openModal: (state, action) => {
      state.activeModal = action.payload; // payload should be 'about', 'signup', 'login', etc.
    },
    // closed for isNotActive 
    closeModal: (state) => {
      state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
