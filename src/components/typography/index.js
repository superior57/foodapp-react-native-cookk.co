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
  fontWeight = 'normal',
  color = 'black',
  variant = 'body2',
  onPress = () => {},
  sx = {},
  children,
  other,
}) {
  return (
    <Text
      onPress={onPress}
      variant={variant}
      color={color}
      style={{
        fontWeight: fontWeight,
        textAlign: textAlign,
        ...sx,
      }}
      {...other}>
      {children}
    </Text>
  );
}
