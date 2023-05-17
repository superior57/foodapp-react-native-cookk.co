import React, {useEffect, useState} from 'react';

// react-native
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Button from '../../../../components/button';
// sections
import PanelWrapper from './../panelWrapper';
import PaymentDialog from './paymentDialog';
// routes
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR, getSavedCards} from '../../../../redux/slices/food';
// theme
import {SECONDARY, SUCCESS} from '../../../../theme';
import Typography from '../../../../components/typography';

// ----------------------------------------------------------------------

export default function Payment() {
  const {savedCards} = useSelector(FOOD_SELECTOR);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

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
              <Stack key={item?.id} direction="row" justify="between">
                <Typography variant="subtitle1" color={SUCCESS.main}>
                  {item?.brand}
                </Typography>
                <Typography>**** **** **** {item?.last_four}</Typography>
              </Stack>
            ))
          ) : (
            <Typography>You do not have saved credit cards</Typography>
          )}
          <Button
            onPress={() => setDialogIsOpen(true)}
            variant="outlined"
            color={SECONDARY.main}>
            Add a new card
          </Button>
        </Stack>
      </PanelWrapper>
    </>
  );
}
