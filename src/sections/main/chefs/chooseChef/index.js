import React from 'react';

// react-native
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Container from '../../../../components/container';
import Typography from '../../../../components/typography';
// sections
// routes
import {SCREEN_ROUTES} from '../../../../routes/paths';
// theme
import {GREY} from '../../../../theme';
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR, getChef} from '../../../../redux/slices/city';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 30,
  },

  chefImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },

  rating: {
    backgroundColor: GREY[300],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
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

export default function ChooseChef({chefs, searchIsLoading}) {
  const navigation = useNavigation();
  const {city} = useSelector(CITYCUISINE_SELECTOR);

  const chooseChef = chefId => {
    navigation.navigate(SCREEN_ROUTES.singleChef);
    dispatch(getChef(chefId));
  };

  return (
    <Container style={styles.wrapper}>
      <Stack gap={30}>
        <Typography variant="h5" color="black" fontWeight={900}>
          {city?.name}
          {city?.state && `, ${city?.state}`}
        </Typography>
        {searchIsLoading ? (
          <Stack style={{paddingVertical: 60}}>
            <ActivityIndicator size={30} />
          </Stack>
        ) : chefs?.length === 0 ? (
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
              <TouchableOpacity
                onPress={() => {
                  if (item?.chef?.can_sell) {
                    chooseChef(item?.chef?.id);
                  }
                }}>
                <Image
                  style={styles.chefImage}
                  resizeMode="cover"
                  source={{uri: item?.chef?.image_url}}
                />
                <Stack pt={20} pl={10} pr={10} gap={10}>
                  <Stack direction="row" justify="between">
                    <Typography
                      variant="h6"
                      color="black"
                      numberOfLines={1}
                      fontWeight="bold">
                      {item?.chef?.company_name}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      sx={styles.rating}>
                      {item?.chef?.rating}
                    </Typography>
                  </Stack>
                  <Typography variant="body1">
                    {item?.chef?.delivery_available &&
                    item?.chef?.delivery_fee > 1
                      ? `Delivery:  $${item?.chef?.delivery_fee ?? 4.99}`
                      : 'Pick up Only'}
                    {item?.chef?.time_to_cook &&
                      ` * Schedule ${item?.chef?.time_to_cook} ${
                        item?.chef?.time_to_cook == 1 ? 'hr' : 'hrs'
                      } ahead`}
                  </Typography>
                </Stack>
              </TouchableOpacity>
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
