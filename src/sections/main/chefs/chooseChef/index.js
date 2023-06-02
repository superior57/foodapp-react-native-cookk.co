import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
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
    paddingVertical: 10,
    paddingHorizontal: 20,
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

  errorMsg: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 30,
    paddingHorizontal: 50,
  },

  errorImage: {
    height: 120,
  },
});

// ----------------------------------------------------------------------

export default function ChooseChef({chefs}) {
  const navigation = useNavigation();
  const {city} = useSelector(CITYCUISINE_SELECTOR);

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
        {chefs?.length === 0 ? (
          <Stack justify="center" style={styles.errorMsg} gap={20}>
            <Typography variant="h5" fontWeight="bold">
              We are sorry
            </Typography>
            <Stack gap={5}>
              <Typography textAlign="center" variant="subtitle2">
                We couldn't find any matching results
              </Typography>
              <Typography textAlign="center" variant="subtitle2">
                for your search
              </Typography>
            </Stack>
            <Image
              style={styles.errorImage}
              resizeMode="contain"
              source={require('../../../../assets/images/chefs/oops.png')}
            />
          </Stack>
        ) : (
          chefs?.map(item => (
            <View key={item?.chef?.id} style={{position: 'relative'}}>
              <Stack style={styles.chef}>
                <Stack direction="row" gap={30} style={styles.header}>
                  {item?.chef?.time_to_cook && (
                    <Stack direction="row">
                      <Typography variant="body1">Ready in: </Typography>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {item?.chef?.time_to_cook}hrs
                      </Typography>
                    </Stack>
                  )}
                  {item?.chef?.delivery_available &&
                  item?.chef?.delivery_fee > 1 ? (
                    <Stack direction="row">
                      <Typography variant="body1">Delivery: </Typography>
                      <Typography variant={'subtitle1'} fontWeight="bold">
                        {item?.chef?.delivery_fee}
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography
                      Typography
                      variant={'subtitle1'}
                      fontWeight="bold">
                      Pick up Only
                    </Typography>
                  )}
                  <Stack direction="row" style={styles.rating}>
                    <Icon name="star" size={20} color={PRIMARY.main} />
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item?.chef?.rating}
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
          ))
        )}
      </Stack>
    </Container>
  );
}
