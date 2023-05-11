import React from 'react';

// react-native
import {Divider} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
// sections
// routes
// redux
import {useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../redux/slices/food';
// theme
import {GREY, PRIMARY, SECONDARY} from '../../../../theme';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function Notes() {
  const {orderConfirmInfo} = useSelector(FOOD_SELECTOR);
  const notes = orderConfirmInfo?.notes ?? '';
  const {sub_total, service_fee, order_total, discount, tips} =
    orderConfirmInfo ?? {};

  return (
    <Stack gap={30}>
      {notes && (
        <Stack>
          <Typography variant="subtitle1" fontWeight="bold">
            Notes
          </Typography>
          <Typography>{notes}</Typography>
        </Stack>
      )}
      <Stack gap={50}>
        <Stack gap={10} style={{paddingHorizontal: 20}}>
          <Stack direction="row" justify="between">
            <Typography variant="body1" color={GREY[700]} fontWeight={600}>
              {'Subtotal'}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={'bold'}
              color={SECONDARY.main}>
              ${sub_total}
            </Typography>
          </Stack>
          <Stack direction="row" justify="between">
            <Typography variant="body1" color={GREY[700]} fontWeight={600}>
              {'Fee'}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={'bold'}
              color={SECONDARY.main}>
              ${service_fee}
            </Typography>
          </Stack>
          {tips > 0 && (
            <Stack direction="row" justify="between">
              <Typography variant="body1" color={GREY[700]} fontWeight={600}>
                {'Tips'}
              </Typography>
              <Typography
                variant="body1"
                fontWeight={'bold'}
                color={SECONDARY.main}>
                ${tips}
              </Typography>
            </Stack>
          )}
          {discount && (
            <Stack direction="row" justify="between">
              <Typography variant="body1" color={PRIMARY.main} fontWeight={600}>
                {'Discount'}
              </Typography>
              <Typography variant="body1" fontWeight={'bold'} color={'#39BA7C'}>
                ${discount}
              </Typography>
            </Stack>
          )}
          <Divider />
          <Stack direction="row" justify="between">
            <Typography variant="subtitle1" fontWeight={800}>
              {'Total'}
            </Typography>
            <Typography
              variant="subtitle1"
              fontWeight={800}
              color={SECONDARY.main}>
              ${order_total}
            </Typography>
          </Stack>
          <Divider />
        </Stack>
        <Typography variant="h6" fontWeight="bold" textAlign="center">
          Thank you for shopping with us !
        </Typography>
      </Stack>
    </Stack>
  );
}
