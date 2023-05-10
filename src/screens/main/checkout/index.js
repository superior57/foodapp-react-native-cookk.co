import React, {useEffect, useState} from 'react';

// react-native
import {useNavigation} from '@react-navigation/native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
import Layout from '../../../layouts';
// screens
// components
import Container from '../../../components/container';
import Typography from '../../../components/typography';
import LoadingScreen from '../../../components/loadingScreen';
// sections
import Address from '../../../sections/main/checkout/address';
import ScheduleTime from '../../../sections/main/checkout/scheduleTime';
import Notes from '../../../sections/main/checkout/notes';
import Payment from '../../../sections/main/checkout/payment';
import CartList from '../../../sections/main/checkout/cartList';
import OrderCard from '../../../sections/main/checkout/orderCard';
// routes
import {SCREEN_ROUTES} from '../../../routes/paths';
// redux
import {dispatch, useSelector} from '../../../redux/store';
import {FOOD_SELECTOR, getOrderDetail} from '../../../redux/slices/food';
// theme

// ----------------------------------------------------------------------

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPickup, setIsPickup] = useState(true);
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;
  const {orderId, orderDetail} = checkout;
  const navigation = useNavigation();

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await dispatch(getOrderDetail(orderId));
      setIsLoading(false);
      if (cart.length === 0) {
        navigation.navigate(SCREEN_ROUTES.home);
      }
    };
    fetch();
  }, [cart.length, navigation, orderId]);

  useEffect(() => {
    if (orderDetail) {
      setIsPickup(orderDetail?.is_pickup);
    }
  }, [orderDetail]);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout variant="main">
      <Container>
        <Stack gap={20}>
          <Typography variant="h6" fontWeight="bold">
            Checkout
          </Typography>
          <Address isPickup={isPickup} />
          <ScheduleTime isPickup={isPickup} />
          <Notes isPickup={isPickup} />
          <Payment />
          <CartList />
          <OrderCard />
        </Stack>
      </Container>
    </Layout>
  );
}
