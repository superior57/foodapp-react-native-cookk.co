import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// react-native
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
// mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../components/typography';
// sections
// theme
import {PRIMARY, SECONDARY, GREY} from '../../../theme';
// routes
import {SCREEN_ROUTES} from '../../../routes/paths';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 0,
  },

  content: {
    padding: 30,
    width: '100%',
    alignItems: 'center',
    backgroundColor: SECONDARY.main,
    gap: 20,
  },

  logo: {
    height: 50,
  },

  IconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 100,
    width: 40,
    height: 40,
  },

  end: {
    width: '100%',
    padding: 10,
    backgroundColor: GREY[100],
  },
});

export default function MainFooter() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <Stack style={styles.content}>
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREEN_ROUTES.home)}>
          <Image
            source={require('../../../assets/images/logo/logo_transperent.png')}
            resizeMode="contain"
            style={styles.logo}
          />
        </TouchableOpacity>
        <Typography color={PRIMARY.main} variant={'body2'}>
          +1929-928-5292
        </Typography>
        <Stack direction="row" gap={10}>
          <IconButton
            icon={
              <Stack style={styles.IconButton}>
                <Icon name="twitter" size={20} color="white" />
              </Stack>
            }
          />
          <IconButton
            icon={
              <Stack style={styles.IconButton}>
                <Icon name="instagram" size={20} color="white" />
              </Stack>
            }
          />
          <IconButton
            icon={
              <Stack style={styles.IconButton}>
                <Icon name="facebook-f" size={20} color="white" />
              </Stack>
            }
          />
        </Stack>
      </Stack>
      <View style={styles.end}>
        <Typography textAlign="center" color={GREY[600]} variant={'body2'}>
          @2023 Asian, All rights reserved
        </Typography>
      </View>
    </View>
  );
}
