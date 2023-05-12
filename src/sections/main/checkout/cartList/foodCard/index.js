import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

// react-native
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
// mui
import {IconButton, Stack} from '@react-native-material/core';
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
import {ERROR, PRIMARY, SECONDARY, SUCCESS} from '../../../../../theme';
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

  header: {
    alignItems: 'center',
    paddingRight: 15,
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
        // toast({message: response.data.success, intent: 'SUCCESS'});
      } else {
        if (data.count === (data.min_order ?? 1)) {
          deleteItem(data?.id);
        } else {
          const response = await dispatch(
            updateCart('remove', orderId, data.id),
          );
          // toast({message: response.data.success, intent: 'SUCCESS'});
        }
      }
      setLoading(false);
      await dispatch(getOrderDetail(orderId));
    } catch (error) {
      setLoading(false);
      // toast({message: error.message, intent: 'ERROR'});
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
          <Avatar size={100} image={data?.image} />
        </Stack>
        <Stack gap={5}>
          <Stack direction="row" justify="between" style={styles.header}>
            <Typography
              sx={styles.title}
              variant="subtitle1"
              fontWeight="bold"
              color={SECONDARY.main}>
              {data?.title}
            </Typography>
            <Typography variant={'subtitle1'} color={SUCCESS.main}>
              ${data?.cost}
            </Typography>
          </Stack>
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
            <IconButton
              disabled={loading}
              onPress={() => deleteItem(data?.id)}
              icon={<Icon name="trash" color={ERROR.main} size={16} />}
            />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
