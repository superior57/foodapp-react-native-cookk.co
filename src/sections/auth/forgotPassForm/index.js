import React from 'react';
import {useNavigation} from '@react-navigation/native';

// react-native
import {View, TextInput, StyleSheet} from 'react-native';
// @mui
// layouts
// components
import Button from '../../../components/button';
import {AUTH_ROUTES} from '../../../routes/paths';
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
});

// ----------------------------------------------------------------------

export default function ForgotPassForm() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TextInput style={styles.input} placeholder="Email address" />

      <Button onPress={() => navigation.navigate(AUTH_ROUTES.createPass)}>
        Send
      </Button>
    </View>
  );
}
