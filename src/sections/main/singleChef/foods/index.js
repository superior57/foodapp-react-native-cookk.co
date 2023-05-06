import React from 'react';

// react-native
import {View} from 'react-native';
// mui
// layouts
import {Stack} from '@react-native-material/core';
// screens
// components
// sections
import FoodCard from './foodCard';
// routes
// redux
import {useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../redux/slices/food';
// theme

// ----------------------------------------------------------------------

export default function Foods({
  selectedData,
  setSelectedData = () => {},
  selectedCategory,
  setNewCartDialogIsOpen = () => {},
}) {
  const {foods} = useSelector(FOOD_SELECTOR);

  return (
    <Stack gap={30}>
      {foods?.[selectedCategory]?.map(item => (
        <View key={item?.id}>
          <FoodCard
            foodData={item}
            selectedData={selectedData}
            selectedCategory={selectedCategory}
            setSelectedData={setSelectedData}
            setNewCartDialogIsOpen={setNewCartDialogIsOpen}
          />
        </View>
      ))}
    </Stack>
  );
}
