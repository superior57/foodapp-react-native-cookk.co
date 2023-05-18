import {createSlice} from '@reduxjs/toolkit';
import {parse, format} from 'date-fns';
// axios
import axios from '../../utils/axios';

const API_VERSION = 'v1';

// ----------------------------------------------------------------------

const initialState = {
  loading: false,
  error: null,
  foods: [],
  popularFoods: [],
  food: null,
  sortBy: null,
  filters: {
    category: 'All',
    priceRange: '',
    rating: '',
  },
  orders: [],
  savedCards: [],
  checkout: {
    orderId: null,
    orderDetail: null,
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    delivering: 0,
    billing: null,
    scheduleDate: null,
    scheduleTime: null,
  },
  orderConfirmInfo: null,
};

const slice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },

    setScheduleDate(state, action) {
      state.loading = false;
      state.checkout.scheduleDate = action.payload;
    },

    updateFoodCart(state, action) {
      switch (action.payload.actionType) {
        case 'clear':
          state.checkout.cart = [];
          break;

        case 'add': {
          const alreadyFood = state?.checkout?.cart?.find(
            item => item.id === action.payload.data.id,
          );
          if (alreadyFood) {
            alreadyFood.count += action.payload.data.count;
            alreadyFood.notes = action.payload.data.notes ?? alreadyFood.notes;
          } else {
            const temp = {...action.payload.data};
            temp.selected_day = state.checkout.scheduleDate;
            state.checkout.cart = [...state.checkout.cart, temp];
          }
          break;
        }

        case 'remove': {
          const alreadyFood = state?.checkout?.cart?.find(
            item => item.id === action.payload.data.id,
          );
          if (alreadyFood.count > alreadyFood.min_order) {
            alreadyFood.count -= 1;
            alreadyFood.notes = action.payload.data.notes ?? alreadyFood.notes;
          } else {
            state.checkout.cart = state.checkout.cart.filter(
              item => item?.id !== action.payload.data.id,
            );
          }
          break;
        }

        case 'delete':
          state.checkout.cart = state.checkout.cart.filter(
            item => item.id !== action.payload.data.id,
          );
          break;

        default:
          console.log('Unknown action type:', action.payload.actionType);
      }
    },

    setError(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    getFoodsSuccess(state, action) {
      state.loading = false;
      state.foods = action.payload;
    },

    getPopularFoodsSuccess(state, action) {
      state.loading = false;
      state.popularFoods = action.payload;
    },

    setOrderId(state, action) {
      state.loading = false;
      state.checkout.orderId = action.payload;
    },

    setOrderDetail(state, action) {
      state.loading = false;
      state.checkout.orderDetail = action.payload;
    },

    setOrders(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },

    setScheduleTime(state, action) {
      state.loading = false;
      state.checkout.scheduleTime = action.payload;
    },

    setDeliveryInstructions(state, action) {
      state.loading = false;
      state.checkout.orderDetail = {
        ...state.checkout.orderDetail,
        delivery_instructions: action.payload,
      };
    },

    setDeliveryAddress(state, action) {
      state.loading = false;
      state.checkout.orderDetail.address = {
        ...state.checkout.orderDetail.address,
        line1: action.payload.address,
        apartment: action.payload.apartment,
        state: action.payload.state,
        city: action.payload.city,
        zip: action.payload.zip,
      };
    },

    setSavedCards(state, action) {
      state.loading = false;
      state.savedCards = action.payload;
    },

    setOrderConfirmInfo(state, action) {
      state.loading = false;
      state.orderConfirmInfo = action.payload;
    },

    setIsPickup(state, action) {
      state.loading = false;
      state.checkout.orderDetail.is_pickup = action.payload;
    },

    clearOrderDetail(state) {
      state.loading = false;
      state.checkout.orderDetail = null;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  startLoading,
  updateFoodCart,
  setError,
  setOrderId,
  setOrderDetail,
  setDeliveryInstructions,
  setDeliveryAddress,
  setScheduleTime,
  setIsPickup,
  clearOrderDetail,
  setScheduleDate,
} = slice.actions;

// Selector
export const FOOD_SELECTOR = state => state.food;

export function createOrders(data) {
  return async dispatch => {
    const oreders = data.map(({id, count, notes, selected_day}) => ({
      food_id: id,
      count: count,
      notes: notes,
      selected_day: format(
        parse(selected_day, 'MM/dd/yy', new Date()),
        'MM/dd/yyyy',
      ),
    }));

    dispatch(startLoading());
    try {
      const response = await axios.post(`/api/${API_VERSION}/orders/create`, {
        order: {
          chef_id: data[0].user_id,
          status: 'initiated',
          items_attributes: oreders,
        },
      });
      dispatch(slice.actions.setOrderId(response.data.success.id));
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function getFoodsByChef(cityId, cuisineId, chefId) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(
        `/api/${API_VERSION}/cities/${cityId}/cuisines/${cuisineId}/chefs/${chefId}`,
      );
      dispatch(slice.actions.getFoodsSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function getOrderDetail(orderId) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(
        `/api/${API_VERSION}/orders/${orderId}/details`,
      );
      dispatch(slice.actions.setOrderDetail(response.data));
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function getOrders() {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`/api/${API_VERSION}/orders`);
      dispatch(slice.actions.setOrders(response.data.orders_data));
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function deleteCart(orderId, foodId) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(
        `/api/${API_VERSION}/orders/${orderId}/items/${foodId}/delete`,
      );
      return response;
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function addTips(data) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.post(
        `/api/${API_VERSION}/orders/${data.orderId}/add_tips`,
        {
          tips: data.tips,
        },
      );
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function updateScheduleTime(orderId, scheduleTime) {
  return async dispatch => {
    dispatch(startLoading());
    const response = await axios.post(
      `/api/${API_VERSION}/orders/${orderId}/update_schedule_time`,
      {
        schedule_time: scheduleTime,
      },
    );
    setScheduleTime(scheduleTime);
    return response.data;
  };
}

export function updateDeliveryInstructions(data) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.post(
        `/api/${API_VERSION}/orders/${data.orderId}/update_delivery_instructions`,
        {
          leave_at_door: data.status,
          delivery_instructions: data.note,
        },
      );
      dispatch(slice.actions.setDeliveryInstructions(data.note));
      return response.data;
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function getPopularFoods() {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`/api/${API_VERSION}/foods`);
      dispatch(
        slice.actions.getPopularFoodsSuccess(
          response.data?.sort(() => Math.random() - 0.5),
        ),
      );
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function getSavedCards() {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(`/api/${API_VERSION}/users/saved_cards`);
      dispatch(
        slice.actions.setSavedCards(response.data ? [response.data] : []),
      );
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function updateCart(type, orderId, foodId) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.post(
        `/api/${API_VERSION}/orders/${orderId}/items/${foodId}/add_or_remove`,
        {
          operation_type: type,
        },
      );
      return response;
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function getOrderConfirmInfo(orderId) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.get(
        `/api/${API_VERSION}/orders/${orderId}/confirm_order`,
      );
      dispatch(slice.actions.setOrderConfirmInfo(response.data));
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function updateIsPickup(isPickup, orderId) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.post(
        `/api/${API_VERSION}/orders/${orderId}/update_is_pickup`,
        {
          is_pickup: isPickup,
        },
      );
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function applyCoupon(promocode, orderId) {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.post(
        `/api/${process.env.API_VERSION}/orders/${orderId}/apply_coupon`,
        {
          code: promocode,
        },
      );
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function deleteCard() {
  return async dispatch => {
    dispatch(startLoading());
    try {
      const response = await axios.delete(
        `/api/${API_VERSION}/payments/delete_card`,
      );
      return response;
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}
