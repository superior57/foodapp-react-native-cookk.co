import React from 'react';
import {useNavigation} from '@react-navigation/native';

// react-native
import {View, TextInput, StyleSheet} from 'react-native';
// @mui
// layouts
// components
import Button from '../../../components/button';
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

  input: {
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
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

  link: {
    fontSize: 18,
    color: 'white',
    textDecorationLine: 'underline',
    width: 150,
  },
});

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TextInput style={styles.input} placeholder="Email address" />

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

      <Typography
        style={styles.link}
        onPress={() => navigation.navigate('ForgotPass')}>
        Forgot password
      </Typography>

      <Button onPress={() => navigation.navigate('Register')}>Continue</Button>
    </View>
  );
}
