import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {TouchableOpacity, StyleSheet} from 'react-native';
// import {useToast} from 'react-native-styled-toast';
import SelectDropdown from 'react-native-select-dropdown';
// mui
import {Dialog, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Container from '../../../../../components/container';
import Typography from '../../../../../components/typography';
import Button from '../../../../../components/button';
// sections
// routes
// redux
import {dispatch, useSelector} from '../../../../../redux/store';
import {
  FOOD_SELECTOR,
  getOrderDetail,
  updateScheduleTime,
} from '../../../../../redux/slices/food';
// theme
import {SECONDARY} from '../../../../../theme';
import {addHours, format, getHours, isTomorrow, parse} from 'date-fns';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 30,
  },

  closeButton: {
    position: 'absolute',
    zIndex: 1,
    right: 5,
    top: 5,
  },
});

// ----------------------------------------------------------------------

export default function TimeScheduleDialog({...other}) {
  // const {toast} = useToast();
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {orderId} = checkout;
  const [isLoading, setIsLoading] = useState(false);
  const scheduleTime = checkout?.orderDetail?.schedule_time;
  const scheduleDate = checkout?.orderDetail?.items?.[0]?.selected_day;
  const slots = checkout?.orderDetail?.schedule_slots;
  const handleChange = value => {
    setSelectedTime(value);
  };
  const [times, setTimes] = useState([]);

  useEffect(() => {
    if (scheduleDate && slots) {
      const dateToCheck = parse(scheduleDate, 'MM/dd/yyyy', new Date());
      const isDateTomorrow = isTomorrow(dateToCheck);
      const temp = isDateTomorrow
        ? slots?.filter(time => {
            const dateObj = parse(time, 'h:mm a', new Date());
            const formattedTime = format(dateObj, 'HH');
            const currentDate = new Date();
            const hourAfter17Hours = getHours(currentDate) - 7;
            return formattedTime > hourAfter17Hours; // compare the start time with the current hour
          })
        : slots;

      setTimes(temp);
    }
  }, [scheduleDate, slots]);

  const [selectedTime, setSelectedTime] = useState(scheduleTime);

  useEffect(() => {
    if (!selectedTime) {
      setSelectedTime(times?.[0]);
    }
  }, [selectedTime, times]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await dispatch(updateScheduleTime(orderId, selectedTime));
      await dispatch(getOrderDetail(orderId));
      setIsLoading(false);
      // toast({message: response.success, intent: 'SUCCESS'});
      other.onDismiss();
    } catch (error) {
      // toast({message: error.message, intent: 'ERROR'});
    }
  };

  return (
    <Dialog {...other}>
      <TouchableOpacity onPress={other.onDismiss} style={styles.closeButton}>
        <Icon name="close" color={SECONDARY.main} size={20} />
      </TouchableOpacity>
      <Container>
        <Stack gap={30} style={styles.wrapper}>
          <Typography variant="h6" fontWeight={500}>
            Select a time
          </Typography>
          <SelectDropdown
            defaultValue={scheduleTime ?? times?.[0]}
            data={times}
            onSelect={handleChange}
            buttonStyle={{width: '100%'}}
          />
          <Button
            onPress={onSubmit}
            color={SECONDARY.main}
            isLoading={isLoading}>
            Save
          </Button>
        </Stack>
      </Container>
    </Dialog>
  );
}
