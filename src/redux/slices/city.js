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
      state.chefs = action.payload;
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
// Actions
export const {startLoading, getCuisine, getChef, getCitySuccess} =
  slice.actions;

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

export function getCuisines(cityId) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(
        `/api/${API_VERSION}/cities/${cityId}/cuisines`,
      );
      dispatch(slice.actions.getCuisinesSuccess(response.data.cuisines));
      dispatch(slice.actions.getCuisine(response.data.cuisines[0].id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getChefs(cityId = null, cuisineId = null) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(
        `/api/${API_VERSION}/cities/${cityId}/cuisines/${cuisineId}`,
      );
      let data = response.data.data;
      data.sort((a, b) => b.chef.total_orders - a.chef.total_orders);
      data.sort((a, b) =>
        a.chef.can_sell === b.chef.can_sell ? 0 : a.chef.can_sell ? -1 : 1,
      );
      dispatch(slice.actions.getChefsSuccess(data));
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
      const city = response.data.cities[0];
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
