import React, {useEffect} from 'react';

// react-native
import {StyleSheet} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
import Layout from '../../../layouts';
// screens
// components
import Container from '../../../components/container';
import LoadingScreen from '../../../components/loadingScreen';
// sections
import MainInfo from '../../../sections/main/confirm/mainInfo';
import CartItems from '../../../sections/main/confirm/cartItems';
import Notes from '../../../sections/main/confirm/Notes';
// routes
// redux
import {dispatch, useSelector} from '../../../redux/store';
import {
  FOOD_SELECTOR,
  getOrderConfirmInfo,
  updateFoodCart,
} from '../../../redux/slices/food';
// theme

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 30,
  },
});

// ----------------------------------------------------------------------

export default function Confirm() {
  const {loading, checkout} = useSelector(FOOD_SELECTOR);
  const {orderId} = checkout;
  useEffect(() => {
    dispatch(getOrderConfirmInfo(orderId));
  }, [orderId]);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Layout variant="main">
      <Container>
        <Stack style={styles.wrapper} gap={50}>
          <MainInfo />
          <CartItems />
          <Notes />
        </Stack>
      </Container>
    </Layout>
  );
}
