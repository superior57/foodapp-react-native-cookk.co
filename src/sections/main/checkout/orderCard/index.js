import React, {useState} from 'react';

// react-native
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Divider, TextInput} from 'react-native-paper';
import {useToast} from 'react-native-styled-toast';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
import Button from '../../../../components/button';
// sections
// routes
import {SCREEN_ROUTES} from '../../../../routes/paths';
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {
  FOOD_SELECTOR,
  addTips,
  applyCoupon,
  getOrderDetail,
  updateFoodCart,
  updateScheduleTime,
} from '../../../../redux/slices/food';
import {placeOrder} from '../../../../redux/service/payment';
// theme
import {PRIMARY, SECONDARY} from '../../../../theme';
// hook
import useAuth from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },

  title: {
    paddingBottom: 20,
  },

  tips: {
    position: 'relative',
    justifyContent: 'center',
  },

  first: {
    position: 'absolute',
    zIndex: 10,
    marginLeft: 10,
  },

  tipsInput: {
    paddingLeft: 10,
  },

  promocode: {
    width: '100%',
    alignItems: 'center',
  },
});

// ----------------------------------------------------------------------

export default function OrderCard({isPickup}) {
  const {changeAddress} = useAuth();
  const navigation = useNavigation();
  const [disabled, setDisabled] = useState(true);
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {orderDetail, orderId} = checkout;
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();
  const [promocode, setPromocode] = useState();
  const address = orderDetail?.available_addresses?.[0];
  const {delivery_fee, sub_total, service_fee, items, order_total} =
    orderDetail ?? {};
  const [tips, setTips] = useState(orderDetail?.tips ?? '');

  const sendPromocode = async () => {
    setLoading(true);
    const response = await dispatch(applyCoupon(promocode, orderId));
    setLoading(false);
    if (!response) {
      toast({message: 'Promocode is not valid', intent: 'ERROR'});
    } else {
      toast({message: 'Successfully applied promo code', intent: 'SUCCESS'});
    }
    dispatch(getOrderDetail(orderId));
  };

  const handleClickOrder = async () => {
    try {
      setIsLoading(true);
      await dispatch(
        updateScheduleTime(
          orderId,
          checkout?.orderDetail?.items?.[0]?.selected_time,
        ),
      );
      await changeAddress(isPickup, address?.id, orderId);
      await dispatch(addTips({orderId: orderId, tips: tips}));
      const response = await dispatch(placeOrder(orderId));
      if (placeOrder.fulfilled.match(response)) {
        toast({message: 'Your payment was successful.', intent: 'SUCCESS'});
        setIsLoading(false);
        setTimeout(() => {
          dispatch(updateFoodCart({actionType: 'clear'}));
          navigation.navigate(SCREEN_ROUTES.confirm);
        }, 1000);
      } else if (placeOrder.rejected.match(response)) {
        const error = response.payload.message;
        toast({message: error, intent: 'ERROR'});
        setIsLoading(false);
      }
    } catch (error) {
      toast({message: error?.message, intent: 'ERROR'});
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/contactUs/form.png')}>
      <Stack style={styles.wrapper} gap={30}>
        <Typography variant="h6" style={styles.title} fontWeight="bold">
          Your order
        </Typography>
        <Stack gap={10}>
          {items?.map((item, _i) => (
            <Stack key={_i} direction="row" justify="between">
              <Typography>{item?.title}</Typography>
              <Typography>${item?.total_cost}</Typography>
            </Stack>
          ))}
          <Divider />
          <Stack direction="row" justify="between">
            <Typography>Subtotal:</Typography>
            <Typography fontWeight="bold">${sub_total}</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justify="between">
            <Typography>Service Fee:</Typography>
            <Typography fontWeight="bold">${service_fee}</Typography>
          </Stack>
          <Divider />
          {delivery_fee && (
            <Stack direction="row" justify="between">
              <Typography>Delivery Fee:</Typography>
              <Typography fontWeight="bold">${delivery_fee}</Typography>
            </Stack>
          )}
          {!isPickup && (
            <>
              <Divider />
              <Stack direction="row" justify="between">
                <Typography>Tip:</Typography>
                <Typography fontWeight="bold">
                  ${tips === '' ? 0 : tips}
                </Typography>
              </Stack>
            </>
          )}
          <Divider />
          <Stack direction="row" justify="between">
            <Typography>Total:</Typography>
            <Typography fontWeight="bold">
              ${order_total + parseFloat(tips === '' ? 0 : tips)}
            </Typography>
          </Stack>
        </Stack>
        {!isPickup && (
          <>
            <Stack gap={10}>
              <Typography variant="subtitle1" fontWeight="bold">
                Tip your delivery person
              </Typography>
              <View style={styles.tips}>
                <Typography sx={styles.first}>$</Typography>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={e => {
                    if (e > 0) {
                      setTips(parseFloat(e));
                    } else {
                      setTips(0);
                    }
                  }}
                  style={styles.tipsInput}
                  color={PRIMARY.tips}
                />
              </View>
            </Stack>
          </>
        )}
        <Stack gap={10}>
          <Typography variant="subtitle1" fontWeight="bold">
            Enter your promocode here
          </Typography>
          <Stack direction="row" justify="between" style={styles.promocode}>
            <TextInput
              style={{width: 220}}
              placeholder="Promocode"
              onChangeText={e => setPromocode(e)}
            />
            <Button
              width={80}
              color={SECONDARY.main}
              isLoading={loading}
              paddingVertical={16}
              onPress={sendPromocode}>
              Add
            </Button>
          </Stack>
        </Stack>
        <Typography sx={{lineHeight: 20}}>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </Typography>
        <Stack direction="row" gap={5}>
          <CheckBox
            value={!disabled}
            onValueChange={() => setDisabled(!disabled)}
          />
          <Typography sx={{width: 270}}>
            I’ve read and agree to the website terms and conditions
          </Typography>
        </Stack>
        <Button
          onPress={handleClickOrder}
          disabled={disabled}
          isLoading={isLoading}
          borderRadius={100}>
          ORDER
        </Button>
      </Stack>
    </ImageBackground>
  );
}
