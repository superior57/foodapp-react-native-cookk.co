import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {format, parse} from 'date-fns';

// react-native
import {TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
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
import ChangeDeliveryDateDialog from '../changeDeliveryDateDialog';
// routes
// redux
import {dispatch, useSelector} from '../../../../../redux/store';
import {
  FOOD_SELECTOR,
  getFoodsByChef,
  setScheduleTime,
  updateFoodCart,
} from '../../../../../redux/slices/food';
import {CITYCUISINE_SELECTOR} from '../../../../../redux/slices/city';
// theme
import {SECONDARY} from '../../../../../theme';

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

export default function TimeScheduleDialog({
  setSelectedDate,
  selectedDate,
  selectedTime,
  setSelectedTime,
  categories,
  slots,
  ...other
}) {
  const [tempDate, setTempDate] = useState();
  const [tempTime, setTempTime] = useState(selectedTime);
  const [changeDeliveryDateDialogIsOpen, setChangeDeliveryDateDialogIsOpen] =
    useState(false);
  const {checkout, foods} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;
  const {city, cuisine, chef} = useSelector(CITYCUISINE_SELECTOR);
  const cityId = city?.id;
  const cuisineId = cuisine?.id;
  const chefId = chef?.chef?.id;
  const [loading, setLoading] = useState(false);
  const [timeSlots, setTimeSlots] = useState(slots);

  const handleChange = data => {
    setTempTime(data);
  };

  const onSubmit = async () => {
    setLoading(true);
    if (selectedDate !== tempDate && cart.length > 0) {
      setChangeDeliveryDateDialogIsOpen(true);
    } else {
      setSelectedDate(tempDate);
      setSelectedTime(tempTime);
      dispatch(setScheduleTime(tempTime));
    }
    await dispatch(getFoodsByChef(cityId, cuisineId, chefId, tempDate));
    setLoading(false);
    other.onDismiss();
  };

  const setCategory = () => {
    setSelectedDate(tempDate);
    setSelectedTime(tempTime);
    dispatch(setScheduleTime(tempTime));
    dispatch(updateFoodCart({actionType: 'clear'}));
    setChangeDeliveryDateDialogIsOpen(false);
  };

  useEffect(() => {
    if (selectedDate) {
      setTempDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (other.visible) {
      const temp =
        tempDate === categories[0] ? slots : foods?.[categories[1]]?.slots;
      setTimeSlots(temp);
      setTempTime(tempDate === selectedDate ? selectedTime : temp?.[0]);
    }
  }, [tempDate, other.visible]);

  return (
    <>
      <ChangeDeliveryDateDialog
        visible={changeDeliveryDateDialogIsOpen}
        onDismiss={() => setChangeDeliveryDateDialogIsOpen(false)}
        onSubmit={setCategory}
      />
      <Dialog {...other}>
        <TouchableOpacity onPress={other.onDismiss} style={styles.closeButton}>
          <Icon name="close" color={SECONDARY.main} size={20} />
        </TouchableOpacity>
        <ScrollView style={{maxHeight: 600}}>
          <Container>
            <Stack gap={30} style={styles.wrapper}>
              <Typography variant="h6" fontWeight={500}>
                Select a time
              </Typography>
              <Stack gap={10}>
                {categories?.map((item, _i) => (
                  <Button
                    key={_i}
                    onPress={() => {
                      setTempDate(item);
                    }}
                    variant={tempDate === item ? 'contained' : 'outlined'}>
                    {item}
                  </Button>
                ))}
              </Stack>
              <SelectDropdown
                defaultValue={tempTime}
                data={timeSlots}
                onSelect={handleChange}
                buttonStyle={{width: '100%'}}
              />
              <Button
                onPress={onSubmit}
                color={SECONDARY.main}
                isLoading={loading}>
                Save
              </Button>
            </Stack>
          </Container>
        </ScrollView>
      </Dialog>
    </>
  );
}
