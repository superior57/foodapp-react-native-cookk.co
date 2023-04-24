import React from 'react';
// react-native
import {View} from 'react-native';
// @mui
// layouts
// components
// sections

// ----------------------------------------------------------------------
export default function Container({children}) {
  return (
    <View style={{width: '100%', padding: 20, position: 'relative'}}>
      {children}
    </View>
  );
}
