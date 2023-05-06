import React from 'react';
import {useNavigation} from '@react-navigation/native';

// react-native
import {
  Dimensions,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
// mui
import {IconButton, Stack} from '@react-native-material/core';
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
// redux

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: SECONDARY.main,
  },

  logoWrapper: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
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
      <Stack style={styles.logoWrapper}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_ROUTES.home)}
          style={{width: 150}}>
          <Image
            source={require('../../../assets/images/logo/logo_transperent.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </TouchableOpacity>
      </Stack>
      <NavIcon />
      <View flexDirection="row" alignItems="center">
        {isAuthenticated && user?.user && (
          <TouchableOpacity>
            <Avatar
              size={50}
              image={user?.image}
              firstName={user?.user?.first_name}
              lastName={user?.user?.last_name}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
