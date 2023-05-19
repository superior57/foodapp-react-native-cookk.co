import React, {useState} from 'react';

// react-native
import {StyleSheet, Image} from 'react-native';
import {Card} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Button from '../../../../components/button';
import Typography from '../../../../components/typography';
// sections
import AddressDialog from './addressDialog';
// routes
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {
  FOOD_SELECTOR,
  getOrderDetail,
  updateIsPickup,
} from '../../../../redux/slices/food';
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

  editAddressButton: {
    paddingHorizontal: 10,
    width: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

// ----------------------------------------------------------------------

export default function Address() {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {orderDetail, orderId} = checkout;
  const isPickup = orderDetail?.is_pickup;
  const pickupAddress = orderDetail?.pickup_address;
  const deliveryAddress = orderDetail?.available_addresses?.[0];
  const [isLoading, setIsLoading] = useState(false);
  const [addressDialogIsOpen, setAddressDialogIsOpen] = useState(false);

  const handleChange = async is_pickup => {
    setIsLoading(true);
    await dispatch(updateIsPickup(is_pickup, orderId));
    await dispatch(getOrderDetail(orderId));
    setIsLoading(false);
  };

  return (
    <>
      <AddressDialog
        visible={addressDialogIsOpen}
        onDismiss={() => {
          setAddressDialogIsOpen(false);
        }}
      />
      <Card style={styles.wrapper}>
        <Stack gap={20}>
          <Stack direction="row">
            <Button
              isLoading={!isPickup && isLoading}
              onPress={() => handleChange(true)}
              width={'50%'}
              sx={styles.pickup}
              color={SECONDARY.main}
              borderRadius={0}
              variant={isPickup ? 'contained' : 'outlined'}>
              Pickup
            </Button>
            <Button
              isLoading={isPickup && isLoading}
              onPress={() => handleChange(false)}
              width={'50%'}
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
              {isPickup
                ? pickupAddress && (
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
                  )
                : deliveryAddress && (
                    <Stack gap={10}>
                      <Stack>
                        <Typography variant="body2">
                          {deliveryAddress?.line1 +
                            ' ' +
                            deliveryAddress?.apartment}
                        </Typography>
                        <Typography variant="body2">
                          {deliveryAddress?.city +
                            ' ' +
                            deliveryAddress?.state +
                            ' ' +
                            deliveryAddress?.zip}
                        </Typography>
                      </Stack>
                      <Button
                        onPress={() => setAddressDialogIsOpen(true)}
                        variant="outlined"
                        color={SECONDARY.main}>
                        {deliveryAddress ? 'Edit' : 'Add address'}
                      </Button>
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
    </>
  );
}
