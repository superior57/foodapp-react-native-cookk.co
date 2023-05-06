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
    padding: 10,
    width: '100%',
  },
});

export default function AuthHeader() {
  return (
    <View style={styles.wrapper}>
      <NavIcon />
    </View>
  );
}
