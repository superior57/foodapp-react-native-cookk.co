import React from 'react';

// react-native
import {StyleSheet} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Avatar from '../../../../../components/avatar';
import Typography from '../../../../../components/typography';
// sections
// routes
// redux
// theme
import {SECONDARY} from '../../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    width: 110,
    alignItems: 'center',
  },

  title: {
    paddingTop: 5,
  },
});

// ----------------------------------------------------------------------

export default function FoodCard(props) {
  const {image, title} = props;

  return (
    <Stack style={styles.wrapper}>
      <Avatar image={image} size={80} />
      <Typography
        textAlign="center"
        color={SECONDARY.main}
        sx={styles.title}
        fontWeight="bold">
        {title}
      </Typography>
    </Stack>
  );
}
