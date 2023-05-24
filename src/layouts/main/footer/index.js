import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// react-native
import {View, StyleSheet, TouchableOpacity, Image, Linking} from 'react-native';
// mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../components/typography';
// sections
import PolicyDialog from '../../../sections/main/footer/policyDialog';
import ServiceDialog from '../../../sections/main/footer/serviceDialog';
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
    width: 200,
  },

  iconButton: {
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
  const [policyDialogIsOpen, setPolicyDialogIsOpen] = useState(false);
  const [serviceDialogIsOpen, setServiceDialogIsOpen] = useState(false);

  return (
    <>
      <PolicyDialog
        visible={policyDialogIsOpen}
        onDismiss={() => setPolicyDialogIsOpen(false)}
      />
      <ServiceDialog
        visible={serviceDialogIsOpen}
        onDismiss={() => setServiceDialogIsOpen(false)}
      />
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
                <Stack style={styles.iconButton}>
                  <Icon name="twitter" size={20} color="white" />
                </Stack>
              }
            />
            <IconButton
              onPress={() => Linking.openURL('https://instagram.com/cookk.co')}
              icon={
                <Stack style={styles.iconButton}>
                  <Icon name="instagram" size={20} color="white" />
                </Stack>
              }
            />
            <IconButton
              icon={
                <Stack style={styles.iconButton}>
                  <Icon name="facebook-f" size={20} color="white" />
                </Stack>
              }
            />
          </Stack>
          <Stack direction="row" gap={20}>
            <TouchableOpacity>
              <Typography color={'white'}>© Cookk 2023</Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPolicyDialogIsOpen(true)}>
              <Typography color={'white'}>Privacy Policy</Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setServiceDialogIsOpen(true)}>
              <Typography color={'white'}>Terms of Service</Typography>
            </TouchableOpacity>
          </Stack>
        </Stack>
        <View style={styles.end}>
          <Typography textAlign="center" color={GREY[600]} variant={'body2'}>
            @2023 Asian, All rights reserved
          </Typography>
        </View>
      </View>
    </>
  );
}
