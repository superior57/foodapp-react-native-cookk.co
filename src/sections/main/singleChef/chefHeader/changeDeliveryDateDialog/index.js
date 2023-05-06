import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {TouchableOpacity, StyleSheet, View} from 'react-native';
// mui
import {Dialog, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../../components/typography';
import Button from '../../../../../components/button';
// sections
// routes
// redux
// theme
import {SECONDARY} from '../../../../../theme';
import Container from '../../../../../components/container';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
});

// ----------------------------------------------------------------------

export default function ChangeDeliveryDateDialog({onSubmit, ...other}) {
  return (
    <Dialog {...other}>
      <TouchableOpacity onPress={other.onDismiss} style={{zIndex: 1}}>
        <Icon name="close" size={20} style={styles.closeButton} />
      </TouchableOpacity>
      <Container>
        <Stack gap={20}>
          <Typography variant="h6" fontWeight={500}>
            Change Delivery Date?
          </Typography>
          <Typography variant="body2">
            Selecting a new date will clear your cart. We can’t guarantee that
            all of your selected items will be available on the newly selected
            date
          </Typography>
          <Stack gap={10}>
            <Button color={SECONDARY.main} onPress={onSubmit}>
              Yes ( clear cart)
            </Button>
            <Button onPress={other.onDismiss}>No</Button>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
}
