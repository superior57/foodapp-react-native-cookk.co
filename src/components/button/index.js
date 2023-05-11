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
  disabled = false,
  isLoading = false,
  variant = 'contained',
  onPress,
  color = PRIMARY.main,
  children,
  style,
  sx,
  paddingHorizontal = 13,
  fontWeight = 'normal',
  paddingVertical = 10,
  borderRadius = 5,
  width = 'auto',
  ...other
}) {
  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        ...(variant === 'contained' && {backgroundColor: color}),
        ...(disabled && {opacity: 0.8}),
        ...(variant === 'outlined' && {borderColor: color, borderWidth: 1}),
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        borderRadius: borderRadius,
        width: width,
        ...sx,
      }}
      {...other}>
      {isLoading && (
        <ActivityIndicator color={variant === 'contained' ? 'white' : color} />
      )}
      <Text
        style={{
          fontWeight: fontWeight,
          fontSize: 16,
          color: 'white',
          textAlign: 'center',
          ...(variant === 'outlined' && {color: color}),
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}
