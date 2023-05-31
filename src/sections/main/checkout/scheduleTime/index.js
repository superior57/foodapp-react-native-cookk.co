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
    width: '100%',
  },
});

// ----------------------------------------------------------------------

export default function ScheduleTime({isPickup}) {
  const {checkout} = useSelector(FOOD_SELECTOR);
  const selectedDay = checkout?.orderDetail?.items[0]?.selected_day;
  const scheduleTime = checkout?.orderDetail?.schedule_time;
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    if (selectedDay) {
      const dateObj = parse(selectedDay, 'MM/dd/yyyy', new Date());
      const formattedDate = format(dateObj, 'EEEE MMMM d');
      setSelectedDate(formattedDate);
    }
  }, [selectedDay]);

  return (
    <>
      <PanelWrapper
        icon="calendar"
        title={`${isPickup ? 'Pick up' : 'Delivery'} schedule`}
        subtitle={selectedDate}>
        <Stack style={styles.content} gap={20}>
          <Typography>{scheduleTime ?? ''}</Typography>
          <Button
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
