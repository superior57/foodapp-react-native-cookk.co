import React from 'react';

// react-native
import {StyleSheet} from 'react-native';
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
    top: 20,
    right: 20,
  },
});

// ----------------------------------------------------------------------

export default function AuthHeader() {
  return (
    <Foundation style={styles.listIcon} name="list" color="939393" size={40} />
  );
}
