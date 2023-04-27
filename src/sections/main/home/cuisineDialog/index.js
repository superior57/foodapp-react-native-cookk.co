import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
// import {SvgUri} from 'react-native-svg';

// react-native
import {Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
// mui
import {
  Dialog,
  DialogHeader,
  DialogContent,
  Stack,
} from '@react-native-material/core';
// redux
import {useDispatch, useSelector} from '../../../../redux/store';
import {closeDialog} from '../../../../redux/slices/dialog';
import {CITYCUISINE_SELECTOR, getCuisines} from '../../../../redux/slices/city';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
// sections
// routes
// theme

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
  const dispatch = useDispatch();

  const {cuisines} = useSelector(CITYCUISINE_SELECTOR);

  useEffect(() => {
    dispatch(getCuisines());
  }, [dispatch]);

  const close = () => {
    dispatch(closeDialog());
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
          {cuisines?.map((item, _i) => (
            <TouchableOpacity
              key={_i}
              onPress={close}
              style={styles.cuisineItem}>
              {/* <SvgUri width={250} height={250} uri={item?.image} /> */}
              <Image
                source={{
                  uri: item?.image,
                }}
                style={styles.image}
              />
              <Text>{item?.name}</Text>
            </TouchableOpacity>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
