import React, {useEffect} from 'react';

// react-native
import {View, Image, StyleSheet} from 'react-native';
// mui
import {
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
} from '@react-native-material/core';
// redux
import {useDispatch, useSelector} from '../../../../redux/store';
import {closeDialog} from '../../../../redux/slices/dialog';
import {CITYCUISINE_SELECTOR, getCuisines} from '../../../../redux/slices/city';
import Typography from '../../../../components/typography';
// layouts
// screens
// components
// sections
// routes
// theme

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
      <DialogContent>
        <Typography>
          With our diverse range of cuisines, there's something for everyone to
          enjoy.
        </Typography>
        {cuisines?.map((item, _i) => (
          <Typography key={_i}>{item?.name}</Typography>
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
      </DialogContent>
      <DialogActions>
        <Button title="Cancel" compact variant="text" onPress={close} />
        <Button title="Ok" compact variant="text" onPress={close} />
      </DialogActions>
    </Dialog>
  );
}
