import React, {useEffect, useState} from 'react';

// react-native
import {Image, StyleSheet} from 'react-native';
import {Divider} from 'react-native-paper';
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
// redux
import {dispatch, useSelector} from '../../../redux/store';
import {FOOD_SELECTOR, getOrderDetail} from '../../../redux/slices/food';
// theme
import {SECONDARY} from '../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    backgroundColor: SECONDARY.main,
    height: 40,
    alignItems: 'center',
    marginTop: 40,
  },

  bannerImage: {
    position: 'absolute',
  },
});

// ----------------------------------------------------------------------

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isPickup, setIsPickup] = useState(true);
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {orderId, orderDetail} = checkout;

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await dispatch(getOrderDetail(orderId));
      setIsLoading(false);
    };
    fetch();
  }, [orderId]);

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
          <Divider />
          <Stack style={styles.banner} justify="center">
            <Image
              style={styles.bannerImage}
              source={require('../../../assets/images/chefs/Texture.png')}
            />
            <Typography variant="subtitle1" color="white">
              Get free delivery on orders over $100
            </Typography>
          </Stack>
          <Address isPickup={isPickup} />
          <ScheduleTime isPickup={isPickup} />
          <Notes isPickup={isPickup} />
          <Payment />
          <CartList />
          <OrderCard isPickup={isPickup} />
        </Stack>
      </Container>
    </Layout>
  );
}
