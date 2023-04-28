import {createSlice} from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  current: null,
  initialized: false,
};

const slice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog(state, action) {
      state.current = action.payload;
    },
    closeDialog(state) {
      state.current = null;
    },
    setInitialized(state, action) {
      state.initialized = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {openDialog, closeDialog, setInitialized} = slice.actions;

// Selector
export const DIALOG_SELECTOR = state => state.dialog;
