import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// mui
import {
  Dialog,
  DialogHeader,
  DialogContent,
  Stack,
} from '@react-native-material/core';
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {closeDialog} from '../../../../redux/slices/dialog';
import {
  CITYCUISINE_SELECTOR,
  getCuisines,
  getCuisine,
  getCity,
} from '../../../../redux/slices/city';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
// sections
// routes
// theme
import {PRIMARY} from '../../../../theme';
import {SCREEN_ROUTES} from '../../../../routes/paths';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  content: {
    gap: 20,
    marginTop: 10,
    padding: 5,
  },

  cuisineItem: {
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },

  closeButton: {
    position: 'absolute',
    right: -10,
    top: -50,
  },
});

// ----------------------------------------------------------------------

export default function CuisineDialog({isOpen}) {
  const navigation = useNavigation();
  const {cuisines, cities} = useSelector(CITYCUISINE_SELECTOR);
  const [isLoading, setIsLoading] = useState(false);
  const cityId = cities?.[0]?.id;

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      await dispatch(getCuisines());
      await dispatch(getCity(cityId));
      setIsLoading(false);
    }

    if (cityId) {
      fetch();
    }
  }, [cityId]);

  const close = async () => {
    dispatch(closeDialog());
  };

  const onSubmit = async cuisineId => {
    navigation.navigate(SCREEN_ROUTES.chefs);
    dispatch(getCuisine(cuisineId));
    close();
  };

  return (
    <Dialog visible={isOpen} onDismiss={close}>
      <DialogHeader title="Select cuisine" />
      <DialogContent style={styles.content}>
        <TouchableOpacity onPress={close}>
          <Icon name="close" size={20} style={styles.closeButton} />
        </TouchableOpacity>
        <Typography>
          With our diverse range of cuisines, there's something for everyone to
          enjoy.
        </Typography>
        <Stack style={styles.content}>
          {isLoading ? (
            <ActivityIndicator size="large" color={PRIMARY.main} />
          ) : (
            [
              cuisines?.find(item => item?.name === 'Explore All'),
              ...(cuisines?.filter(item => item?.name !== 'Explore All') || []),
            ]?.map((item, _i) => (
              <TouchableOpacity
                isLoading
                key={_i}
                onPress={() => onSubmit(item?.id)}
                style={styles.cuisineItem}>
                <Image
                  source={{
                    uri: item?.image,
                  }}
                  style={styles.image}
                />
                <Text>{item?.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
