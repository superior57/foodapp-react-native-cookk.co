import React from 'react';

// react-native
// mui
// layouts
import Layout from '../../../layouts';
// screens
// components
import Container from '../../../components/container';
// sections
import ContactUsForm from '../../../sections/main/contactUs/form';
import ContactUsDescription from '../../../sections/main/contactUs/description';
// routes
// theme
// redux

// ----------------------------------------------------------------------

export default function ContactUs() {
  return (
    <Layout variant="main">
      <Container>
        <ContactUsForm />
        <ContactUsDescription />
      </Container>
    </Layout>
  );
}
