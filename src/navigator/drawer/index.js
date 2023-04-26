import React from 'react';
import {useNavigation} from '@react-navigation/native';

// react-native
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
// @mui
// layouts
// components
import Button from '../../components/button';
import Typography from '../../components/typography';
// sections
// theme
import {SECONDARY} from '../../theme';
//routes
import {AUTH_ROUTES, SCREEN_ROUTES} from '../../routes/paths';

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
});

export default function Drawer() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN_ROUTES.home)}>
        <Image
          source={require('../../assets/images/logo-transperent.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <Typography
        textAlign="center"
        color={'white'}
        style={{marginVertical: 10}}
        onPress={() => navigation.navigate(SCREEN_ROUTES.contactUs)}>
        Contact Us
      </Typography>
      <Button
        variant="outlined"
        padding={8}
        style={{borderRadius: 5}}
        onPress={() => navigation.navigate(AUTH_ROUTES.register)}>
        Sign Up
      </Button>
      <Button
        variant="outlined"
        padding={8}
        style={{borderRadius: 5}}
        onPress={() => navigation.navigate(AUTH_ROUTES.login)}>
        Log in
      </Button>
    </View>
  );
}
