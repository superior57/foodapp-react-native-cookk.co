import React from 'react';

// react-native
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Avatar from '../../../../components/avatar';
// sections
// routes
// redux
import {useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../redux/slices/food';
import Typography from '../../../../components/typography';
// theme

// ----------------------------------------------------------------------

export default function ChefProfile() {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;
  const {chef} = cart[0] ?? {};

  return (
    <Stack style={{width: '100%'}}>
      <Stack direction="row" gap={20}>
        <Avatar
          size={120}
          image={chef?.image_url}
          firstName={chef?.first_name}
          lastName={chef?.last_name}
        />
        <Stack justify="center">
          <Typography variant="h5" fontWeight="bold">
            {chef?.company_name}
          </Typography>
          <Typography variant={'subtitle1'}>
            by {chef?.first_name} {chef?.last_name}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
