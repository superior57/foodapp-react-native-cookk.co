import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from './axios';
import {dispatch} from '../redux/store';
import {updateFoodCart} from '../redux/slices/food';
import {useNavigation} from '@react-navigation/native';
import {AUTH_ROUTES} from '../routes/paths';

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
    dispatch(updateFoodCart({actionType: 'clear'}));
    AsyncStorage.removeItem('accessToken');
    const navigation = useNavigation();
    navigation.navigate(AUTH_ROUTES.login);
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
