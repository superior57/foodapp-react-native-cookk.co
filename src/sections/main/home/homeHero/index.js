import React from 'react';

// react-native
import {StyleSheet, View, Image} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Container from '../../../../components/container';
import Typography from '../../../../components/typography';
// sections
// routes
// theme
import {SECONDARY} from '../../../../theme';
import Button from '../../../../components/button';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: SECONDARY.main,
    paddingVertical: 40,
  },

  content: {
    alignItems: 'center',
    gap: 40,
  },

  footer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  vegetable: {
    width: 150,
    height: 90,
  },

  delicious: {
    width: 90,
    height: 30,
  },
});

export default function HomeHero() {
  return (
    <View style={styles.wrapper}>
      <Container>
        <Stack style={styles.content}>
          <Typography variant={'h5'} color={'white'} textAlign="center">
            Delicious homemade food delivered to your door
          </Typography>
          <View>
            <Button style={{borderRadius: 100}} width={230}>
              Find Home Chefs
            </Button>
          </View>
          <Stack direction="row" style={styles.footer}>
            <Image
              source={require('../../../../assets/images/home/delicious.png')}
              style={styles.delicious}
            />
            <Image
              source={require('../../../../assets/images/home/vegetable.png')}
              style={styles.vegetable}
            />
          </Stack>
        </Stack>
      </Container>
    </View>
  );
}
