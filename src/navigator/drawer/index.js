import React from 'react';
import {useNavigation} from '@react-navigation/native';

// react-native
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
// @mui
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

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    padding: 30,
    gap: 20,
    height: '100%',
    width: '100%',
    backgroundColor: SECONDARY.main,
  },

  logo: {
    width: '100%',
    height: 60,
    marginBottom: 20,
  },

  mainItem: {marginVertical: 10, textAlign: 'center', color: 'white'},
});

export default function Drawer() {
  const {isAuthenticated, logout} = useAuth();
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
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
