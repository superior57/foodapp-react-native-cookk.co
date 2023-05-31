import React, {useState} from 'react';

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
import CountBox from '../../../../../components/countBox';
// sections
import CartDetailDialog from './cartDetailDialog';
// routes
// redux
import {dispatch, useSelector} from '../../../../../redux/store';
import {
  FOOD_SELECTOR,
  setScheduleDate,
  setScheduleTime,
  updateFoodCart,
} from '../../../../../redux/slices/food';
// hooks
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
  selectedDate,
  selectedTime,
}) {
  const {title, image_url, quantity, min_order, current_price, measurement} =
    foodData;
  const [isOpenCartDialog, setIsOpenCartDialog] = useState(false);
  const {checkout, foods} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;

  const addCart = async data => {
    if (cart?.some(item => item?.user_id !== data?.user_id)) {
      setNewCartDialogIsOpen(true);
      setSelectedData(data);
    } else {
      dispatch(updateFoodCart({data: data, actionType: 'add'}));
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
    data.selected_day = selectedDate;
    setIsOpenCartDialog(true);
    setSelectedData(data);
  };

  return (
    <>
      <CartDetailDialog
        visible={isOpenCartDialog}
        onDismiss={() => setIsOpenCartDialog(false)}
        data={selectedData}
        foods={foods?.[selectedDate]?.foods}
        setSelectedData={setSelectedData}
        onSubmit={data => {
          addCart(data);
          setIsOpenCartDialog(false);
        }}
      />
      <Card style={styles.wrapper}>
        <Stack style={styles.content}>
          <TouchableOpacity onPress={handleClickItem}>
            <Avatar size={150} image={image_url} />
          </TouchableOpacity>
          <Stack direction="row" style={styles.body} justify="between" gap={20}>
            <Stack gap={5}>
              <Typography variant="subtitle1" sx={{width: 150}}>
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
            <CountBox
              data={foodData}
              setIsOpenNewCartDlg={setNewCartDialogIsOpen}
              setSelectedItemData={setSelectedData}
              selectedCategory={selectedDate}
            />
          </Stack>
        </Stack>
      </Card>
    </>
  );
}
