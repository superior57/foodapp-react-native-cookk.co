import React from 'react';

// react-native
// @mui
// layouts
import Layout from '../../../layouts';
// components
// sections
import HomeHero from '../../../sections/main/home/homeHero';
import HowItWork from '../../../sections/main/home/howItWork';
// redux

// ----------------------------------------------------------------------

export default function Home() {
  return (
    <Layout variant="main">
      <HomeHero />
      <HowItWork />
    </Layout>
  );
}
