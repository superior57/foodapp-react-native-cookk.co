import React from 'react';

// react-native
// @mui
import {Text} from '@react-native-material/core';
// layouts
// components
// sections

// ----------------------------------------------------------------------

export default function Typography({
  children,
  color,
  variant,
  fontWeight,
  style,
  ...other
}) {
  return (
    <Text variant={variant} color={color} style={{...style}} {...other}>
      {children}
    </Text>
  );
}
