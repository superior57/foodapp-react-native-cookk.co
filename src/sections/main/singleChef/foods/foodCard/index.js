import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Entypo';

// react-native
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Avatar from '../../../../../components/avatar';
import Typography from '../../../../../components/typography';
// sections
import CartDetailDialog from './cartDetailDialog';
// routes
// redux
import {dispatch, useSelector} from '../../../../../redux/store';
import {FOOD_SELECTOR, updateFoodCart} from '../../../../../redux/slices/food';
import useAuth from '../../../../../hooks/useAuth';
import {useNavigation} from '@react-navigation/native';
import {AUTH_ROUTES} from '../../../../../routes/paths';
// theme

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
  },

  content: {
    alignItems: 'center',
    width: '100%',
  },

  body: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});

// ----------------------------------------------------------------------

export default function FoodCard({
  foodData,
  setNewCartDialogIsOpen = () => {},
  setSelectedData = () => {},
  selectedData,
  selectedCategory,
}) {
  const {title, image_url, quantity, min_order, current_price, measurement} =
    foodData;
  const navigation = useNavigation();
  const {isAuthenticated} = useAuth();
  const [isOpenCartDialog, setIsOpenCartDialog] = useState(false);
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;

  const addCart = async data => {
    if (cart?.some(item => item?.user_id !== data?.user_id)) {
      setNewCartDialogIsOpen(true);
      setSelectedData(data);
    } else {
      dispatch(updateFoodCart({data: data, actionType: 'add'}));
    }
  };

  const handleClickPlus = () => {
    if (isAuthenticated) {
      addCart({
        ...foodData,
        count: cart.find(food => food?.id === foodData.id)
          ? 1
          : foodData.min_order ?? 1,
        selected_day: selectedCategory,
      });
    } else {
      navigation.navigate(AUTH_ROUTES.login);
    }
  };

  const handleClickItem = () => {
    let data = {...foodData};
    if (!data.min_order) {
      data.min_order = 1;
    }
    data.count = cart.find(item => item?.id === data.id)?.min_order
      ? data.min_order
      : 1;
    data.selected_day = selectedCategory;
    setIsOpenCartDialog(true);
    setSelectedData(data);
  };

  return (
    <>
      <CartDetailDialog
        visible={isOpenCartDialog}
        onDismiss={() => setIsOpenCartDialog(false)}
        data={selectedData}
        setSelectedData={setSelectedData}
        onSubmit={() => {
          addCart(selectedData);
          setIsOpenCartDialog(false);
        }}
      />
      <Card style={styles.wrapper}>
        <Stack style={styles.content}>
          <TouchableOpacity onPress={handleClickItem}>
            <Avatar size={120} image={image_url} />
          </TouchableOpacity>
          <Stack direction="row" style={styles.body} justify="between" gap={20}>
            <Stack gap={5}>
              <Typography variant="subtitle1" sx={{width: 200}}>
                {title}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold">
                {`$${current_price} / ${quantity} ${measurement || ''}`}
              </Typography>
              {min_order > 1 && (
                <Typography variant="caption">
                  min orders {`${min_order} ${measurement || ''}`}
                </Typography>
              )}
            </Stack>
            <TouchableOpacity onPress={() => handleClickPlus(foodData)}>
              <Icon name="plus" size={25} />
            </TouchableOpacity>
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
