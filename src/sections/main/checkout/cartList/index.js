import React from 'react';

// react-native
import {View} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
// sections
import PanelWrapper from '../panelWrapper';
import FoodCard from './foodCard';
// routes
// redux
import {useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../redux/slices/food';
// theme

// ----------------------------------------------------------------------

export default function CartList() {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {orderDetail} = checkout;

  return (
    <PanelWrapper icon="shopping-cart" title="Items in your cart">
      <Stack gap={30}>
        {[...(orderDetail?.items || [])]
          ?.sort((a, b) => a.id - b.id)
          .map((data, _i) => (
            <View key={'cart-cousine-' + _i} disableGutters>
              <FoodCard data={data} />
            </View>
          ))}
      </Stack>
    </PanelWrapper>
  );
}
