import axios from 'axios';

// import {HOST_API_KEY} from '@env';

// ----------------------------------------------------------------------

const HOST_API_KEY = 'https://api.cookk.co';

const axiosInstance = axios.create({baseURL: HOST_API_KEY || ''});
axiosInstance.interceptors.response.use(
  response => response,
  error =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong',
    ),
);

export default axiosInstance;
