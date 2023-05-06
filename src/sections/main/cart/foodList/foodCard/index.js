import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

// react-native
import {StyleSheet} from 'react-native';
// mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Avatar from '../../../../../components/avatar';
import Typography from '../../../../../components/typography';
// sections
// routes
// redux
import {dispatch} from '../../../../../redux/store';
import {updateFoodCart} from '../../../../../redux/slices/food';
// theme
import {ERROR, PRIMARY} from '../../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
});

// ----------------------------------------------------------------------

export default function FoodCard({data}) {
  const deleteItem = () => {
    dispatch(updateFoodCart({data: data, actionType: 'delete'}));
  };

  return (
    <Stack direction="row" justify="between" gap={20} style={styles.wrapper}>
      <Stack direction="row" style={{alignItems: 'center'}} gap={20}>
        <Avatar image={data?.image_url} size={80} />
        <Stack>
          <Typography variant="subtitle1" fontWeight={600} sx={{width: 150}}>
            {data?.title}
          </Typography>
          <Typography color={PRIMARY.main} variant="subtitle2">
            {`$${data?.current_price} / ${data?.measurement || ''}`}
          </Typography>
          {data?.notes && (
            <Typography variant="body2">{data?.notes}</Typography>
          )}
        </Stack>
      </Stack>
      <Stack direction="row" gap={10} style={{alignItems: 'center'}}>
        <Typography>{data?.count}</Typography>
        <IconButton
          onPress={deleteItem}
          icon={<Icon name="trash" color={ERROR.main} size={16} />}
        />
      </Stack>
    </Stack>
  );
}
