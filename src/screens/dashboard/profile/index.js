import React from 'react';

// react-native
import {Divider} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
import Layout from '../../../layouts';
// screens
// components
import Container from '../../../components/container';
// sections
import UserInfo from '../../../sections/dashboard/userInfo';
import PersonalInfo from '../../../sections/dashboard/personalInfo';
import Password from '../../../sections/dashboard/password';
import Address from '../../../sections/dashboard/address';
// routes
// redux
// theme

// ----------------------------------------------------------------------

export default function Profile() {
  return (
    <Layout variant="dashboard">
      <Container>
        <Stack gap={30}>
          <UserInfo />
          <PersonalInfo />
          <Divider />
          <Address />
          <Divider />
          <Password />
        </Stack>
      </Container>
    </Layout>
  );
}
