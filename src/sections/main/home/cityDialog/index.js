import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
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
  getCities,
  getCuisines,
} from '../../../../redux/slices/city';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
// sections
// routes
import {SCREEN_ROUTES} from '../../../../routes/paths';
// theme
import {PRIMARY} from '../../../../theme';

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
    right: 10,
    top: 10,
    zIndex: 99999,
  },
});

// ----------------------------------------------------------------------

export default function CityDialog({isOpen}) {
  const navigation = useNavigation();
  const {cities} = useSelector(CITYCUISINE_SELECTOR);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      await dispatch(getCities());
      setIsLoading(false);
    }

    if (cities.length === 0) {
      fetch();
    }
  }, []);

  const close = async () => {
    dispatch(closeDialog());
  };

  const onSubmit = async cityId => {
    await dispatch(getCuisines(cityId));
    navigation.navigate(SCREEN_ROUTES.chefs);
    dispatch(closeDialog());
    close();
  };

  return (
    <Dialog visible={isOpen} onDismiss={() => close()}>
      <TouchableOpacity onPress={() => close()} style={styles.closeButton}>
        <Icon name="close" size={20} />
      </TouchableOpacity>
      <ScrollView style={{maxHeight: 500, position: 'relative'}}>
        <DialogHeader title="Select a city" />
        <DialogContent>
          <Stack gap={10}>
            <Typography>
              Explore our selection of cities, each offering a unique culinary
              experience that caters to every taste
            </Typography>
            <Stack style={styles.content}>
              {isLoading ? (
                <ActivityIndicator size="large" color={PRIMARY.main} />
              ) : (
                cities?.map((item, _i) => (
                  <TouchableOpacity key={_i} onPress={() => onSubmit(item.id)}>
                    <Typography variant="subtitle1">{item.name}</Typography>
                  </TouchableOpacity>
                ))
              )}
            </Stack>
          </Stack>
        </DialogContent>
      </ScrollView>
    </Dialog>
  );
}
