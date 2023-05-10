import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {TouchableOpacity, StyleSheet} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../../../components/typography';
// sections
// routes
// redux
import {useSelector} from '../../../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../../../redux/slices/food';
// theme
import {GREY, PRIMARY, SECONDARY} from '../../../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: GREY[400],
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 5,
    minWidth: 100,
  },
});

// ----------------------------------------------------------------------

export default function CountBox({
  value = 0,
  minOrder = 1,
  onChange,
  foodId,
  loading,
}) {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;
  const handleChange = type => {
    onChange(type);
  };

  return (
    <Stack direction="row" style={styles.wrapper} gap={10}>
      <TouchableOpacity
        onPress={() => handleChange('-')}
        disabled={
          value <= (cart?.find(item => item?.id === foodId) ? 1 : minOrder) ||
          loading
            ? true
            : false
        }
        style={{
          opacity:
            value <= (cart?.find(item => item?.id === foodId) ? 1 : minOrder)
              ? 0.5
              : 1,
        }}>
        <Icon name="minus" size={18} color={PRIMARY.main} />
      </TouchableOpacity>
      <Typography variant="subtitle1" color={SECONDARY.main}>
        {value}
      </Typography>
      <TouchableOpacity disabled={loading} onPress={() => handleChange('+')}>
        <Icon name="plus" size={18} color={PRIMARY.main} />
      </TouchableOpacity>
    </Stack>
  );
}
