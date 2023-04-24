import React from 'react';

// react-native
import {Button as ReactNativeButton} from '@react-native-material/core';
// @mui
// layouts
// components
// sections

// ----------------------------------------------------------------------

export default function Button({title, onPress}) {
  return <ReactNativeButton title={title} onPress={onPress} />;
}
