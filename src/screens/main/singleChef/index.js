import React from 'react';
import Layout from '../../../layouts';

// react-native
// mui
// layouts
// screens
// components
// sections
import ChefHeader from '../../../sections/main/singleChef/chefHeader';
import Container from '../../../components/container';
// routes
// redux
// theme

// ----------------------------------------------------------------------

export default function SingleChef() {
  return (
    <Layout variant="main">
      <Container>
        <ChefHeader />
      </Container>
    </Layout>
  );
}
