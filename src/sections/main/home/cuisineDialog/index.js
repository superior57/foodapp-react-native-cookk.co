import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Divider} from 'react-native-paper';
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
    right: 10,
    top: 10,
    zIndex: 99999,
  },
});

// ----------------------------------------------------------------------

export default function CuisineDialog({isOpen}) {
  const navigation = useNavigation();
  const {cuisines} = useSelector(CITYCUISINE_SELECTOR);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      setIsLoading(true);
      await dispatch(getCuisines());
      setIsLoading(false);
    }

    if (cuisines.length === 0) {
      fetch();
    }
  }, []);

  const close = async () => {
    dispatch(closeDialog());
  };

  const onSubmit = async cuisineId => {
    navigation.navigate(SCREEN_ROUTES.chefs);
    dispatch(getCuisine(cuisineId));
    close();
  };

  return (
    <Dialog visible={isOpen} onDismiss={() => close()}>
      <TouchableOpacity onPress={() => close()} style={styles.closeButton}>
        <Icon name="close" size={20} />
      </TouchableOpacity>
      <ScrollView style={{height: 500, position: 'relative'}}>
        <DialogHeader title="Select cuisine" />
        <DialogContent>
          <Stack gap={10}>
            <Typography>
              With our diverse range of cuisines, there's something for everyone
              to enjoy.
            </Typography>
            <Stack style={styles.content}>
              {isLoading ? (
                <ActivityIndicator size="large" color={PRIMARY.main} />
              ) : (
                [
                  cuisines?.find(item => item?.id === 7),
                  ...(cuisines?.filter(item => item?.id !== 7) || []),
                ]?.map(
                  (item, _i) =>
                    item && (
                      <Stack key={item?.id} gap={20}>
                        {_i === 1 && <Divider />}
                        <TouchableOpacity
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
                      </Stack>
                    ),
                )
              )}
            </Stack>
          </Stack>
        </DialogContent>
      </ScrollView>
    </Dialog>
  );
}
