import React from 'react';

// react-native
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import Typography from '../../../../components/typography';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Container from '../../../../components/container';
// sections
// routes
// theme
// redux
import {openDialog} from '../../../../redux/slices/dialog';
import {dispatch, useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR} from '../../../../redux/slices/city';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    width: '100%',
  },

  image: {
    width: '100%',
    backgroundColor: 'white',
    height: 150,
  },
});

// ----------------------------------------------------------------------

export default function HeroHeader() {
  const {cuisine} = useSelector(CITYCUISINE_SELECTOR);

  return (
    <Stack style={styles.wrapper}>
      <Container>
        <TouchableOpacity
          onPress={() => dispatch(openDialog('choose_city_dialog'))}>
          <Typography variant="subtitle1" fontWeight="bold">
            {cuisine?.name}
          </Typography>
        </TouchableOpacity>
      </Container>
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
