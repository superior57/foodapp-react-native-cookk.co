import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
// mui
import {IconButton} from '@react-native-material/core';
// layouts
// screens
// components
import Avatar from '../../../components/avatar';
// sections
import NavIcon from '../../../navigator/navIcon';
// theme
import {SECONDARY} from '../../../theme';
// routes
import {SCREEN_ROUTES} from '../../../routes/paths';
// hook
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SECONDARY.main,
  },

  logo: {
    height: 50,
    width: 150,
  },
});

// ----------------------------------------------------------------------

export default function MainHeader() {
  const {user, isAuthenticated} = useAuth();
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.navigate(SCREEN_ROUTES.home)}>
        <Image
          source={require('../../../assets/images/logo/logo_transperent.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </TouchableOpacity>
      <View flexDirection="row" alignItems="center" gap={-10}>
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
        {isAuthenticated && user?.user && (
          <IconButton
            icon={
              <Avatar
                image={user?.image}
                firstName={user?.user?.first_name}
                lastName={user?.user?.last_name}
              />
            }
            onPress={() => navigation.navigate(SCREEN_ROUTES.cart)}
          />
        )}
        <NavIcon />
      </View>
    </View>
  );
}
