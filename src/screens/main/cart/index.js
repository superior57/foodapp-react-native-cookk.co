import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
import Layout from '../../../layouts';
// screens
// components
import LoadingScreen from '../../../components/loadingScreen';
import Container from '../../../components/container';
import Typography from '../../../components/typography';
import Button from '../../../components/button';
// sections
import ChefProfile from '../../../sections/main/cart/chefProfile';
import FoodList from '../../../sections/main/cart/foodList';
// redux
import {dispatch, useSelector} from '../../../redux/store';
import {clearOrderDetail} from '../../../redux/slices/food';
import {createOrders} from '../../../redux/slices/food';
import {FOOD_SELECTOR} from '../../../redux/slices/food';
// routes
import {SCREEN_ROUTES} from '../../../routes/paths';
// theme
import {GREY} from '../../../theme';
// cart item count
import {cartItemCount} from '../../../navigator/drawer';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 20,
    paddingVertical: 20,
  },

  empty: {
    alignItems: 'center',
    gap: 20,
    paddingVertical: 60,
  },
});

// ----------------------------------------------------------------------

export default function Cart() {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const onSubmit = async () => {
    setIsLoading(true);
    dispatch(clearOrderDetail());
    await dispatch(createOrders(cart));
    setIsLoading(false);
    navigation.navigate(SCREEN_ROUTES.checkout);
  };

  return (
    <Layout variant="main">
      <Container>
        {cart?.length > 0 ? (
          <Stack style={styles.wrapper}>
            <Typography variant="h4" textAlign="center" fontWeight="bold">
              Cart
            </Typography>
            <Typography textAlign="center">
              Your cart currently contains delicious food items that are just
              waiting to be enjoyed. Take a moment to review your selections
              before proceeding to checkout.
            </Typography>
            <ChefProfile />
            <FoodList />
            <Button
              isLoading={isLoading}
              onPress={onSubmit}
              variant="outlined"
              width="100%">{`Checkout (${cartItemCount})`}</Button>
          </Stack>
        ) : (
          <Stack style={styles.empty}>
            <Icon name="shoppingcart" color={GREY[400]} size={100} />
            <Typography variant="subtitle1" fontWeight={600} color={GREY[600]}>
              There are no items in your cart
            </Typography>
          </Stack>
        )}
      </Container>
    </Layout>
  );
}
