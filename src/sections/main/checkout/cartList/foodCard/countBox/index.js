import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {StyleSheet} from 'react-native';
// mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../../../components/typography';
// sections
// routes
// redux
// theme
import {GREY, PRIMARY, SECONDARY} from '../../../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: GREY[400],
    borderRadius: 50,
  },
});

// ----------------------------------------------------------------------

export default function CountBox({value = 0, onChange, loading}) {
  const handleChange = type => {
    onChange(type);
  };

  return (
    <Stack direction="row" gap={10} style={styles.wrapper}>
      <IconButton
        disabled={loading}
        onPress={() => handleChange('-')}
        icon={<Icon color={PRIMARY.main} size={25} name="minus" />}
      />
      <Typography color={SECONDARY.main} variant="subtitle1">
        {value}
      </Typography>
      <IconButton
        disabled={loading}
        onPress={() => handleChange('+')}
        icon={<Icon color={PRIMARY.main} size={25} name="plus" />}
      />
    </Stack>
  );
}
