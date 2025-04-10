import React from 'react';

// react-native
import {View, StyleSheet, Dimensions, ScrollView} from 'react-native';
// layouts
import MainHeader from './../main/header';
import MainFooter from './../main/footer';
// mui
// screens
// components
// sections

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    height: Dimensions.get('window').height,
    flexDirection: 'column',
    flex: 1,
  },

  scrollView: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
  },
});

export default function DashboardLayout({children}) {
  return (
    <View style={styles.wrapper}>
      <MainHeader />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.content}>{children}</View>
        <MainFooter />
      </ScrollView>
    </View>
  );
}
