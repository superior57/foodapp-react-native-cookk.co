import React from 'react';
import {useNavigation} from '@react-navigation/native';

// react-native
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
// @mui
// layouts
// components
import Typography from '../../../components/typography';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

  button: {
    backgroundColor: '#F5D37A',
    padding: 15,
    width: 240,
    borderRadius: 10,
  },
});

// ----------------------------------------------------------------------

export default function CreatePassForm() {
  const navigation = useNavigation();

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

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Typography color="white" variant="h6" style={{textAlign: 'center'}}>
          Reset Password
        </Typography>
      </TouchableOpacity>
    </View>
  );
}
