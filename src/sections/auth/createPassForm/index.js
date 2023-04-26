import React from 'react';

// react-native
import {View, TextInput, StyleSheet} from 'react-native';
// @mui
// layouts
// components
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/button';
// sections

// ----------------------------------------------------------------------
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    width: '100%',
    gap: 40,
  },

  passwordInputGroup: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordInput: {
    flex: 1,
    padding: 0,
  },

  eyeIcon: {
    backgroundColor: 'white',
  },
});

// ----------------------------------------------------------------------

export default function CreatePassForm() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.passwordInputGroup}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Ionicons
          style={styles.eyeIcon}
          name="eye-outline"
          color="#939393"
          size={20}
        />
      </View>

      <View style={styles.passwordInputGroup}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={true}
        />
        <Ionicons
          style={styles.eyeIcon}
          name="eye-outline"
          color="#939393"
          size={20}
        />
      </View>

      <Button onPress={() => {}}>Reset Password</Button>
    </View>
  );
}
