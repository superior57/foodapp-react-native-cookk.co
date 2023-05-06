import React, {useEffect, useState} from 'react';

// react-native
import {StyleSheet} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
import Button from '../../../../components/button';
// sections
import PanelWrapper from '../panelWrapper';
import TimeScheduleDialog from './timeScheduleDialog';
// routes
// redux
import {useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../redux/slices/food';
// theme
import {SECONDARY} from '../../../../theme';
import {format, parse} from 'date-fns';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
});

// ----------------------------------------------------------------------

export default function ScheduleTime({isPickup}) {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const selectedDay = checkout?.orderDetail?.items[0]?.selected_day;
  const scheduleTime = checkout?.orderDetail?.schedule_time;
  const [selectedDate, setSelectedDate] = useState();
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  useEffect(() => {
    if (selectedDay) {
      const dateObj = parse(selectedDay, 'MM/dd/yyyy', new Date());
      const formattedDate = format(dateObj, 'EEEE MMMM d');
      setSelectedDate(formattedDate);
    }
  }, [selectedDay]);

  return (
    <>
      <TimeScheduleDialog
        visible={dialogIsOpen}
        onDismiss={() => setDialogIsOpen(false)}
      />
      <PanelWrapper
        icon="calendar"
        title={`${isPickup ? 'Pick up' : 'Delivery'} schedule`}
        subtitle={selectedDate}>
        <Stack direction="row" justify="between" style={styles.content}>
          <Typography>{scheduleTime ?? ''}</Typography>
          <Button
            onPress={() => setDialogIsOpen(true)}
            variant="outlined"
            color={SECONDARY.main}
            paddingHorizontal={20}>
            Select a time
          </Button>
        </Stack>
      </PanelWrapper>
    </>
  );
}
