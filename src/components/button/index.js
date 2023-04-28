import React from 'react';

// react-native
import {TouchableOpacity, Text, View, ActivityIndicator} from 'react-native';
// @mui
// theme
// layouts
// components
// sections
//theme
import {PRIMARY} from '../../theme';

// ----------------------------------------------------------------------

export default function Button({
  isLoading = false,
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
      disabled={isLoading}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        ...(isLoading && {opacity: 0.8}),
        ...(variant === 'contained' && {backgroundColor: color}),
        ...(variant === 'outlined' && {borderColor: color, borderWidth: 0.5}),
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        borderRadius: borderRadius,
        width: width,
        ...style,
      }}
      {...other}>
      {isLoading && (
        <ActivityIndicator color={variant === 'contained' ? 'white' : color} />
      )}
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
