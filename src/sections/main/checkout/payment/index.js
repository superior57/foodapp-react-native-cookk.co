import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

// react-native
import {useToast} from 'react-native-styled-toast';
// mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Button from '../../../../components/button';
import Typography from '../../../../components/typography';
// sections
import PanelWrapper from './../panelWrapper';
import PaymentDialog from './paymentDialog';
// routes
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {
  FOOD_SELECTOR,
  deleteCard,
  getSavedCards,
} from '../../../../redux/slices/food';
// theme
import {ERROR, SECONDARY, SUCCESS} from '../../../../theme';

// ----------------------------------------------------------------------

export default function Payment() {
  const {savedCards} = useSelector(FOOD_SELECTOR);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
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
    dispatch(getSavedCards());
  }, []);

  return (
    <>
      <PaymentDialog
        visible={dialogIsOpen}
        onDismiss={() => setDialogIsOpen(false)}
      />
      <PanelWrapper icon="cc-paypal" title="Payment">
        <Stack gap={20}>
          {savedCards ? (
            savedCards?.map(item => (
              <Stack
                key={item?.id}
                direction="row"
                justify="between"
                style={{alignItems: 'center'}}>
                <Typography variant="subtitle1" color={SUCCESS.main}>
                  {item?.brand}
                </Typography>
                <Typography>**** **** **** {item?.last_four}</Typography>
                <IconButton
                  onPress={deletePayment}
                  icon={<Icon color={ERROR.main} size={20} name="trash" />}
                />
              </Stack>
            ))
          ) : (
            <Typography>You do not have saved credit cards</Typography>
          )}
          {savedCards?.length === 0 && (
            <Button
              onPress={() => setDialogIsOpen(true)}
              variant="outlined"
              color={SECONDARY.main}>
              Add a new card
            </Button>
          )}
        </Stack>
      </PanelWrapper>
    </>
  );
}
