import React, {useState} from 'react';

// react-native
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../../components/typography';
import CountBox from '../../../../../components/countBox';
// sections
import CartDetailDialog from './cartDetailDialog';
// routes
// redux
import {dispatch, useSelector} from '../../../../../redux/store';
import {FOOD_SELECTOR, updateFoodCart} from '../../../../../redux/slices/food';
// hooks
// theme
import {PRIMARY} from '../../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },

  body: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  foodImage: {
    height: 300,
    width: '100%',
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
      <Card>
        <TouchableOpacity onPress={handleClickItem}>
          <Image
            style={styles.foodImage}
            resizeMode="cover"
            source={{uri: image_url}}
          />
        </TouchableOpacity>
        <Stack style={styles.content}>
          <Stack direction="row" style={styles.body} justify="between" gap={20}>
            <Stack gap={5}>
              <Typography variant="subtitle1" sx={{width: 150}}>
                {title}
              </Typography>
              <Typography
                variant="subtitle1"
                color={PRIMARY.main}
                fontWeight="bold">
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
