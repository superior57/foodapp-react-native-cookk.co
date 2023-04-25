import React from 'react';

// react-native
// @mui
// layouts
// components
import Typography from '../../../components/typography';
// sections
import RegisterForm from '../../../sections/auth/registerForm';
import AuthLayout from '../../../layouts/auth';

// ----------------------------------------------------------------------

export default function Register({navigation, route}) {
  return (
    <AuthLayout>
      <Typography variant={'h4'} color={'white'} style={{fontWeight: 900}}>
        Sign up!
      </Typography>
      <Typography variant={'body1'} color={'#ACACAC'} style={{marginTop: 20}}>
        Welcome back! Please enter your details...
      </Typography>
      <RegisterForm />
    </AuthLayout>
  );
}
