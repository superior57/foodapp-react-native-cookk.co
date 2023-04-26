import React from 'react';

// react-native
// @mui
// layouts
// components
import Typography from '../../../components/typography';
// sections
import CreatePassForm from '../../../sections/auth/createPassForm';
import AuthLayout from '../../../layouts/auth';

// ----------------------------------------------------------------------

export default function CreatePass({navigation}) {
  return (
    <AuthLayout>
      <Typography variant={'h5'} color={'white'} sx={{fontWeight: 900}}>
        Create new password
      </Typography>
      <Typography variant={'body1'} color={'#ACACAC'} sx={{marginTop: 20}}>
        Please enter your new password
      </Typography>
      <CreatePassForm />
    </AuthLayout>
  );
}
