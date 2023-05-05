import React from 'react';
import {useNavigation} from '@react-navigation/native';

// react-native
import {StyleSheet, View, Image} from 'react-native';
import {IconButton} from '@react-native-material/core';
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
      <IconButton
        onPress={() => toggleDrawer()}
        icon={
          <Image
            source={require('../../assets/images/drawer/drawer_white.png')}
            style={{width: 25, height: 25}}
          />
        }
      />
    </View>
  );
}
