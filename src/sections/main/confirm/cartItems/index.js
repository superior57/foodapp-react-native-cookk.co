import React from 'react';

// react-native
import {StyleSheet} from 'react-native';
import {Card, Divider} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
import Avatar from '../../../../components/avatar';
// sections
// routes
// redux
import {useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../redux/slices/food';
// theme
import {PRIMARY, SECONDARY} from '../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    padding: 30,
  },

  content: {
    alignItems: 'center',
  },
});

// ----------------------------------------------------------------------

export default function CartItems() {
  const {orderConfirmInfo} = useSelector(FOOD_SELECTOR);
  const cart = orderConfirmInfo?.items;

  return (
    <Stack gap={30}>
      <Typography variant="h6" fontWeight="bold">
        Items in your cart
      </Typography>
      {cart?.map((item, _i) => (
        <Card key={_i} style={styles.card}>
          <Stack direction="row" justify="between" style={styles.content}>
            <Avatar size={80} image={item?.image_url} />
            <Stack>
              <Typography variant="subtitle1" fontWeight={600}>
                {item?.name}
              </Typography>
              <Typography color={SECONDARY.main}>
                Quantity: {item?.quantity}
              </Typography>
              {item?.notes && (
                <Typography variant="body2">{item?.notes}</Typography>
              )}
            </Stack>
            <Typography
              variant="body1"
              fontWeight={'bold'}
              color={PRIMARY.main}>
              ${item?.price}
            </Typography>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
}
