import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
// mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// screens
// components
// sections
import NavIcon from '../../../navigator/navIcon';
// theme
import {SECONDARY} from '../../../theme';
// routes
import {SCREEN_ROUTES} from '../../../routes/paths';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SECONDARY.main,
  },

  logo: {
    width: 110,
    height: 30,
  },
});

// ----------------------------------------------------------------------

export default function MainHeader() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN_ROUTES.home)}>
        <Image
          source={require('../../../assets/images/logo/logo_transperent.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
      <View display="flex" flexDirection="row" alignItems="center" gap={10}>
        <IconButton
          icon={
            <Icon
              name="shoppingcart"
              size={25}
              color="white"
              style={{transform: [{scaleX: -1}]}}
            />
          }
          onPress={() => navigation.navigate(SCREEN_ROUTES.cart)}
        />
        <NavIcon />
      </View>
    </View>
  );
}
