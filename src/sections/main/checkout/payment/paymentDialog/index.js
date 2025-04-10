import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {StripeProvider} from '@stripe/stripe-react-native';

// react-native
import {TouchableOpacity, StyleSheet} from 'react-native';
// mui
import {Dialog} from '@react-native-material/core';
// layouts
// screens
// components
import Container from '../../../../../components/container';
// sections
import PaymentForm from './paymentForm';
// routes
// redux
import {dispatch} from '../../../../../redux/store';
import {createCardIntent} from '../../../../../redux/service/payment';
// theme
import {SECONDARY} from '../../../../../theme';

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

export default function PaymentDialog({...other}) {
  const [clientSecretKey, setClientSecretKey] = useState('');
  const [publicKey, setPublickey] = useState('');

  useEffect(() => {
    if (!other.visible) {
      return;
    }

    async function fetch() {
      const response = await dispatch(createCardIntent());

      if (createCardIntent.fulfilled.match(response)) {
        const {client_secret, publishable_key} = response.payload;

        setClientSecretKey(client_secret);
        setPublickey(publishable_key);
      }
    }

    fetch();
  }, [other.visible]);

  return (
    <Dialog {...other}>
      <TouchableOpacity onPress={other.onDismiss} style={styles.closeButton}>
        <Icon name="close" color={SECONDARY.main} size={20} />
      </TouchableOpacity>
      <Container>
        <StripeProvider publishableKey={publicKey}>
          <PaymentForm
            onClose={other.onDismiss}
            clientSecret={clientSecretKey}
          />
        </StripeProvider>
      </Container>
    </Dialog>
  );
}
