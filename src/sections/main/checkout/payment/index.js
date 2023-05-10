import React from 'react';

// react-native
import {StyleSheet} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Button from '../../../../components/button';
// sections
import PanelWrapper from './../panelWrapper';
// routes
// redux
// theme
import {SECONDARY} from '../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({});

// ----------------------------------------------------------------------

export default function Payment() {
  return (
    <PanelWrapper icon="cc-paypal" title="Payment">
      <Stack gap={20}>
        <Button variant="outlined" color={SECONDARY.main}>
          Add a new card
        </Button>
      </Stack>
    </PanelWrapper>
  );
}
