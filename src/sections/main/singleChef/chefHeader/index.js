import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  addDays,
  addHours,
  format,
  isAfter,
  isSameDay,
  isToday,
  isTomorrow,
  parse,
} from 'date-fns';

// react-native
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// mui
import {Stack} from '@react-native-material/core';
import {Divider} from 'react-native-paper';
// layouts
// screens
// components
import Avatar from '../../../../components/avatar';
import Typography from '../../../../components/typography';
import ReadMore from '../../../../components/readMore';
import Button from '../../../../components/button';
// sections
import TimeScheduleDialog from './timeScheduleDialog';
// routes
import {SCREEN_ROUTES} from '../../../../routes/paths';
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR} from '../../../../redux/slices/city';
import {FOOD_SELECTOR, setScheduleTime} from '../../../../redux/slices/food';
// theme
import {ERROR, SECONDARY} from '../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    gap: 30,
    paddingVertical: 10,
  },

  content: {
    marginTop: -80,
    width: '100%',
    alignItems: 'center',
  },

  datesWrapper: {
    width: '100%',
  },

  inputGroup: {
    position: 'relative',
  },

  input: {
    height: 42,
    paddingLeft: 40,
    paddingRight: 100,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },

  searchIcon: {
    position: 'absolute',
    padding: 10,
    left: 0,
  },

  searchButton: {
    position: 'absolute',
    right: 0,
  },
});

// ----------------------------------------------------------------------

export default function ChefHeader({
  foodsArray,
  setFoodsArray,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  setSearchIsLoading,
}) {
  const navigation = useNavigation();
  const {chef: chefData} = useSelector(CITYCUISINE_SELECTOR);
  const {chef} = chefData ?? {};
  const {checkout, foods} = useSelector(FOOD_SELECTOR);
  const {cart, scheduleDate, scheduleTime} = checkout;
  const [formattedDate, setFormattedDate] = useState();
  const [categories, setCategories] = useState();
  const [slots, setSlots] = useState();
  const [isOpenScheduleDialog, setIsOpenScheduleDialog] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [warnningMsg, setWarnningMsg] = useState();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const availableDates = Object.keys(foods)?.filter(item => {
      const temp = parse(item, 'MM/dd/yy', new Date());
      return isSameDay(temp, new Date()) || isAfter(temp, new Date());
    });
    const initialSlots = foods?.[availableDates[0]]?.slots;
    const currentTimePlusFiveHours = addHours(
      new Date(),
      chef?.time_to_cook ?? 0,
    );
    const filteredArray = initialSlots?.filter(
      time => parse(time, 'hh:mm a', new Date()) > currentTimePlusFiveHours,
    );
    const tomorrowSlots = foods?.[availableDates[1]]?.slots.filter(
      time =>
        addDays(parse(time, 'hh:mm a', new Date()), 1) >
        currentTimePlusFiveHours,
    );
    setSlots(
      filteredArray?.length === 0
        ? foods?.[availableDates[1]]?.slots
        : filteredArray,
    );
    const temp =
      filteredArray?.length === 0
        ? availableDates.slice(1, availableDates.length - 1)
        : availableDates;
    setCategories(temp);

    if (cart[0]?.user_id === chef?.id) {
      setSelectedDate(scheduleDate);
      setSelectedTime(scheduleTime);
    } else {
      setSelectedDate(
        filteredArray?.length === 0 ? availableDates[1] : availableDates[0],
      );
      const tempScheduleTime =
        filteredArray?.length === 0 ? tomorrowSlots?.[0] : filteredArray?.[0];
      setSelectedTime(tempScheduleTime);
      dispatch(setScheduleTime(tempScheduleTime));
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const formattedSelectedDate = parse(selectedDate, 'MM/dd/yy', new Date());
      const selectedDateIsToday = isToday(new Date(formattedSelectedDate));
      const selectedDateIsTomorrow = isTomorrow(
        new Date(formattedSelectedDate),
      );
      const tempFormattedDate = format(
        new Date(formattedSelectedDate),
        'MMMM d',
      );
      setFormattedDate(
        selectedDateIsToday
          ? 'Today'
          : selectedDateIsTomorrow
          ? 'Tomorrow'
          : tempFormattedDate,
      );
    }
  }, [selectedDate]);

  const searchFoods = key => {
    if (key.length > 3) {
      setWarnningMsg();
      const filteredArray = foodsArray.filter(item =>
        item.title.toLowerCase().includes(key.toLowerCase()),
      );
      setFoodsArray(filteredArray);
    } else {
      if (key.length > 1 && key.length < 4) {
        setWarnningMsg('requires at least 4 letters');
      } else {
        setWarnningMsg();
      }
      setFoodsArray(foods?.[selectedDate]?.foods);
    }
  };

  const searchLoading = () => {
    setSearchIsLoading(true);
    setTimeout(() => {
      setSearchIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (searchKey === '') {
      setStatus(false);
    }
  }, [searchKey]);

  const onSubmit = () => {
    if (searchKey !== '') {
      searchLoading();
      setStatus(!status);
      if (status) {
        setSearchKey('');
        searchFoods('');
      } else {
        searchFoods(searchKey);
      }
    } else {
      setFoodsArray(foods?.[selectedDate]?.foods);
    }
  };

  return (
    <>
      <TimeScheduleDialog
        slots={slots}
        categories={categories}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        visible={isOpenScheduleDialog}
        onDismiss={() => setIsOpenScheduleDialog(false)}
      />
      <Stack style={styles.wrapper}>
        <Stack gap={20}>
          <Stack gap={10}>
            <Stack style={styles.inputGroup}>
              <TextInput
                onChangeText={value => {
                  setSearchKey(value);
                  setStatus(false);
                }}
                value={searchKey}
                style={styles.input}
                placeholder="Search for a meal"
              />
              <View style={styles.searchIcon}>
                <Icon size={20} name="search" />
              </View>
              <View style={styles.searchButton}>
                <Button
                  onPress={onSubmit}
                  variant={status ? 'outlined' : 'contained'}
                  color={SECONDARY.main}
                  width={90}>
                  {status ? 'Clear' : 'Search'}
                </Button>
              </View>
            </Stack>
            {warnningMsg && (
              <Typography color={ERROR.main}>{warnningMsg}</Typography>
            )}
          </Stack>
          <Stack direction="row" wrap="nowrap" gap={20}>
            <TouchableOpacity
              onPress={() => navigation.navigate(SCREEN_ROUTES.chefs)}>
              <Typography
                variant="body1"
                color={SECONDARY.main}
                fontWeight="bold">
                Go back
              </Typography>
            </TouchableOpacity>
          </Stack>
        </Stack>
        <Image
          style={{width: '100%', height: 160}}
          source={require('../../../../assets/images/foods/header.png')}
        />
        <Stack style={styles.content} gap={20} justify="center">
          <Avatar
            size={100}
            image={chef?.image_url}
            firstName={chef?.first_name}
            lastName={chef?.last_name}
          />
          <Typography variant="h6" fontWeight="bold" color={SECONDARY.main}>
            {chef?.company_name}
          </Typography>
          <Typography variant={'subtitle1'} fontWeight={600}>
            by {chef?.first_name} {chef?.last_name}
          </Typography>
        </Stack>
        <ReadMore>{chef?.about_me}</ReadMore>
        <Typography variant="h6" fontWeight="bold">
          Available dates
        </Typography>
        <Stack gap={20}>
          <Button>
            {formattedDate} at {selectedTime}
          </Button>
          <Button
            color={SECONDARY.main}
            onPress={() => setIsOpenScheduleDialog(true)}>
            Select a new time
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
