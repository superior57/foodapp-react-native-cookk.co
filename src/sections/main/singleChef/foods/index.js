import React from 'react';

// react-native
import {View, StyleSheet, Image, ActivityIndicator} from 'react-native';
// mui
// layouts
import {Stack} from '@react-native-material/core';
// screens
// components
// sections
import FoodCard from './foodCard';
// routes
// redux
import Typography from '../../../../components/typography';
// theme

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  errorMsg: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 50,
  },

  errorImage: {
    height: 120,
  },
});

// ----------------------------------------------------------------------

export default function Foods({
  searchIsLoading,
  filteredFoodsArray,
  selectedData,
  selectedDate,
  selectedTime,
  setSelectedData = () => {},
  setNewCartDialogIsOpen = () => {},
}) {
  return (
    <Stack gap={30}>
      {searchIsLoading ? (
        <Stack style={{paddingVertical: 60}}>
          <ActivityIndicator size={30} />
        </Stack>
      ) : filteredFoodsArray?.length === 0 ? (
        <Stack justify="center" style={styles.errorMsg} gap={20}>
          <Typography variant="h5" fontWeight="bold">
            We are sorry
          </Typography>
          <Stack gap={5}>
            <Typography textAlign="center" variant="subtitle2">
              We couldn't find any matching results
            </Typography>
            <Typography textAlign="center" variant="subtitle2">
              for your search
            </Typography>
          </Stack>
          <Image
            style={styles.errorImage}
            resizeMode="contain"
            source={require('../../../../assets/images/chefs/oops.png')}
          />
        </Stack>
      ) : (
        filteredFoodsArray?.map(item => (
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
        ))
      )}
    </Stack>
  );
}
