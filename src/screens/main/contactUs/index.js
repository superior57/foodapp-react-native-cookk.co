import React, {useEffect, useState} from 'react';

// react-native
// mui
// layouts
import Layout from '../../../layouts';
// screens
// components
import Container from '../../../components/container';
import LoadingScreen from '../../../components/loadingScreen';
// sections
import ContactUsForm from '../../../sections/main/contactUs/form';
import ContactUsDescription from '../../../sections/main/contactUs/description';
import {dispatch} from '../../../redux/store';
import {getFaqs} from '../../../redux/slices/city';
// routes
// theme
// redux

// ----------------------------------------------------------------------

export default function ContactUs() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      await dispatch(getFaqs());
      setIsLoading(false);
    }

    fetch();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout variant="main">
      <Container>
        <ContactUsForm />
        <ContactUsDescription setIsLoading={setIsLoading} />
      </Container>
    </Layout>
  );
}
