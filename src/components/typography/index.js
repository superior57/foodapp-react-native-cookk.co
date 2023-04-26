import React from 'react';

// react-native
// @mui
import {Text} from '@react-native-material/core';
// layouts
// components
// sections

// ----------------------------------------------------------------------

export default function Typography({
  textAlign = 'left',
  children,
  color,
  variant,
  fontWeight,
  style,
  ...other
}) {
  return (
    <Text
      variant={variant}
      color={color}
      style={{fontWeight: fontWeight, textAlign: textAlign, ...style}}
      {...other}>
      {children}
    </Text>
  );
}
