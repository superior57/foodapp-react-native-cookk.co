import React, {useEffect, useState} from 'react';

// react-native
// @mui
// layouts
import Layout from '../../../layouts';
// components
// sections
import HomeHero from '../../../sections/main/home/homeHero';
import HowItWork from '../../../sections/main/home/howItWork';
// redux
import {dispatch} from '../../../redux/store';
import {getCities} from '../../../redux/slices/city';

// ----------------------------------------------------------------------

export default function Home() {
  useEffect(() => {
    dispatch(getCities());
  }, []);
  return (
    <Layout variant="main">
      <HomeHero />
      <HowItWork />
    </Layout>
  );
}
