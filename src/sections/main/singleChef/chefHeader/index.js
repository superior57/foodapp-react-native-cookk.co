import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';
import {
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
  ScrollView,
  Image,
} from 'react-native';
import {Divider} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
// mui
import {Stack} from '@react-native-material/core';
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
import {CITYCUISINE_SELECTOR, getChef} from '../../../../redux/slices/city';
import {FOOD_SELECTOR, setScheduleTime} from '../../../../redux/slices/food';
// theme
import {ERROR, PRIMARY, SECONDARY} from '../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    gap: 30,
    paddingVertical: 10,
  },

  content: {
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

  banner: {
    position: 'relative',
    backgroundColor: SECONDARY.main,
    height: 40,
    alignItems: 'center',
    marginTop: 20,
  },

  bannerImage: {
    position: 'absolute',
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
}) {
  const navigation = useNavigation();
  const {chef: chefData, chefs} = useSelector(CITYCUISINE_SELECTOR);
  const chefId = chefData?.chef?.id;
  const {chef} = chefData ?? {};
  const {checkout, foods} = useSelector(FOOD_SELECTOR);
  const {cart, scheduleDate, scheduleTime} = checkout;
  const [nextChefId, setNextChefId] = useState();
  const [prevChefId, setPrevChefId] = useState();
  const [formattedDate, setFormattedDate] = useState();
  const [categories, setCategories] = useState();
  const [slots, setSlots] = useState();
  const [isOpenScheduleDialog, setIsOpenScheduleDialog] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [warnningMsg, setWarnningMsg] = useState();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (chefId && chefs) {
      const availableChefs = chefs?.filter(item => item?.chef?.can_sell);
      const currentIndex = availableChefs?.findIndex(
        item => item.chef.id === chefId,
      );
      setPrevChefId(availableChefs?.[currentIndex - 1]?.chef?.id);
      setNextChefId(availableChefs?.[currentIndex + 1]?.chef?.id);
    }
  }, [chefId, chefs]);

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
        filteredArray?.length === 0
          ? foods?.[availableDates[1]]?.slots?.[0]
          : filteredArray?.[0];
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

  const handleClick = id => {
    dispatch(getChef(id));
  };

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

  useEffect(() => {
    if (searchKey === '') {
      setStatus(false);
    }
  }, [searchKey]);

  const onSubmit = () => {
    if (searchKey !== '') {
      setStatus(!status);
      if (status) {
        setSearchKey('');
        searchFoods('');
      } else {
        searchFoods(searchKey);
      }
    } else {
      setFoodsArray(foodsArray?.[selectedDate]?.foods);
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
                onChangeText={value => setSearchKey(value)}
                value={searchKey}
                style={styles.input}
                placeholder="Search for a meal, cuisine ..."
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
          <ScrollView horizontal={true}>
            <Stack direction="row" wrap="nowrap" gap={20}>
              <TouchableOpacity
                onPress={() => navigation.navigate(SCREEN_ROUTES.chefs)}>
                <Typography color={SECONDARY.main} fontWeight="bold">
                  Go back
                </Typography>
              </TouchableOpacity>
            </Stack>
          </ScrollView>
          <Divider />
          <Stack style={styles.banner} justify="center">
            <Image
              style={styles.bannerImage}
              source={require('../../../../assets/images/chefs/Texture.png')}
            />
            <Typography variant="subtitle1" color="white">
              Get free delivery on orders over $100
            </Typography>
          </Stack>
        </Stack>
        {(prevChefId || nextChefId) && (
          <Stack direction="row" justify="between">
            <TouchableOpacity onPress={() => handleClick(prevChefId)}>
              <Typography color={PRIMARY.main}>
                {prevChefId ? 'Previous Chef' : ' '}
              </Typography>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleClick(nextChefId)}>
              <Typography color={PRIMARY.main}>
                {nextChefId ? 'Next Chef' : ' '}
              </Typography>
            </TouchableOpacity>
          </Stack>
        )}
        <Stack style={styles.content} gap={20} justify="center">
          <Avatar
            size={150}
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
          <Stack direction="row" justify="between" gap={60}>
            <Stack gap={10}>
              <Stack direction="row">
                <Typography variant="body1">Rating: </Typography>
                <Typography variant={'subtitle1'} fontWeight="bold">
                  {chef?.rating}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant="body1">Deliveries: </Typography>
                <Typography variant={'subtitle1'} fontWeight="bold">
                  {chef?.orders}
                </Typography>
              </Stack>
            </Stack>
            <Stack gap={10}>
              <Stack direction="row">
                <Typography variant="body1">Zip code: </Typography>
                <Typography variant={'subtitle1'} fontWeight="bold">
                  {chef?.primary_address?.zip}
                </Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant="body1">Rating: </Typography>
                <Typography variant={'subtitle1'} fontWeight="bold">
                  ${chef?.delivery_fee ?? 4.99}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
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
