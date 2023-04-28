import React from 'react';

// react-native
import {View, StyleSheet} from 'react-native';
// @mui
// layouts
// components
// sections
import NavIcon from '../../../navigator/navIcon';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
  },
});

export default function AuthHeader() {
  return (
    <View style={styles.wrapper}>
      <NavIcon />
    </View>
  );
}
