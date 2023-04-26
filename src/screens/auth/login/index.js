import React from 'react';

// react-native
import {View, StyleSheet} from 'react-native';
// @mui
// layouts
// components
import Typography from '../../../components/typography';
// sections
import LoginForm from '../../../sections/auth/loginForm';
import Layout from '../../../layouts';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
  },

  signup: {
    color: '#F5D37A',
    textDecorationLine: 'underline',
  },
});

// ----------------------------------------------------------------------

export default function Login({navigation}) {
  return (
    <Layout variant="auth">
      <Typography variant={'h4'} color={'white'} style={{fontWeight: 900}}>
        Log in
      </Typography>
      <Typography variant={'body1'} color={'#ACACAC'} style={{marginTop: 20}}>
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
          onPress={() => navigation.navigate('Register')}>
          Sign up!
        </Typography>
      </View>
    </Layout>
  );
}
