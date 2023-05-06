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
    height: Dimensions.get('window').height,
    width: '100%',
  },

  backgroundImg: {
    height: Dimensions.get('window').height,
    width: '100%',
    position: 'absolute',
  },
});

// ----------------------------------------------------------------------

export default function AuthLayout({children}) {
  return (
    <View>
      <Image
        source={require('../../assets/images/auth/auth_bg.png')}
        style={styles.backgroundImg}
      />
      <View style={styles.backdrop} />
      <ScrollView>
        <AuthHeader />
        <Container>{children}</Container>
      </ScrollView>
    </View>
  );
}
