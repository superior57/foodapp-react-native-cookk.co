import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

// react-native
import {TouchableOpacity, StyleSheet, Linking} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Avatar from '../../../../components/avatar';
import Typography from '../../../../components/typography';
// sections
// routes
import {SCREEN_ROUTES} from '../../../../routes/paths';
// redux
import {useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR} from '../../../../redux/slices/city';
// theme
import {PRIMARY} from '../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    gap: 20,
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
});

// ----------------------------------------------------------------------

export default function ChefHeader() {
  const navigation = useNavigation();
  const {
    chef: {chef},
    cuisine,
  } = useSelector(CITYCUISINE_SELECTOR);

  return (
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
          <Typography variant="subtitle1" fontWeight="bold">
            {chef?.company_name}
          </Typography>
          <Stack direction="row" gap={30}>
            <Typography variant={'subtitle2'} fontWeight={600}>
              by {chef?.first_name} {chef?.last_name}
            </Typography>
            <Typography variant={'subtitle2'} fontWeight={600}>
              Zip code: {chef?.primary_address?.zip}
            </Typography>
          </Stack>
          <Stack direction="row" gap={30}>
            <Typography variant={'subtitle2'}>{cuisine?.name}</Typography>
            <Typography variant={'subtitle2'}>
              Rating: {chef?.rating}
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
    </Stack>
  );
}
