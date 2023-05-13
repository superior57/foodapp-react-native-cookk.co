import React from 'react';

// react-native
// mui
// layouts
import Layout from '../../../layouts';
// screens
// components
import Container from '../../../components/container';
// sections
import UserInfo from '../../../sections/dashboard/userInfo';
// routes
// redux
// theme

// ----------------------------------------------------------------------

export default function Profile() {
  return (
    <Layout variant="dashboard">
      <Container>
        <UserInfo />
      </Container>
    </Layout>
  );
}
