import React from 'react';

// react-native
import {View, StyleSheet} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
// sections
import FoodCard from './foodCard';
// routes
// redux
import {useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../redux/slices/food';
// theme

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
});

// ----------------------------------------------------------------------

export default function FoodList() {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;

  return (
    <Stack gap={20} style={styles.wrapper}>
      <Typography variant="h6" fontWeight="bold">
        Items in your cart
      </Typography>
      {cart?.map(item => (
        <View key={item?.id}>
          <FoodCard data={item} />
        </View>
      ))}
    </Stack>
  );
}
