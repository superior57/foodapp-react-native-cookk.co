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
  updateFoodCart,
  updateScheduleTime,
} from '../../../../redux/slices/food';
import {placeOrder} from '../../../../redux/service/payment';
// theme
import {PRIMARY} from '../../../../theme';

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
});

// ----------------------------------------------------------------------

export default function OrderCard() {
  const navigation = useNavigation();
  const [disabled, setDisabled] = useState(true);
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {orderDetail, orderId, cart} = checkout;
  const scheduleTime = checkout?.orderDetail?.schedule_time;
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();
  const sub_total = orderDetail?.sub_total;
  const service_fee = orderDetail?.service_fee;
  const items = orderDetail?.items;
  const order_total = orderDetail?.order_total;
  const [tips, setTips] = useState(orderDetail?.tips ?? 0);

  const handleClickOrder = async () => {
    try {
      setIsLoading(true);
      if (!scheduleTime) {
        await dispatch(updateScheduleTime(orderId, scheduleTime));
      }
      await dispatch(addTips({orderId: orderId, tips: tips}));
      await dispatch(placeOrder(orderId));
      dispatch(updateFoodCart({actionType: 'clear'}));

      toast({message: 'Your payment was successful.', intent: 'SUCCESS'});
      setIsLoading(false);
      setTimeout(() => {
        navigation.navigate(SCREEN_ROUTES.confirm);
      }, 1000);
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
          <Stack direction="row" justify="between">
            <Typography>Tip:</Typography>
            <Typography fontWeight="bold"> ${tips}</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justify="between">
            <Typography>Total:</Typography>
            <Typography fontWeight="bold"> ${order_total + tips}</Typography>
          </Stack>
        </Stack>
        <Stack gap={10}>
          <Typography variant="subtitle1" fontWeight="bold">
            Tips
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
              defaultValue="0"
            />
          </View>
        </Stack>
        <Stack gap={10}>
          <Typography variant="subtitle1" fontWeight="bold">
            Enter your promocode here
          </Typography>
          <TextInput color={PRIMARY.tips} placeholder="Promocode" />
        </Stack>
        <Typography sx={{lineHeight: 20}}>
          Your personal data will be used to process your order, support your
          experience throughout this website, and for other purposes described
          in our privacy policy.
        </Typography>
        <Stack direction="row" gap={5}>
          <CheckBox
            value={!disabled}
            onValueChange={e => setDisabled(!disabled)}
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
