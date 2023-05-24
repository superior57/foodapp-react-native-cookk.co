import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Container from '../../../../components/container';
import Avatar from '../../../../components/avatar';
import Typography from '../../../../components/typography';
// sections
import FoodCard from './foodCard';
// routes
import {SCREEN_ROUTES} from '../../../../routes/paths';
// theme
import {GREY, PRIMARY} from '../../../../theme';
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR, getChef} from '../../../../redux/slices/city';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 30,
  },

  chef: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: GREY[400],
  },

  header: {
    alignItems: 'center',
    padding: 10,
    gap: 20,
    borderBottomWidth: 1,
    borderBottomRadius: 10,
    borderBottomColor: GREY[400],
  },

  rating: {
    alignItems: 'center',
    gap: 10,
  },

  body: {
    padding: 10,
  },

  foodSection: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },

  foods: {
    paddingTop: 20,
  },

  backdrop: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    opacity: 0.7,
  },
});

// ----------------------------------------------------------------------

export default function ChooseChef() {
  const navigation = useNavigation();
  const {city, chefs} = useSelector(CITYCUISINE_SELECTOR);

  const chooseChef = chefId => {
    navigation.navigate(SCREEN_ROUTES.singleChef);
    dispatch(getChef(chefId));
  };

  return (
    <Container style={styles.wrapper}>
      <Stack gap={30}>
        <Typography
          variant="subtitle1"
          fontWeight="bold">{`${city?.name} Chefs`}</Typography>
        {chefs?.map(item => (
          <View key={item?.chef?.id} style={{position: 'relative'}}>
            <Stack style={styles.chef}>
              <Stack direction="row" justify="around" style={styles.header}>
                <Stack direction="row" style={styles.rating}>
                  <Icon name="star" size={20} color={PRIMARY.main} />
                  <Typography variant="subtitle1" fontWeight="bold">
                    {item?.chef?.rating}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography variant="body1">Orders: </Typography>
                  <Typography variant={'subtitle1'} fontWeight="bold">
                    {item?.chef?.orders}
                  </Typography>
                </Stack>
                <Stack direction="row">
                  <Typography variant="body1">Delivery fee: </Typography>
                  <Typography variant={'subtitle1'} fontWeight="bold">
                    ${item?.chef?.delivery_fee ?? 4.99}
                  </Typography>
                </Stack>
              </Stack>
              <Stack style={styles.body}>
                <TouchableOpacity
                  onPress={() => {
                    if (item?.chef?.can_sell) {
                      chooseChef(item?.chef?.id);
                    }
                  }}>
                  <Stack direction="row" gap={20}>
                    <Avatar
                      size={100}
                      image={item?.chef?.image_url}
                      firstName={item?.chef?.first_name}
                      lastName={item?.chef?.last_name}
                    />
                    <Stack gap={10} justify="center">
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item?.chef?.company_name}
                      </Typography>
                      <Typography variant="caption">
                        by {item?.chef?.first_name} {item?.chef?.last_name}
                      </Typography>
                    </Stack>
                  </Stack>
                </TouchableOpacity>
                <ScrollView horizontal={true}>
                  <View style={styles.foodSection}>
                    <Stack
                      direction="row"
                      justify="around"
                      style={styles.foods}>
                      {item?.foods?.map(food => (
                        <FoodCard
                          key={food?.id}
                          title={food?.title}
                          image={food?.image_url}
                          price={food?.current_price}
                          measurement={food?.measurement}
                          quantity={food?.quantity}
                        />
                      ))}
                    </Stack>
                  </View>
                </ScrollView>
              </Stack>
            </Stack>
            {!item?.chef?.can_sell && (
              <View style={styles.backdrop}>
                <Typography variant="h5" fontWeight="bold">
                  Comming Soon
                </Typography>
              </View>
            )}
          </View>
        ))}
      </Stack>
    </Container>
  );
}
