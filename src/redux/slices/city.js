// axios
import axios from '../../utils/axios';
// import {API_VERSION} from '@env';

// ----------------------------------------------------------------------

const API_VERSION = 'v1';

const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  loading: false,
  error: null,
  city: null,
  cities: [],
  cuisine: null,
  cuisines: [],
  chef: null,
  chefs: [],
  food: null,
  foods: [],
  faqs: [],
};

// ----------------------------------------------------------------------

const slice = createSlice({
  name: 'cityCuisine',
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

    //
    getCitiesSuccess(state, action) {
      state.loading = false;
      state.cities = action.payload;
    },

    //
    getCitySuccess(state, action) {
      state.loading = false;
      state.city = action.payload;
    },

    //
    getCuisinesSuccess(state, action) {
      state.loading = false;
      state.cuisines = action.payload;
    },

    //
    getChefsSuccess(state, action) {
      state.loading = false;
      state.chefs = action.payload.data;
    },

    //
    getCuisine(state, action) {
      state.loading = false;
      state.cuisine = state.cuisines.find(({id}) => id === action.payload);
    },

    //
    getChef(state, action) {
      state.loading = false;
      state.chef = state.chefs.find(item => item.chef.id === action.payload);
    },

    //
    setFaqs(state, action) {
      state.loading = false;
      state.faqs = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {startLoading} = slice.actions;

// Selector
export const CITYCUISINE_SELECTOR = state => state.cityCuisine;

// API Hander

// ----------------------------------------------------------------------

export function getCities() {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`/api/${API_VERSION}/cities`);
      dispatch(slice.actions.getCitiesSuccess(response.data.cities));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCuisines() {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`/api/${API_VERSION}/find_local_chefs`);
      dispatch(slice.actions.getCuisinesSuccess(response.data.cuisines));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getChefs(cityId = null, cuisineId = null, chefId = null) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(
        `/api/${API_VERSION}/cities/${cityId}/cuisines/${cuisineId}`,
      );
      dispatch(slice.actions.getChefsSuccess(response.data));
      if (cuisineId) dispatch(slice.actions.getCuisine(cuisineId));
      if (chefId) dispatch(slice.actions.getChef(chefId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
//
// ----------------------------------------------------------------------
export function getCity(cityId) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`/api/${API_VERSION}/cities`);
      const city = response.data.cities.find(({id}) => id == cityId);
      dispatch(slice.actions.getCitySuccess(city));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function getFaqs() {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`/api/${API_VERSION}/faqs`);
      response.data.faqs.sort((a, b) => (a.created_at > b.created_at ? 1 : -1));
      dispatch(slice.actions.setFaqs(response.data.faqs));
      return response.data;
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}
