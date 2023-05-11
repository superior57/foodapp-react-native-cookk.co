import React from 'react';

// react-native
import {StyleSheet, Image} from 'react-native';
// mui
// layouts
// screens
// components
import Container from '../../../../components/container';
import Typography from '../../../../components/typography';
// sections
// routes
// theme
import {SECONDARY} from '../../../../theme';
import {Stack} from '@react-native-material/core';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 20,
  },

  card: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    padding: 20,
  },

  image: {
    height: 360,
    width: '100%',
  },
});

export default function HowItWork() {
  return (
    <Container>
      <Stack style={styles.wrapper}>
        <Typography
          color={SECONDARY.main}
          variant={'h4'}
          textAlign="center"
          fontWeight={600}>
          How it Works
        </Typography>
        <Stack style={styles.card}>
          <Image
            source={require('../../../../assets/images/home/how_it_works_1.jpg')}
            resizeMode="cover"
            style={styles.image}
          />
          <Typography variant={'h5'} textAlign="center" fontWeight={600}>
            1
          </Typography>
          <Typography variant={'h5'} textAlign="center" fontWeight={600}>
            Discover nearby chefs offering diverse cuisines
          </Typography>
        </Stack>
        <Stack style={styles.card}>
          <Image
            source={require('../../../../assets/images/home/how_it_works_2.jpg')}
            resizeMode="cover"
            style={styles.image}
          />
          <Typography variant={'h5'} textAlign="center" fontWeight={600}>
            2
          </Typography>
          <Typography variant={'h5'} textAlign="center" fontWeight={600}>
            Select your meals - whether fresh or frozen
          </Typography>
        </Stack>
        <Stack style={styles.card}>
          <Image
            source={require('../../../../assets/images/home/how_it_works_3.jpg')}
            resizeMode="cover"
            style={styles.image}
          />
          <Typography variant={'h5'} textAlign="center" fontWeight={600}>
            3
          </Typography>
          <Typography variant={'h5'} textAlign="center" fontWeight={600}>
            Sit back and relax - we'll deliver it to your door
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
}
