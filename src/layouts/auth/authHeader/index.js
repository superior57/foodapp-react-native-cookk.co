import React from 'react';
import {useNavigation} from '@react-navigation/native';

// react-native
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
// @mui
// layouts
// components
// sections

// ----------------------------------------------------------------------
const styles = StyleSheet.create({
  listIcon: {
    color: 'white',
    position: 'absolute',
    top: 20,
    right: 20,
  },
});

// ----------------------------------------------------------------------

export default function AuthHeader() {
  const navigation = useNavigation();
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    navigation.toggleDrawer();
  };
  return (
    <View style={styles.listIcon}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 30, height: 30}}
        />
      </TouchableOpacity>
    </View>
  );
}
