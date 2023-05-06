import React from 'react';

// react-native
import {StyleSheet, Image} from 'react-native';
import {useToast} from 'react-native-styled-toast';
import {Card} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Button from '../../../../components/button';
import Typography from '../../../../components/typography';
// sections
// routes
// redux
import {useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../redux/slices/food';
// theme
import {SECONDARY} from '../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },

  pickup: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  delivery: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  map: {
    width: '100%',
    height: 100,
  },
});

// ----------------------------------------------------------------------

export default function Address({isPickup}) {
  const {toast} = useToast();
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {orderDetail} = checkout;
  const pickupAddress = orderDetail?.pickup_address;

  const dleiverySubmit = () => {
    toast({
      message:
        'At the moment, delivery services are not available, but we are actively working towards making it possible',
      intent: 'INFO',
    });
  };

  return (
    <Card style={styles.wrapper}>
      <Stack gap={20}>
        <Stack direction="row">
          <Button
            width={120}
            sx={styles.pickup}
            color={SECONDARY.main}
            borderRadius={0}
            variant={isPickup ? 'contained' : 'outlined'}>
            Pickup
          </Button>
          <Button
            onPress={dleiverySubmit}
            width={120}
            sx={styles.delivery}
            color={SECONDARY.main}
            borderRadius={0}
            variant={!isPickup ? 'contained' : 'outlined'}>
            Delivery
          </Button>
        </Stack>
        <Stack gap={20}>
          <Stack gap={5}>
            <Typography variant="subtitle1" fontWeight="bold">
              {isPickup ? 'Pick up' : 'Delivery'}:
            </Typography>
            {pickupAddress && (
              <Stack>
                <Typography variant="body2">
                  {pickupAddress?.line1 + ' ' + pickupAddress?.apartment}
                </Typography>
                <Typography variant="body2">
                  {pickupAddress?.city +
                    ' ' +
                    pickupAddress?.state +
                    ' ' +
                    pickupAddress?.zip}
                </Typography>
              </Stack>
            )}
          </Stack>
          <Image
            style={styles.map}
            source={require('../../../../assets/images/checkout/map.png')}
            resizeMode="contain"
          />
        </Stack>
      </Stack>
    </Card>
  );
}
