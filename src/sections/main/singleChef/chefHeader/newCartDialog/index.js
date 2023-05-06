import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {StyleSheet, TouchableOpacity} from 'react-native';
// mui
import {Dialog, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Container from '../../../../../components/container';
import Button from '../../../../../components/button';
import Typography from '../../../../../components/typography';
// sections
// routes
// redux
// theme
import {GREY, SECONDARY} from '../../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    zIndex: 1,
    right: 5,
    top: 5,
  },
});

// ----------------------------------------------------------------------

export default function NewCartDialog({...other}) {
  return (
    <Dialog {...other}>
      <TouchableOpacity onPress={other.onDismiss} style={styles.closeButton}>
        <Icon name="close" color={SECONDARY.main} size={20} />
      </TouchableOpacity>
      <Container>
        <Stack gap={10}>
          <Typography variant="h6" fontWeight={500}>
            Would like to start a new cart?
          </Typography>
          <Typography variant="body2">
            You can only order food from one cook at a time, so if you want to
            order from a different cook, you need to start a new cart.
          </Typography>
          <Stack direction={'row'} gap={10} justify="end" pt={4}>
            <Button
              paddingHorizontal={30}
              variant="contained"
              color={SECONDARY.main}
              onPress={other.onSubmit}>
              Yes
            </Button>
            <Button
              paddingHorizontal={30}
              variant="contained"
              color={GREY[500]}
              onPress={other.onDismiss}>
              No
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Dialog>
  );
}
