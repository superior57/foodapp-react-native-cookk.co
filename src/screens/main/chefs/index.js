import React, {useEffect, useState} from 'react';

// react-native
// mui
// layouts
// screens
// components
import Layout from '../../../layouts';
import LoadingScreen from '../../../components/loadingScreen';
// sections
import ChooseChef from '../../../sections/main/chefs/chooseChef';
import HeroHeader from '../../../sections/main/chefs/heroHeader';
// routes
// hook
// theme
// redux
import {dispatch, useSelector} from '../../../redux/store';
import {CITYCUISINE_SELECTOR, getChefs} from '../../../redux/slices/city';

// ----------------------------------------------------------------------

export default function Chefs() {
  const {city, cuisine, chefs} = useSelector(CITYCUISINE_SELECTOR);
  const cityId = city?.id;
  const cuisineId = cuisine?.id;
  const [isLoading, setIsLoading] = useState(false);
  const [chefArray, setChefsArray] = useState();

  useEffect(() => {
    setChefsArray(chefs);
  }, [chefs]);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      await dispatch(getChefs(cityId, cuisineId));
      setIsLoading(false);
    }

    if (cuisineId) {
      fetch();
    }
  }, [cuisineId]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout variant="main">
      <HeroHeader chefArray={chefArray} setChefsArray={setChefsArray} />
      <ChooseChef chefs={chefArray} />
    </Layout>
  );
}
