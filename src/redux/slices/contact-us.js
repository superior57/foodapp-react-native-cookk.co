// axios
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  loading: false,
  error: null,
};

// ----------------------------------------------------------------------

const slice = createSlice({
  name: 'contactUs',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },

    //
    hasError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {startLoading} = slice.actions;

// Selector
export const CONTACTUS_SELECTOR = state => state.contactUs;
// ----------------------------------------------------------------------

export function contactUs(data) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = axios.post(
        `/api/${process.env.API_VERSION}/ask_question`,
        data,
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
