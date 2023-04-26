import React from 'react';

// react-native
import {View, StyleSheet, ScrollView, ImageBackground} from 'react-native';
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

  children: {
    marginTop: 20,
  },
});

// ----------------------------------------------------------------------

export default function AuthLayout({children}) {
  return (
    <View>
      <ImageBackground source={require('../../assets/images/auth_bg.png')}>
        <View style={styles.backdrop} />
        <ScrollView style={styles.content}>
          <Container>
            <AuthHeader />
            <View style={styles.children}>{children}</View>
          </Container>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
