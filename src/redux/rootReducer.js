import {combineReducers} from 'redux';
// slices
import dialogReducer from './slices/dialog';
import foodReducer from './slices/food';
import cityReducer from './slices/city';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({
  food: foodReducer,
  dialog: dialogReducer,
  cityCuisine: cityReducer,
});

export {rootReducer};
