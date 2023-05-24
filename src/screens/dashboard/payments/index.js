import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

// react-native
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import {useToast} from 'react-native-styled-toast';
// mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
import Layout from '../../../layouts';
// screens
// components
import Container from '../../../components/container';
import Typography from '../../../components/typography';
import Button from '../../../components/button';
import LoadingScreen from '../../../components/loadingScreen';
// sections
import PaymentDialog from '../../../sections/main/checkout/payment/paymentDialog';
// routes
// redux
import {
  FOOD_SELECTOR,
  deleteCard,
  getSavedCards,
} from '../../../redux/slices/food';
import {dispatch, useSelector} from '../../../redux/store';
// theme
import {ERROR, SECONDARY} from '../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  content: {
    padding: 30,
    alignItems: 'center',
  },
});

// ----------------------------------------------------------------------

export default function Payments() {
  const [isLoading, setIsLoading] = useState(false);
  const {savedCards} = useSelector(FOOD_SELECTOR);
  const [isOpenPaymentDialog, setIsOpenPaymentDialog] = useState(false);
  const {toast} = useToast();

  const deletePayment = async () => {
    try {
      await dispatch(deleteCard());
      dispatch(getSavedCards());
    } catch (error) {
      toast({message: error.message, intent: 'ERROR'});
    }
  };

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await dispatch(getSavedCards());
      setIsLoading(false);
    };

    fetch();
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <PaymentDialog
        visible={isOpenPaymentDialog}
        onDismiss={() => setIsOpenPaymentDialog(false)}
      />
      <Layout variant="dashboard">
        <Container>
          <Stack gap={30}>
            <Typography variant="h6" fontWeight="bold">
              Active card
            </Typography>
            <Card>
              {savedCards.length == 0 ? (
                <Button
                  variant="outlined"
                  color={SECONDARY.main}
                  onPress={() => setIsOpenPaymentDialog(true)}>
                  Add Card
                </Button>
              ) : (
                <Stack direction="row" justify="between" style={styles.content}>
                  <Typography>
                    **** **** **** {savedCards[0]?.last_four}
                  </Typography>
                  <IconButton
                    onPress={deletePayment}
                    icon={<Icon color={ERROR.main} size={20} name="trash" />}
                  />
                </Stack>
              )}
            </Card>
          </Stack>
        </Container>
      </Layout>
    </>
  );
}
