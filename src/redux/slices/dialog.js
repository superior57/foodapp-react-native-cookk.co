import {createSlice} from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  currentDialog: null,
  initialized: false,
};

const slice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog(state, action) {
      state.currentDialog = action.payload;
    },
    closeDialog(state) {
      state.currentDialog = null;
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
