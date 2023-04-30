import React from 'react';

// react-native
import {View, StyleSheet} from 'react-native';
// mui
// layouts
// screens
// components
import Container from '../../../components/container';
import Typography from '../../../components/typography';
import Layout from '../../../layouts';
import {Stack} from '@react-native-material/core';
import Button from '../../../components/button';
import {GREY} from '../../../theme';
// sections
// routes
// theme

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 10,
  },

  button: {
    color: GREY[800],
  },
});

// ----------------------------------------------------------------------

export default function Cart() {
  return (
    <Layout variant="main">
      <Container>
        <Stack style={styles.wrapper}>
          <Typography variant="h4" textAlign="center">
            Cart
          </Typography>
          <Typography textAlign="center">
            Your cart currently contains delicious food items that are just
            waiting to be enjoyed. Take a moment to review your selections
            before proceeding to checkout.
          </Typography>
          <Button width="100%" variant="outlined">
            Checkout
          </Button>
        </Stack>
      </Container>
    </Layout>
  );
}
