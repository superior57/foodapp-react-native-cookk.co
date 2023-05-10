import React, {useState} from 'react';

// react-native
import {StyleSheet, TextInput} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
import Button from '../../../../components/button';
// sections
import PanelWrapper from '../panelWrapper';
// routes
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {
  FOOD_SELECTOR,
  updateDeliveryInstructions,
} from '../../../../redux/slices/food';
import {useToast} from 'react-native-styled-toast';
// theme
import {GREY, SECONDARY} from '../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },

  multilineInput: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: GREY[400],
  },
});

// ----------------------------------------------------------------------

export default function Notes({isPickup}) {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const [note, setNote] = useState(
    checkout?.orderDetail?.delivery_instructions,
  );
  const [panelIsOpen, setPanelIsOpen] = useState(false);
  const {toast} = useToast();
  const [loading, setLoading] = useState(false);

  const updateNote = async () => {
    try {
      setLoading(true);
      const response = await dispatch(
        updateDeliveryInstructions({
          orderId: checkout?.orderId,
          status: false,
          note: note,
        }),
      );
      toast({message: response?.success, intent: 'SUCCESS'});
      setLoading(false);
      setPanelIsOpen(false);
    } catch (error) {
      setLoading(false);
      toast({message: error.message, intent: 'ERROR'});
    }
  };

  return (
    <PanelWrapper icon="pencil" title="Notes">
      {panelIsOpen ? (
        <Stack gap={30}>
          <TextInput
            onChangeText={setNote}
            placeholder={"Is there anything else you'd like us to know about?"}
            defaultValue={note}
            multiline
            style={styles.multilineInput}
            textAlignVertical="top"
            numberOfLines={5}
          />
          <Button
            isLoading={loading}
            onPress={updateNote}
            variant="outlined"
            color={SECONDARY.main}>
            Save
          </Button>
        </Stack>
      ) : (
        <Stack style={styles.content} gap={20}>
          <Typography>
            {note ?? "Is there anything else you'd like us to know about ?"}
          </Typography>
          <Button
            onPress={() => setPanelIsOpen(true)}
            variant="outlined"
            color={SECONDARY.main}
            paddingHorizontal={20}>
            Change
          </Button>
        </Stack>
      )}
    </PanelWrapper>
  );
}
