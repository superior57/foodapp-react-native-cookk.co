import React from 'react';

// react-native
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Dimensions,
} from 'react-native';
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
      <ImageBackground
        source={require('../../assets/images/auth/auth_bg.png')}
        style={{height: Dimensions.get('window').height}}>
        <View style={styles.backdrop} />
        <ScrollView style={styles.content}>
          <AuthHeader />
          <Container>{children}</Container>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}
