import React from 'react';

// react-native
// @mui
import {Text} from '@react-native-material/core';
// layouts
// components
// sections
// theme
import {GREY} from '../../theme';

// ----------------------------------------------------------------------

export default function Typography({
  textAlign = 'left',
  fontWeight = 'normal',
  color = GREY[800],
  variant = 'body2',
  sx = {},
  children,
  other,
}) {
  return (
    <Text
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
