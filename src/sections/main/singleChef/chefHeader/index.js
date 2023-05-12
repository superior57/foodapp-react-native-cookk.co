import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {addDays, isAfter, parse} from 'date-fns';

// react-native
import {TouchableOpacity, StyleSheet, Linking, ScrollView} from 'react-native';
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
import {CITYCUISINE_SELECTOR} from '../../../../redux/slices/city';
// theme
import {PRIMARY, SECONDARY} from '../../../../theme';
import {FOOD_SELECTOR, updateFoodCart} from '../../../../redux/slices/food';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    gap: 20,
    paddingVertical: 10,
  },

  instagramIcon: {
    position: 'absolute',
    right: 0,
    top: 0,
  },

  content: {
    gap: 20,
    alignItems: 'center',
  },

  datesWrapper: {
    width: '100%',
  },
});

// ----------------------------------------------------------------------

export default function ChefHeader({
  selectedCategory,
  setSelectedCategory,
  selectedData,
  setSelectedData,
  newCartDialogIsOpen,
  setNewCartDialogIsOpen,
}) {
  const navigation = useNavigation();
  const {chef: chefData} = useSelector(CITYCUISINE_SELECTOR);
  const {chef} = chefData ?? {};
  const {checkout, foods} = useSelector(FOOD_SELECTOR);
  const {cart, deliveryDate} = checkout;
  const [tempCategory, setTempCategory] = useState();
  const [changeDeliveryDateDialogIsOpen, setChangeDeliveryDateDialogIsOpen] =
    useState(false);

  const categories = Object.keys(foods)
    .sort((a, b) => new Date(a) - new Date(b))
    .filter(key => isAfter(parse(key, 'MM/dd/yy', new Date()), new Date()))
    .map(key => ({date: key}));

  useEffect(() => {
    if (categories.length > 0) {
      if (cart[0]?.user_id === chef?.id) {
        setSelectedCategory(deliveryDate);
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
        {chef?.instagram && (
          <TouchableOpacity
            onPress={() => Linking.openURL(chef?.instagram)}
            style={styles.instagramIcon}>
            <Icon name="instagram" size={30} color={PRIMARY.main} />
          </TouchableOpacity>
        )}
        <Stack direction="row" style={styles.content}>
          <Avatar
            size={100}
            image={chef?.image_url}
            firstName={chef?.first_name}
            lastName={chef?.last_name}
          />
          <Stack gap={3}>
            <Typography
              variant="subtitle1"
              fontWeight="bold"
              color={SECONDARY.main}>
              {chef?.company_name}
            </Typography>
            <Typography variant={'subtitle2'} fontWeight={600}>
              by {chef?.first_name} {chef?.last_name}
            </Typography>
            <Stack direction="row" gap={30}>
              <Typography variant={'subtitle2'}>
                Rating: {chef?.rating}
              </Typography>
              <Typography variant={'subtitle2'} fontWeight={600}>
                Zip code: {chef?.primary_address?.zip}
              </Typography>
            </Stack>
            <Stack direction="row" gap={30}>
              <Typography variant={'subtitle2'}>
                Deliveries: {chef?.orders}
              </Typography>
              <Typography color={PRIMARY.main} variant={'subtitle2'}>
                Certified chef
              </Typography>
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
      </Stack>
    </>
  );
}
