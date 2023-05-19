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
import {dispatch, useSelector} from '../../../redux/store';
import {CITYCUISINE_SELECTOR, getCity} from '../../../redux/slices/city';

// ----------------------------------------------------------------------

export default function Home() {
  const {city} = useSelector(CITYCUISINE_SELECTOR);

  useEffect(() => {
    if (!city) {
      dispatch(getCity());
    }
  }, [city]);

  return (
    <Layout variant="main">
      <HomeHero />
      <HowItWork />
    </Layout>
  );
}
