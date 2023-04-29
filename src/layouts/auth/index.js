import React from 'react';

// react-native
import {View, StyleSheet, ScrollView, Image, Dimensions} from 'react-native';
// @mui
// layouts
// components
import Container from '../../components/container';
// sections
import AuthHeader from '../../layouts/auth/authHeader';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.5,
    height: '100%',
    width: '100%',
  },

  content: {
    height: '100%',
    width: '100%',
  },
});

// ----------------------------------------------------------------------

export default function AuthLayout({children}) {
  return (
    <View>
      <Image
        source={require('../../assets/images/auth/auth_bg.png')}
        style={{
          height: Dimensions.get('window').height,
          width: '100%',
          position: 'absolute',
        }}
      />
      <ScrollView style={styles.content}>
        <View style={styles.backdrop} />
        <AuthHeader />
        <Container>{children}</Container>
      </ScrollView>
    </View>
  );
}
