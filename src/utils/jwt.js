import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './axios';

const isValidToken = async accessToken => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = exp => {
  let expiredTimer;
  const currentTime = Date.now();

  const timeLeft = exp * 1000 - currentTime;

  clearTimeout(expiredTimer);

  expiredTimer = setTimeout(() => {
    alert('Token expired');
    AsyncStorage.removeItem('accessToken');
  }, timeLeft);
};

const setSession = async accessToken => {
  if (accessToken) {
    await AsyncStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common['auth-token'] = accessToken;
    const {exp} = jwtDecode(accessToken);
    handleTokenExpired(exp);
  } else {
    await AsyncStorage.removeItem('accessToken');
    delete axios.defaults.headers.common['auth-token'];
  }
};

export {isValidToken, setSession};
