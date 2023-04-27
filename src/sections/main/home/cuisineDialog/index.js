import React, {useEffect} from 'react';

// react-native
import {Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
// mui
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Button,
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
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  image: {
    width: 100,
    height: 50,
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
              <Image
                source={require('../../../../assets/images/home/vegetable.png')}
                style={styles.image}
                resizeMode="contain"
              />
              <Text>{item?.name}</Text>
            </TouchableOpacity>
            // <Button
            //   key={_i}
            //   onClick={async () => {
            //     dispatch(closeDialog());
            //   }}
            //   direction={'row'}
            //   sx={{width: '100%', justifyContent: 'left', px: {sm: 5}}}>
            //   <View
            //     style={{
            //       minWidth: 70,
            //       height: 70,
            //       marginRight: 3,
            //       borderRadius: '100%',
            //       overflow: 'hidden',
            //       position: 'relative',
            //     }}>
            //     <Image source={require(item?.image)} resizeMode="contain" />
            //   </View>
            //   <Typography variant="subtitle1" color={'black'}>
            //     {item?.name}
            //   </Typography>
            // </Button>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button title="Cancel" compact variant="text" onPress={close} />
      </DialogActions>
    </Dialog>
  );
}
