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
import {Tip, closeTip, showTip} from 'react-native-tip';
import {Divider} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Avatar from '../../../components/avatar';
import Typography from '../../../components/typography';
// sections
import NavIcon from '../../../navigator/navIcon';
// theme
import {GREY, SECONDARY} from '../../../theme';
// routes
import {DASHBOARD_ROUTES, SCREEN_ROUTES} from '../../../routes/paths';
// redux
import {dispatch} from '../../../redux/store';
import {updateFoodCart} from '../../../redux/slices/food';
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

  popover: {
    paddingVertical: 20,
  },

  popoverItem: {
    paddingHorizontal: 20,
  },

  optionStyle: {
    optionsContainer: {
      marginTop: 50,
    },
  },
});

// ----------------------------------------------------------------------

export default function MainHeader() {
  const {user: userInfo, isAuthenticated, logout} = useAuth();
  const {user} = userInfo ?? {};
  const navigation = useNavigation();

  const handleLogout = () => {
    try {
      dispatch(updateFoodCart({actionType: 'clear'}));
      logout();
      closeTip();
      navigation.navigate(SCREEN_ROUTES.home);
    } catch (error) {
      console.error(error);
    }
  };

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
        {isAuthenticated && user && (
          <>
            <Tip
              id="popover"
              body={
                <>
                  <Stack style={styles.popover} gap={20}>
                    <Stack gap={10} style={styles.popoverItem}>
                      <Typography fontWeight="bold">
                        {user?.first_name} {user?.last_name}
                      </Typography>
                      <Typography numberOfLines={1} color={GREY[600]}>
                        {user?.email}
                      </Typography>
                    </Stack>
                    <Divider />
                    <TouchableOpacity
                      style={styles.popoverItem}
                      onPress={() => {
                        closeTip();
                        navigation.navigate(DASHBOARD_ROUTES.profile);
                      }}>
                      <Typography>Profile</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.popoverItem}
                      onPress={() => {
                        closeTip();
                        navigation.navigate(DASHBOARD_ROUTES.payments);
                      }}>
                      <Typography>Payments</Typography>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.popoverItem}
                      onPress={() => {
                        closeTip();
                        navigation.navigate(DASHBOARD_ROUTES.orders);
                      }}>
                      <Typography>Orders</Typography>
                    </TouchableOpacity>
                    <Divider />
                    <TouchableOpacity
                      style={styles.popoverItem}
                      onPress={handleLogout}>
                      <Typography>Logout</Typography>
                    </TouchableOpacity>
                  </Stack>
                </>
              }
              showItemPulseAnimation
              pulseColor="#ff8080"
              active={false}>
              <TouchableOpacity onPress={() => showTip('popover')}>
                <Avatar
                  size={45}
                  image={userInfo?.image}
                  firstName={user?.first_name}
                  lastName={user?.last_name}
                />
              </TouchableOpacity>
            </Tip>
          </>
        )}
      </View>
    </View>
  );
}
