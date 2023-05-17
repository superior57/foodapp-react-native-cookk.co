import React, {useState} from 'react';

// react-native
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Avatar from '../../../../../components/avatar';
import Typography from '../../../../../components/typography';
// sections
import CountBox from './countBox';
// routes
// redux
// theme
import {PRIMARY, SECONDARY, SUCCESS} from '../../../../../theme';
import {dispatch, useSelector} from '../../../../../redux/store';
import {
  FOOD_SELECTOR,
  deleteCart,
  getOrderDetail,
  updateCart,
  updateFoodCart,
} from '../../../../../redux/slices/food';
// import {useToast} from 'react-native-styled-toast';
import {useNavigation} from '@react-navigation/native';
import {SCREEN_ROUTES} from '../../../../../routes/paths';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    padding: 30,
    backgroundColor: 'white',
  },

  image: {
    alignItems: 'center',
  },

  title: {
    width: 180,
  },

  action: {
    alignItems: 'center',
  },
});

// ----------------------------------------------------------------------

export default function FoodCard({data}) {
  const navigation = useNavigation();
  // const {toast} = useToast();
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {orderDetail, orderId} = checkout;
  const [loading, setLoading] = useState(false);

  const handleClickAddCart = async type => {
    try {
      setLoading(true);
      if (type === '+') {
        const response = await dispatch(updateCart('add', orderId, data.id));
        // successAlert(response.data.success);
      } else {
        if (
          orderDetail?.items?.find(item => item?.id === data?.id)?.count >
          data?.min_order
        ) {
          const response = await dispatch(
            updateCart('remove', orderId, data.id),
          );
        } else {
          deleteItem(data?.id);
        }
        // successAlert(response.data.success);
      }
      await dispatch(getOrderDetail(orderId));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const deleteItem = async foodId => {
    try {
      setLoading(true);
      const response = await dispatch(deleteCart(orderId, foodId));
      await dispatch(getOrderDetail(orderId));
      // toast({message: response.data.success, intent: 'SUCCESS'});
      setLoading(false);
      if (orderDetail?.items?.length === 1) {
        dispatch(updateFoodCart({actionType: 'clear'}));
        setTimeout(() => {
          navigation.navigate(SCREEN_ROUTES.home);
        }, 500);
      }
    } catch (error) {
      // toast({message: error.message, intent: 'ERROR'});
    }
  };

  return (
    <Card style={styles.wrapper}>
      <Stack gap={20}>
        <Stack style={styles.image}>
          <Avatar size={120} image={data?.image} />
        </Stack>
        <Stack gap={10}>
          <Typography
            sx={styles.title}
            variant="subtitle1"
            fontWeight="bold"
            color={SECONDARY.main}>
            {data?.title}
          </Typography>
          {data?.min_order > 1 && (
            <Typography color={PRIMARY.main}>
              min orders {`${data?.min_order} ${data?.measurement || ''}`}
            </Typography>
          )}
          {data?.notes && <Typography>{data?.notes}</Typography>}
          <Stack direction="row" justify="between" style={styles.action}>
            <CountBox
              loading={loading}
              value={data?.count}
              minOrder={data?.min_order}
              foodId={data?.id}
              onChange={type => handleClickAddCart(type)}
            />
            <Stack direction="row" gap={5}>
              <Typography variant={'subtitle1'} color={SUCCESS.main}>
                $
                {data?.cost *
                  orderDetail?.items?.find(item => item?.id === data?.id)
                    ?.count}
              </Typography>
              <Typography variant={'body2'}>
                ( ${data?.cost} x{' '}
                {orderDetail?.items?.find(item => item?.id === data?.id)?.count}{' '}
                )
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
