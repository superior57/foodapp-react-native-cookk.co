import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {View, StyleSheet} from 'react-native';
import Typography from '../../../../components/typography';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
// sections
// routes
// theme
import {GREY, PRIMARY} from '../../../../theme';
// redux
import {useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR} from '../../../../redux/slices/city';
import Avatar from '../../../../components/avatar';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
    gap: 10,
  },

  chef: {
    borderWidth: 1,
    borderRadius: 10,
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
    gap: 20,
  },
});

// ----------------------------------------------------------------------

export default function ChooseChef() {
  const [currentPage, setCurrentPage] = useState(1);
  const {cities, cusiine, chefs, error} = useSelector(CITYCUISINE_SELECTOR);
  const city = cities[0];

  return (
    <View style={styles.wrapper}>
      <Typography
        variant="subtitle1"
        fontWeight="bold">{`${city?.name} Chefs`}</Typography>
      {chefs?.map(item => (
        <Stack key={item?.chef?.id} style={styles.chef}>
          <Stack direction="row" style={styles.header}>
            <Stack direction="row" style={styles.rating}>
              <Typography
                display={'flex'}
                flexWrap={'nowrap'}
                gap={1}
                variant="subtitle1">
                Rating: {item?.chef?.rating}
              </Typography>
              <Icon name="star" size={20} color={PRIMARY.main} />
            </Stack>
            <Typography
              variant="subtitle1"
              display={'flex'}
              flexWrap={'nowrap'}>
              Orders: {item?.chef?.orders}
            </Typography>
          </Stack>
          <Stack direction="row" style={styles.body}>
            <Avatar
              size={100}
              image={item?.chef?.image_url}
              firstName={item?.chef?.first_name}
              lastName={item?.chef?.last_name}
            />
            <Stack gap={10} justify="center">
              <Typography variant="subtitle1">
                {item?.chef?.company_name}
              </Typography>
              <Typography variant="caption">
                by {item?.chef?.first_name} {item?.chef?.last_name}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </View>
  );
}
