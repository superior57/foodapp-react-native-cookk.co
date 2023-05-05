import React, {useEffect, useState} from 'react';

// react-native
// mui
// layouts
// screens
// components
import Layout from '../../../layouts';
import Container from '../../../components/container';
import LoadingScreen from '../../../components/loadingScreen';
// sections
import ChooseChef from '../../../sections/main/chefs/chooseChef';
import HeroHeader from '../../../sections/main/chefs/heroHeader';
// routes
// hook
// theme
// redux
import {dispatch, useSelector} from '../../../redux/store';
import {
  CITYCUISINE_SELECTOR,
  getChefs,
  getCity,
} from '../../../redux/slices/city';

// ----------------------------------------------------------------------

export default function Chefs() {
  const {city, cuisine} = useSelector(CITYCUISINE_SELECTOR);
  const cityId = city?.id;
  const cuisineId = cuisine?.id;
  const [loading, SetIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      SetIsLoading(true);
      await dispatch(getChefs(cityId, cuisineId));
      SetIsLoading(false);
      dispatch(getCity(cityId));
    }

    if (cityId != null && cuisineId != null) {
      fetch();
    }
  }, [cityId, cuisineId]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Layout variant="main">
      <Container>
        <HeroHeader />
        <ChooseChef />
      </Container>
    </Layout>
  );
}
