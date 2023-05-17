import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';

// react-native
import {View, StyleSheet} from 'react-native';
// mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../typography';
// sections
// routes
// redux
// theme
import {GREY, PRIMARY, SECONDARY} from '../../theme';
import useAuth from '../../hooks/useAuth';
import {dispatch, useSelector} from '../../redux/store';
import {
  FOOD_SELECTOR,
  setScheduleDate,
  updateFoodCart,
} from '../../redux/slices/food';
import {useNavigation} from '@react-navigation/native';
import {AUTH_ROUTES} from '../../routes/paths';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GREY[400],
    borderRadius: 50,
  },
});

// ----------------------------------------------------------------------

export default function CountBox({
  data = {},
  setIsOpenNewCartDlg = () => {},
  setSelectedItemData = () => {},
  selectedCategory,
}) {
  const navigation = useNavigation();
  const {isAuthenticated} = useAuth();
  const [value, setValue] = useState(0);
  const {
    checkout: {cart},
  } = useSelector(FOOD_SELECTOR);

  const handleClick = actionType => {
    if (isAuthenticated) {
      let temp = {...data};
      temp.count = cart?.find(item => item?.id === data?.id)
        ? 1
        : data?.min_order ?? 1;
      if (cart.some(item => item?.user_id !== data?.user_id)) {
        setSelectedItemData(temp);
        setIsOpenNewCartDlg(true);
      } else {
        if (!cart?.find(item => item?.user_id === data?.user_id)) {
          dispatch(setScheduleDate(selectedCategory));
        }
        dispatch(updateFoodCart({data: temp, actionType: actionType}));
      }
    } else {
      navigation.navigate(AUTH_ROUTES.login);
    }
  };
  useEffect(() => {
    setValue(cart?.find(item => item?.id === data?.id)?.count ?? 0);
  }, [cart, data]);
  return cart?.find(
    item => item?.id === data?.id && item?.user_id === data?.user_id,
  ) ? (
    <View>
      <Stack direction="row" style={styles.wrapper}>
        <IconButton
          onPress={() => handleClick('remove')}
          icon={<Icon color={PRIMARY.main} size={25} name="minus" />}
        />
        <Typography color={SECONDARY.main} variant="subtitle1">
          {value}
        </Typography>
        <IconButton
          onPress={() => handleClick('add')}
          icon={<Icon color={PRIMARY.main} size={25} name="plus" />}
        />
      </Stack>
    </View>
  ) : (
    <IconButton
      style={styles.wrapper}
      onPress={() => handleClick('add')}
      icon={<Icon color={PRIMARY.main} size={25} name="plus" />}
    />
  );
}
