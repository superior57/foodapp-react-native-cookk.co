import React from 'react';

// react-native
import {View, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';
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

  image: {
    position: 'absolute',
    top: 0,
    height: Dimensions.get('window').height,
    width: '100%',
  },

  content: {
    height: '100%',
    width: '100%',
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  children: {
    marginTop: 50,
  },
});

// ----------------------------------------------------------------------

export default function AuthLayout({children}) {
  return (
    <View>
      <Image
        style={styles.image}
        source={require('../../assets/images/auth_bg.png')}
      />
      <View style={styles.backdrop} />
      <ScrollView style={styles.content}>
        <Container>
          <AuthHeader />
          <View style={styles.children}>{children}</View>
        </Container>
      </ScrollView>
    </View>
  );
}
