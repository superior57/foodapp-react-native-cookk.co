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
// redux
import {useDispatch} from '../../../../redux/store';
import {openDialog} from '../../../../redux/slices/dialog';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: SECONDARY.main,
    paddingVertical: 50,
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
    width: 220,
  },

  delicious: {
    width: 100,
  },
});

export default function HomeHero() {
  const dispatch = useDispatch();

  return (
    <View style={styles.wrapper}>
      <Container>
        <Stack style={styles.content}>
          <View paddingVertical={40}>
            <Typography
              variant={'h4'}
              color={'white'}
              textAlign="center"
              fontWeight="bold">
              Taste homemade
            </Typography>
            <Typography
              variant={'h4'}
              color={'white'}
              textAlign="center"
              fontWeight="bold">
              cooking from your
            </Typography>
            <Typography
              variant={'h4'}
              color={'white'}
              textAlign="center"
              fontWeight="bold">
              community
            </Typography>
          </View>
          <Button
            sx={{borderRadius: 100}}
            width={250}
            onPress={() => dispatch(openDialog('choose_city_dialog'))}>
            <Typography variant="subtitle1" fontWeight="bold" color="white">
              Find Home Chefs
            </Typography>
          </Button>
          <Stack direction="row" style={styles.footer}>
            <Image
              source={require('../../../../assets/images/home/delicious.png')}
              resizeMode="contain"
              style={styles.delicious}
            />
            <Image
              source={require('../../../../assets/images/home/vegetable.png')}
              resizeMode="contain"
              style={styles.vegetable}
            />
          </Stack>
        </Stack>
      </Container>
    </View>
  );
}
