import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// react-native
import {StyleSheet, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// @mui
import {Avatar, Badge} from '@react-native-material/core';
// layouts
// components
// sections
// redux
import {useSelector} from '../../redux/store';
import {FOOD_SELECTOR} from '../../redux/slices/food';
// theme

// ----------------------------------------------------------------------
const styles = StyleSheet.create({
  listIcon: {
    color: 'white',
    position: 'relative',
  },

  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
  },
});

// ----------------------------------------------------------------------

export default function NavIcon() {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;
  const [cartCount, setCartCount] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    setCartCount(
      cart?.reduce(
        (total, currentValue) => total + (currentValue?.count ?? 0),
        0,
      ),
    );
  }, [cart]);

  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <TouchableOpacity onPress={() => toggleDrawer()} style={styles.listIcon}>
      <Badge label={cartCount} style={styles.badge} color="error" />
      <Avatar
        color="rgba(0,0,0,0)"
        size={50}
        icon={
          <Image
            source={require('../../assets/images/drawer/drawer_white.png')}
            style={{width: 25, height: 25}}
          />
        }
      />
    </TouchableOpacity>
  );
}
