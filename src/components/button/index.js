import React from 'react';

// react-native
import {TouchableOpacity, Text} from 'react-native';
// @mui
// theme
// layouts
// components
// sections
//theme
import {PRIMARY} from '../../theme';

// ----------------------------------------------------------------------

export default function Button({
  variant = 'contained',
  onPress,
  color = PRIMARY.main,
  children,
  style,
  paddingHorizontal = 13,
  fontWeight = 'normal',
  paddingVertical = 13,
  borderRadius = 10,
  width = 'auto',
  ...other
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...(variant === 'contained' && {backgroundColor: color}),
        ...(variant === 'outlined' && {borderColor: color, borderWidth: 0.5}),
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        borderRadius: borderRadius,
        width: width,
        ...style,
      }}
      {...other}>
      <Text
        style={{
          fontWeight: fontWeight,
          color: 'white',
          textAlign: 'center',
          ...(variant === 'outlined' && {color: color}),
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
