import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {TouchableOpacity, StyleSheet} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../../../../components/typography';
// sections
// routes
// redux
import {useSelector} from '../../../../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../../../../redux/slices/food';
// theme
import {PRIMARY, SECONDARY} from '../../../../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    borderWidth: 0.5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
  },
});

// ----------------------------------------------------------------------

export default function CartCountBox({
  value = 0,
  minOrder = 1,
  onChange,
  foodId,
}) {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;
  let newValue = value;

  const handleChange = type => {
    if (type === '+') {
      newValue++;
    } else {
      newValue--;
    }
    onChange(newValue);
  };

  return (
    <Stack direction="row" style={styles.wrapper} gap={10}>
      <TouchableOpacity
        onPress={() => handleChange('-')}
        disabled={
          value <= (cart?.find(item => item?.id === foodId) ? 1 : minOrder)
            ? true
            : false
        }
        style={{
          opacity:
            value <= (cart?.find(item => item?.id === foodId) ? 1 : minOrder)
              ? 0.7
              : 1,
        }}>
        <Icon name="minus" color={PRIMARY.main} />
      </TouchableOpacity>
      <Typography color={SECONDARY.main}>{value}</Typography>
      <TouchableOpacity onPress={() => handleChange('+')}>
        <Icon name="plus" color={PRIMARY.main} />
      </TouchableOpacity>
    </Stack>
  );
}
