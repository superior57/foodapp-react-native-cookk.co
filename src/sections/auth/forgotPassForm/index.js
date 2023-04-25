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

  input: {
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },

  button: {
    backgroundColor: '#F5D37A',
    padding: 15,
    width: 200,
    borderRadius: 10,
  },
});

// ----------------------------------------------------------------------

export default function ForgotPassForm() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TextInput style={styles.input} placeholder="Email address" />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreatePass')}>
        <Typography color="white" variant="h6" style={{textAlign: 'center'}}>
          Send
        </Typography>
      </TouchableOpacity>
    </View>
  );
}
