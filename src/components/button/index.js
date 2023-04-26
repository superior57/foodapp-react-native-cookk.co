import React from 'react';

// react-native
import {TouchableOpacity} from 'react-native';
// @mui
// theme
// layouts
// components
import Typography from '../typography';
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
  padding = 13,
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
        padding: padding,
        borderRadius: borderRadius,
        width: width,
        ...style,
      }}
      {...other}>
      <Typography
        color="white"
        style={{
          textAlign: 'center',
          ...(variant === 'outlined' && {color: color}),
        }}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
}
