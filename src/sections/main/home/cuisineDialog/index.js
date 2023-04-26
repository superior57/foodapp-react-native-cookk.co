import React, {useState} from 'react';

// react-native
// mui
import {
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Text,
} from '@react-native-material/core';
// layouts
// screens
// components
// sections
// routes
// theme

// ----------------------------------------------------------------------

export default function CuisineDialog({isOpen}) {
  return (
    <Dialog visible={isOpen} onDismiss={() => {}}>
      <DialogHeader title="Dialog Header" />
      <DialogContent>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
          eligendi inventore, laboriosam laudantium minima minus nesciunt
          pariatur sequi.
        </Text>
      </DialogContent>
      <DialogActions>
        <Button title="Cancel" compact variant="text" onPress={() => {}} />
        <Button title="Ok" compact variant="text" onPress={() => {}} />
      </DialogActions>
    </Dialog>
  );
}
