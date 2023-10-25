import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addItem: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter((item, index) => index !== action.payload);
    },
    toggleItem: (state, action) => {
      state[action.payload].checked = !state[action.payload].checked;
    },
    resetItems: () => [],
  },
});

export const {
  addItem,
  removeItem,
  toggleItem,
  resetItems,
} = itemsSlice.actions;

export default itemsSlice.reducer;
