import React from 'react';

// react-native
import {Image, View, StyleSheet, Dimensions, Linking} from 'react-native';
// @mui
// layouts
// components
import Screen from '../../../components/screen';
import Container from '../../../components/container';
import Typography from '../../../components/typography';
// sections
import LoginForm from '../../../sections/auth/loginForm';
import AuthHeader from '../../../layouts/auth/authHeader';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get('window').height,
    width: '100%',
  },

  content: {
    height: Dimensions.get('window').height,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0 ,0, 0.5)',
    position: 'absolute',
  },

  signup: {
    color: '#F5D37A',
    textDecorationLine: 'underline',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
  },
});

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <Screen>
      <Image
        style={styles.image}
        source={require('../../../assets/images/auth_bg.png')}
      />
      <View style={styles.content}>
        <AuthHeader />
        <Container>
          <Typography variant={'h4'} color={'white'} style={{fontWeight: 900}}>
            Log in
          </Typography>
          <Typography
            variant={'body1'}
            color={'#ACACAC'}
            style={{marginTop: 20}}>
            Welcome back! Please enter your details...
          </Typography>
          <LoginForm />
          <View style={styles.footer}>
            <Typography variant="h6" color="white">
              Don’t have the account?
            </Typography>
            <Typography
              style={styles.signup}
              variant="h6"
              onPress={() => Linking.openURL('https://www.example.com')}>
              Sign up!
            </Typography>
          </View>
        </Container>
      </View>
    </Screen>
  );
}
