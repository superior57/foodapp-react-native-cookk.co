import React from 'react';

// react-native
import {TouchableOpacity} from 'react-native';
// @mui
// theme
// layouts
// components
import Typography from '../typography';
// sections

// ----------------------------------------------------------------------

export default function Button({
  onPress,
  color = '#F5D37A',
  children,
  style,
  padding = 10,
  borderRadius = 10,
  width = 'auto',
  ...other
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: color,
        padding: padding,
        borderRadius: borderRadius,
        width: width,
        ...style,
      }}
      {...other}>
      <Typography color="white" variant="h6" style={{textAlign: 'center'}}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
}
