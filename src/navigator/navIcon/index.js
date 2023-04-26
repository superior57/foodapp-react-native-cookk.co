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
  },
});

// ----------------------------------------------------------------------

export default function NavIcon() {
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
          source={require('../../assets/images/drawer_white.png')}
          style={{width: 25, height: 25}}
        />
      </TouchableOpacity>
    </View>
  );
}
