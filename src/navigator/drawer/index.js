import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// @mui
import {Badge, Avatar} from '@react-native-material/core';
// layouts
// components
import Button from '../../components/button';
// sections
// theme
import {SECONDARY} from '../../theme';
//routes
import {AUTH_ROUTES, SCREEN_ROUTES} from '../../routes/paths';
// hook
import useAuth from '../../hooks/useAuth';
// redux
import {dispatch, useSelector} from '../../redux/store';
import {FOOD_SELECTOR, updateFoodCart} from '../../redux/slices/food';

// ----------------------------------------------------------------------

export let cartItemCount = 0;

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    padding: 30,
    gap: 10,
    height: '100%',
    width: '100%',
    backgroundColor: SECONDARY.main,
  },

  logo: {
    width: '100%',
    height: 60,
    marginBottom: 20,
  },

  cart: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },

  mainItem: {marginVertical: 10, textAlign: 'center', color: 'white'},
});

export default function Drawer() {
  const {isAuthenticated, logout} = useAuth();
  const navigation = useNavigation();
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const count = cart?.reduce(
      (total, currentValue) => total + (currentValue?.count ?? 0),
      0,
    );
    setCartCount(count);
    cartItemCount = count;
  }, [cart]);

  const handleLogout = async () => {
    try {
      await dispatch(updateFoodCart({actionType: 'clear'}));
      await logout();
      navigation.navigate(SCREEN_ROUTES.home);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN_ROUTES.home)}>
        <Image
          source={require('../../assets/images/logo/logo_transperent.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate(SCREEN_ROUTES.contactUs)}>
        <Text style={styles.mainItem}>Contact Us</Text>
      </TouchableOpacity>
      <View style={styles.cart}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_ROUTES.cart)}>
          <Badge label={cartCount} style={styles.badge} color="error" />
          <Avatar
            color="rgba(0,0,0,0)"
            icon={<Icon name="shoppingcart" size={25} color="white" />}
          />
        </TouchableOpacity>
      </View>
      {isAuthenticated ? (
        <Button
          variant="outlined"
          padding={8}
          style={{borderRadius: 5}}
          onPress={handleLogout}>
          Log out
        </Button>
      ) : (
        <>
          <Button
            variant="outlined"
            padding={8}
            style={{borderRadius: 5}}
            onPress={() => navigation.navigate(AUTH_ROUTES.register)}>
            Sign Up
          </Button>
          <Button
            variant="contained"
            padding={8}
            style={{borderRadius: 5}}
            onPress={() => navigation.navigate(AUTH_ROUTES.login)}>
            Log in
          </Button>
        </>
      )}
    </View>
  );
}
