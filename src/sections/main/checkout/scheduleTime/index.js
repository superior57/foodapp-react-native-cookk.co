import React, {useEffect, useState} from 'react';
import {format, parse} from 'date-fns';

// react-native
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
import {SCREEN_ROUTES} from '../../../../routes/paths';
// redux
import {useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../redux/slices/food';
// theme
import {SECONDARY} from '../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
});

// ----------------------------------------------------------------------

export default function ScheduleTime({isPickup}) {
  const navigation = useNavigation();
  const {checkout} = useSelector(FOOD_SELECTOR);
  const scheduleDay = checkout?.orderDetail?.items?.[0]?.selected_day;
  const scheduleTime = checkout?.orderDetail?.items?.[0]?.selected_time;
  const [selectedDate, setSelectedDate] = useState();

  useEffect(() => {
    if (scheduleDay) {
      const dateObj = parse(scheduleDay, 'MM/dd/yyyy', new Date());
      const formattedDate = format(dateObj, 'EEEE MMMM d');
      setSelectedDate(formattedDate);
    }
  }, [scheduleDay]);

  return (
    <>
      <PanelWrapper
        icon="calendar"
        title={`${isPickup ? 'Pick up' : 'Delivery'} schedule`}
        subtitle={selectedDate}>
        <Stack style={styles.content} gap={20}>
          <Typography>{scheduleTime ?? ''}</Typography>
          <Button
            onPress={() => navigation.navigate(SCREEN_ROUTES.singleChef)}
            variant="outlined"
            color={SECONDARY.main}
            paddingHorizontal={20}>
            Change
          </Button>
        </Stack>
      </PanelWrapper>
    </>
  );
}
