import React from 'react';

// react-native
// @mui
// layouts
// components
import Typography from '../../../components/typography';
// sections
import ForgotPassForm from '../../../sections/auth/forgotPassForm';
import AuthLayout from '../../../layouts/auth';

// ----------------------------------------------------------------------

export default function ForgotPass({navigation}) {
  return (
    <AuthLayout>
      <Typography variant={'h5'} color={'white'} sx={{fontWeight: 900}}>
        Forgot your password?
      </Typography>
      <Typography variant={'body1'} color={'#ACACAC'} sx={{marginTop: 20}}>
        Please enter your email address associated with your account
      </Typography>
      <ForgotPassForm />
    </AuthLayout>
  );
}
