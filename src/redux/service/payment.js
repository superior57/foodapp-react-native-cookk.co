//
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'src/utils/axios';

// ----------------------------------------------------------------------
export const createCardIntent = createAsyncThunk(
  'payment/createCardIntent',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/${process.env.API_VERSION}/payments/create_card_intent`,
      );
      return await Promise.resolve(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

//
// ----------------------------------------------------------------------
export const placeOrder = createAsyncThunk(
  'payment/placeOrder',
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/${process.env.API_VERSION}/orders/${orderId}/place_order`,
      );
      return await Promise.resolve(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
