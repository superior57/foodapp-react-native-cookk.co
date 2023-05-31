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
  selectedDate,
  selectedTime,
  setNewCartDialogIsOpen = () => {},
}) {
  const {foods} = useSelector(FOOD_SELECTOR);

  return (
    <Stack gap={30}>
      {foods?.[selectedDate]?.foods?.map(item => (
        <View key={item?.id}>
          <FoodCard
            foodData={item}
            selectedData={selectedData}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedData={setSelectedData}
            setNewCartDialogIsOpen={setNewCartDialogIsOpen}
          />
        </View>
      ))}
    </Stack>
  );
}
