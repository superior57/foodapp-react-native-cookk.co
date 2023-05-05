import React from 'react';

// react-native
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Typography from '../../../../components/typography';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
// sections
// routes
// theme
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR} from '../../../../redux/slices/city';
import {openDialog} from '../../../../redux/slices/dialog';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 10,
  },

  image: {
    width: '100%',
    backgroundColor: 'white',
    height: 100,
  },
});

// ----------------------------------------------------------------------

export default function HeroHeader() {
  const {cuisine} = useSelector(CITYCUISINE_SELECTOR);

  return (
    <Stack style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => dispatch(openDialog('choose_cuisine_dialog'))}>
        <Typography variant="subtitle1" fontWeight="bold">
          {cuisine?.name}
        </Typography>
      </TouchableOpacity>
      {cuisine?.image ? (
        <Image
          defaultSource={require('../../../../assets/images/placeholder.png')}
          source={{
            uri: cuisine?.image,
          }}
          style={styles.image}
        />
      ) : (
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../../../assets/images/placeholder.png')}
        />
      )}
    </Stack>
  );
}
