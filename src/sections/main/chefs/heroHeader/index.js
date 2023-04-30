import React from 'react';

// react-native
import {Image, StyleSheet} from 'react-native';
import Typography from '../../../../components/typography';
import {useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR} from '../../../../redux/slices/city';
import {Stack} from '@react-native-material/core';
// mui
// layouts
// screens
// components
// sections
// routes
// theme

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 10,
  },

  image: {
    height: 100,
  },
});

// ----------------------------------------------------------------------

export default function HeroHeader() {
  const {cuisine} = useSelector(CITYCUISINE_SELECTOR);

  return (
    <Stack style={styles.wrapper}>
      <Typography variant="subtitle1" fontWeight="bold">
        {cuisine?.name}
      </Typography>
      <Image
        source={{
          uri: cuisine?.image,
        }}
        style={styles.image}
      />
    </Stack>
  );
}
