import React, {useEffect} from 'react';
import {isValidToken, setSession} from '../utils/jwt';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../utils/axios';
// import {API_VERSION} from '@env';

// ----------------------------------------------------------------------

const API_VERSION = 'v1';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const handlers = {
  INITIALIZE: (state, action) => {
    const {isAuthenticated, user} = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },

  LOGIN: (state, action) => {
    const {user} = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  LOGOUT: state => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),

  REGISTER: (state, action) => {
    const {user} = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },

  UPDATEADDRESS: (state, action) => {
    const {user} = state;
    user.addresses = [
      ...user.addresses.map(item => {
        if (item.id === action.payload.id) {
          return {
            id: action.payload.id,
            line1: action.payload.address,
            apartment: action.payload.apartment,
            state: action.payload.state,
            city: action.payload.city,
            zip: action.payload.zip,
            address_type: null,
            addressable_type: 'User',
            addressable_id: 15,
            primary_address: true,
            created_at: '2023-04-04T08:34:27.021Z',
            updated_at: new Date(),
          };
        } else {
          return item;
        }
      }),
    ];
    return {
      ...state,
      user,
    };
  },

  UPDATE_AVATAR: (state, action) => {
    state.user.image = action.payload;
    return {
      ...state,
      user: state.user,
    };
  },

  ADDADDRESS: (state, action) => {
    const {user} = state;
    user.addresses = [
      {
        id: action.payload.id,
        line1: action.payload.address,
        apartment: action.payload.apartment,
        state: action.payload.state,
        city: action.payload.city,
        zip: action.payload.zip,
        address_type: null,
        addressable_type: 'User',
        addressable_id: 15,
        primary_address: true,
        created_at: '2023-04-04T08:34:27.021Z',
        updated_at: new Date(),
      },
    ];
    return {
      ...state,
      user,
    };
  },

  UPDATEPERSONALINFO: (state, action) => {
    const {user} = state;
    user.user = {
      first_name: action.payload.first_name,
      last_name: action.payload.last_name,
      username: action.payload.username,
      mobile: action.payload.phone_number,
      email: action.payload.email_address,
      instagram: action.payload.instagram,
      facebook: action.payload.facebook,
    };
    return {
      ...state,
      user,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const AuthContext = React.createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  updateAddress: () => Promise.resolve(),
  updateAvatar: () => Promise.resolve(),
  addAddress: () => Promise.resolve(),
  updatePersonalInfo: () => Promise.resolve(),
  forgotPass: () => Promise.resolve(),
  createPass: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

function AuthProvider({children}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');

        if (accessToken) {
          await setSession(accessToken);

          const response = await axios.get(`/api/${API_VERSION}/users/profile`);
          const user = response.data;

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, [state.isAuthenticated]);

  const login = async data => {
    const response = await axios.post(`/api/${API_VERSION}/login`, data);

    const {auth_token, user} = response.data;

    setSession(auth_token);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    });

    return {auth_token, user};
  };

  const register = async data => {
    const response = await axios.post(`/api/${API_VERSION}/sign_up`, {
      users: {
        ...data,
        user_type: 'end_user',
      },
    });
    const {user, auth_token} = response.data;

    AsyncStorage.setItem('accessToken', auth_token);
    setSession(auth_token);
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  };

  const forgotPass = async data => {
    const response = await axios.post(
      `/api/${API_VERSION}/forgot_password`,
      data,
    );
    const {auth_token} = response.data;

    AsyncStorage.setItem('accessToken', auth_token);
  };

  const createPass = async data => {
    await axios.post(`/api/${API_VERSION}/reset_password`, data);
  };

  const logout = async () => {
    setSession(null);
    dispatch({type: 'LOGOUT'});
  };

  const updateAddress = async data => {
    dispatch({
      type: 'UPDATEADDRESS',
      payload: data,
    });

    const response = await axios.post(
      `/api/${API_VERSION}/users/addresses/${data?.id}/update`,
      {
        address: {
          line1: data.address,
          apartment: data.apartment,
          state: data.state,
          city: data.city,
          zip: data.zip,
          primary_address: 'true',
        },
      },
    );
    return response;
  };

  const addAddress = async data => {
    const response = await axios.post(`/api/${API_VERSION}/users/add_address`, {
      address: {
        line1: data.address,
        apartment: data.apartment,
        state: data.state,
        city: data.city,
        zip: data.zip,
        primary_address: 'true',
      },
    });

    const userInfo = await axios.get(`/api/${API_VERSION}/users/profile`);

    dispatch({
      type: 'ADDADDRESS',
      payload: userInfo.data.addresses[0],
    });

    return response;
  };

  const updatePersonalInfo = async data => {
    dispatch({
      type: 'UPDATEPERSONALINFO',
      payload: data,
    });

    const response = await axios.post(
      `/api/${API_VERSION}/users/update_personal_info`,
      {
        user: {
          first_name: data.first_name,
          last_name: data.last_name,
          username: data.username,
          mobile: data.phone_number,
          instagram: data.instagram,
          facebook: data.facebook,
        },
      },
    );
    return response;
  };

  const updateAvatar = async avatarUrl => {
    dispatch({
      type: 'UPDATE_AVATAR',
      payload: avatarUrl,
    });

    return await Promise.resolve(true);
  };

  const updatePassword = async data => {
    const response = await axios.post(
      `/api/${API_VERSION}/users/update_password`,
      {
        new_password: data.new_password,
        old_password: data.old_password,
      },
    );
    return response;
  };

  const changeAddress = async (isPickup, addressId, orderId) => {
    const response = await axios.post(
      `/api/${API_VERSION}/orders/${orderId}/change_address`,
      {
        is_pickup: isPickup,
        address_id: addressId,
      },
    );
    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        updateAddress,
        addAddress,
        updateAvatar,
        updatePersonalInfo,
        updatePassword,
        changeAddress,
        forgotPass,
        createPass,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export {AuthContext, AuthProvider};
