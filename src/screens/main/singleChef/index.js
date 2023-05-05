import React, {useEffect, useState} from 'react';
import Layout from '../../../layouts';

// react-native
// mui
// layouts
// screens
// components
import Container from '../../../components/container';
import LoadingScreen from '../../../components/loadingScreen';
// sections
import ChefHeader from '../../../sections/main/singleChef/chefHeader';
// routes
// redux
import {getFoodsByChef} from '../../../redux/slices/food';
import {dispatch, useSelector} from '../../../redux/store';
import {CITYCUISINE_SELECTOR, getChefs} from '../../../redux/slices/city';
// theme
// hook

// ----------------------------------------------------------------------

export default function SingleChef() {
  const [selectedCategory, setSelectedCategory] = useState();
  const {city, cuisine, chef} = useSelector(CITYCUISINE_SELECTOR);
  const [isLoading, setIsLoading] = useState(true);
  const cityId = city?.id;
  const cuisineId = cuisine?.id;
  const chefId = chef?.chef?.id;

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      await dispatch(getChefs(cityId, cuisineId));
      await dispatch(getFoodsByChef(cityId, cuisineId, chefId));
      setIsLoading(false);
    }

    if (cityId != null && cuisineId != null && chefId != null) {
      fetch();
    }
  }, [cityId, cuisineId, chefId]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout variant="main">
      <Container>
        <ChefHeader
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Container>
    </Layout>
  );
}
