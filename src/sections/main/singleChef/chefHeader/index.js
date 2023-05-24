import React, {useEffect, useState} from 'react';
import {isAfter, parse} from 'date-fns';

// react-native
import {TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Avatar from '../../../../components/avatar';
import Typography from '../../../../components/typography';
import ReadMore from '../../../../components/readMore';
import Button from '../../../../components/button';
// sections
import ChangeDeliveryDateDialog from './changeDeliveryDateDialog';
// routes
import {SCREEN_ROUTES} from '../../../../routes/paths';
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR, getChef} from '../../../../redux/slices/city';
import {FOOD_SELECTOR, updateFoodCart} from '../../../../redux/slices/food';
// theme
import {PRIMARY, SECONDARY} from '../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    gap: 30,
    paddingVertical: 10,
  },

  content: {
    width: '100%',
    alignItems: 'center',
  },

  datesWrapper: {
    width: '100%',
  },
});

// ----------------------------------------------------------------------

export default function ChefHeader({selectedCategory, setSelectedCategory}) {
  const navigation = useNavigation();
  const {chef: chefData, chefs} = useSelector(CITYCUISINE_SELECTOR);
  const chefId = chefData?.chef?.id;
  const {chef} = chefData ?? {};
  const {checkout, foods} = useSelector(FOOD_SELECTOR);
  const {cart, scheduleDate} = checkout;
  const [tempCategory, setTempCategory] = useState();
  const [nextChefId, setNextChefId] = useState();
  const [prevChefId, setPrevChefId] = useState();
  const [changeDeliveryDateDialogIsOpen, setChangeDeliveryDateDialogIsOpen] =
    useState(false);
  const categories = Object.keys(foods)
    .sort((a, b) => new Date(a) - new Date(b))
    .filter(key => isAfter(parse(key, 'MM/dd/yy', new Date()), new Date()))
    .map(key => ({date: key}));

  useEffect(() => {
    if (chefId && chefs) {
      const availableChefs = chefs?.filter(item => item?.chef?.can_sell);
      const currentIndex = availableChefs?.findIndex(
        item => item.chef.id === chefId,
      );
      setPrevChefId(availableChefs?.[currentIndex - 1]?.chef?.id);
      setNextChefId(availableChefs?.[currentIndex + 1]?.chef?.id);
    }
  }, [chefId, chefs]);

  useEffect(() => {
    if (categories?.length > 0) {
      if (cart[0]?.user_id === chef?.id) {
        setSelectedCategory(scheduleDate);
      } else {
        setSelectedCategory(categories[0]?.date);
      }
    }
  }, []);

  const changeDeliveryDate = () => {
    setSelectedCategory(tempCategory);
    dispatch(updateFoodCart({actionType: 'clear'}));
    setChangeDeliveryDateDialogIsOpen(false);
  };

  const handleClickCategory = data => {
    if (selectedCategory !== data && cart?.length > 0) {
      setChangeDeliveryDateDialogIsOpen(true);
      setTempCategory(data);
    } else {
      setSelectedCategory(data);
    }
  };

  const handleClick = id => {
    dispatch(getChef(id));
  };

  return (
    <>
      <ChangeDeliveryDateDialog
        onSubmit={changeDeliveryDate}
        visible={changeDeliveryDateDialogIsOpen}
        onDismiss={() => setChangeDeliveryDateDialogIsOpen(false)}
      />
      <Stack style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_ROUTES.chefs)}>
          <Typography variant="subtitle1" fontWeight="bold">
            Back
          </Typography>
        </TouchableOpacity>
        {prevChefId && nextChefId && (
          <Stack direction="row" justify="between">
            <TouchableOpacity onPress={() => handleClick(prevChefId)}>
              <Typography color={PRIMARY.main}>
                {prevChefId ? 'Previous Chef' : ' '}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClick(nextChefId)}>
              <Typography color={PRIMARY.main}>
                {nextChefId ? 'Next Chef' : ' '}
              </Typography>
            </TouchableOpacity>
          </Stack>
        )}
        <Stack style={styles.content} gap={20} justify="center">
          <Avatar
            size={100}
            image={chef?.image_url}
            firstName={chef?.first_name}
            lastName={chef?.last_name}
          />
          <Typography variant="h6" fontWeight="bold" color={SECONDARY.main}>
            {chef?.company_name}
          </Typography>
          <Typography variant={'subtitle1'} fontWeight={600}>
            by {chef?.first_name} {chef?.last_name}
          </Typography>
          <Stack direction="row" justify="between" gap={60}>
            <Stack gap={10}>
              <Stack direction="row">
                <Typography variant="body1">Rating: </Typography>
                <Typography variant={'subtitle1'} fontWeight="bold">
                  {chef?.rating}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant="body1">Deliveries: </Typography>
                <Typography variant={'subtitle1'} fontWeight="bold">
                  {chef?.orders}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={10}>
              <Stack direction="row">
                <Typography variant="body1">Zip code: </Typography>
                <Typography variant={'subtitle1'} fontWeight="bold">
                  {chef?.primary_address?.zip}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant="body1">Rating: </Typography>
                <Typography variant={'subtitle1'} fontWeight="bold">
                  ${chef?.delivery_fee ?? 4.99}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <ReadMore>{chef?.about_me}</ReadMore>
        <Typography variant="h6" fontWeight="bold">
          Available dates
        </Typography>
        <ScrollView horizontal={true}>
          <Stack direction="row" gap={10} style={styles.datesWrapper}>
            {categories?.map(item => (
              <Button
                key={item?.date + item?.id}
                color={
                  item?.date === selectedCategory
                    ? SECONDARY.main
                    : SECONDARY.lighter
                }
                onPress={() => handleClickCategory(item?.date)}>
                {item?.date}
              </Button>
            ))}
          </Stack>
        </ScrollView>
        <Typography>Chef requires 17 hours for food preparation</Typography>
      </Stack>
    </>
  );
}
