import React, {useState} from 'react';
import {CardField, useConfirmSetupIntent} from '@stripe/stripe-react-native';

// react-native
import {StyleSheet} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Button from '../../../../../../components/button';
import Typography from '../../../../../../components/typography';
// sections
// routes
// redux
import {dispatch} from '../../../../../../redux/store';
import {getSavedCards} from '../../../../../../redux/slices/food';
// theme
import {ERROR, GREY} from '../../../../../../theme';
import {useToast} from 'react-native-styled-toast';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 30,
  },

  cardField: {
    width: '100%',
    height: 50,
  },
});

// ----------------------------------------------------------------------

export default function PaymentForm({onClose, clientSecret}) {
  const [isLoading, setIsLoading] = useState(false);
  const {confirmSetupIntent} = useConfirmSetupIntent();
  const {toast} = useToast();
  const [error, setError] = useState();
  const [billingDetails, setBillingDetails] = useState();

  // ...

  const handlePayPress = async () => {
    try {
      setIsLoading(true);
      const {error} = await confirmSetupIntent(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails: billingDetails,
        },
      });

      if (error) {
        setIsLoading(false);
        setError(error.message);
      } else {
        setTimeout(async () => {
          await dispatch(getSavedCards());
          setIsLoading(false);
          onClose();
          toast({
            message: 'Your payment method has been added successfully',
            intent: 'SUCCESS',
          });
        }, 500);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  return (
    <Stack gap={30} style={styles.wrapper}>
      <Typography variant="h6" fontWeight={500}>
        Add payment
      </Typography>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderRadius: 5,
          borderWidth: 1,
          borderColor: GREY[400],
        }}
        style={styles.cardField}
        onCardChange={cardDetails => {
          setBillingDetails(cardDetails);
        }}
      />
      {error && <Typography color={ERROR.main}>{error}</Typography>}
      <Button isLoading={isLoading} onPress={handlePayPress}>
        Save
      </Button>
    </Stack>
  );
}
