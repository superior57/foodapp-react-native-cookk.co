import React, {useEffect, useState} from 'react';
import Layout from '../../../layouts';

// react-native
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Container from '../../../components/container';
import LoadingScreen from '../../../components/loadingScreen';
// sections
import ChefHeader from '../../../sections/main/singleChef/chefHeader';
import Foods from '../../../sections/main/singleChef/foods';
import NewCartDialog from '../../../sections/main/singleChef/chefHeader/newCartDialog';
// routes
// redux
import {
  FOOD_SELECTOR,
  getFoodsByChef,
  updateFoodCart,
} from '../../../redux/slices/food';
import {dispatch, useSelector} from '../../../redux/store';
import {CITYCUISINE_SELECTOR} from '../../../redux/slices/city';
// theme
// hook

// ----------------------------------------------------------------------

export default function SingleChef() {
  const [newCartDialogIsOpen, setNewCartDialogIsOpen] = useState(false);
  const [searchIsLoading, setSearchIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [foodsArray, setFoodsArray] = useState();
  const {city, cuisine, chef} = useSelector(CITYCUISINE_SELECTOR);
  const [isLoading, setIsLoading] = useState(false);
  const {checkout, foods} = useSelector(FOOD_SELECTOR);
  const {cart, scheduleDate} = checkout;
  const cityId = city?.id;
  const cuisineId = cuisine?.id;
  const chefId = chef?.chef?.id;

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      await dispatch(
        getFoodsByChef(
          cityId,
          cuisineId,
          chefId,
          cart[0]?.user_id == chef?.chef?.id ? scheduleDate : '',
        ),
      );
      setIsLoading(false);
    }

    if (cityId != null && cuisineId != null && chefId != null) {
      fetch();
    }
  }, [cityId, cuisineId, chefId, chef?.chef?.id]);

  useEffect(() => {
    setFoodsArray(foods?.[selectedDate]?.foods);
  }, [foods, selectedDate]);

  const newCart = () => {
    dispatch(updateFoodCart({actionType: 'clear'}));
    dispatch(
      updateFoodCart({
        data: selectedData,
        actionType: 'add',
      }),
    );
    setNewCartDialogIsOpen(false);
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <NewCartDialog
        onSubmit={newCart}
        visible={newCartDialogIsOpen}
        onDismiss={() => setNewCartDialogIsOpen(false)}
      />
      <Layout variant="main">
        <Container>
          <Stack gap={30}>
            <ChefHeader
              setSearchIsLoading={setSearchIsLoading}
              foodsArray={foodsArray}
              setFoodsArray={setFoodsArray}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
            <Foods
              searchIsLoading={searchIsLoading}
              foodsArray={foodsArray}
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              setNewCartDialogIsOpen={setNewCartDialogIsOpen}
              selectedDate={selectedDate}
              selectedTime={selectedTime}
            />
          </Stack>
        </Container>
      </Layout>
    </>
  );
}
