import React from 'react';

// react-native
import {StyleSheet, View} from 'react-native';
// @mui
// layouts
// components
import Foundation from 'react-native-vector-icons/Foundation';
// sections

// ----------------------------------------------------------------------
const styles = StyleSheet.create({
  listIcon: {
    color: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
  },
});

// ----------------------------------------------------------------------

export default function AuthHeader() {
  return (
    <View>
      <Foundation style={styles.listIcon} name="list" size={40} />
    </View>
  );
}
