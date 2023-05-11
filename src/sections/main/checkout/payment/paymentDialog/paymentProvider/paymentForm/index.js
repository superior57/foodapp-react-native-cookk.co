import {Stack} from '@react-native-material/core';
import React, {useState} from 'react';

// react-native
// mui
// layouts
// screens
// components
import Button from '../../../../../../../components/button';
import {PaymentElement} from '@stripe/react-stripe-js';
// sections
// routes
// redux
// theme

export default function PaymentForm() {
  const [formIsShow, setFormIsShow] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  return (
    <Stack>
      <PaymentElement
        id="paymentAdd"
        onLoaderStart={() => {
          setIsInitialized(true);
        }}
        onReady={() => setFormIsShow(true)}
        options={{
          fields: {
            billingDetails: {
              address: {
                country: 'never',
              },
            },
          },
        }}
      />
      <Button>Save</Button>
    </Stack>
  );
}
