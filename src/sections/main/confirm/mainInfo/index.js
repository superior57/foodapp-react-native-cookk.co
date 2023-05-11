import React from 'react';

// react-native
import {StyleSheet} from 'react-native';
import {Divider} from 'react-native-paper';
// mui
import {Badge, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
import Avatar from '../../../../components/avatar';
// sections
// routes
// redux
import {useSelector} from '../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../redux/slices/food';
// theme
import {GREY, SECONDARY, SUCCESS} from '../../../../theme';
// date-fns
import {format, parse} from 'date-fns';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  badge: {paddingHorizontal: 15, borderRadius: 100, height: 25},
});

// ----------------------------------------------------------------------

export default function MainInfo() {
  const {orderConfirmInfo} = useSelector(FOOD_SELECTOR);
  const {
    order_date,
    chef_details,
    status,
    is_pickup,
    order_address,
    order_num,
    schedule_time,
    pickup_date,
  } = orderConfirmInfo ?? {};
  const {primary_address, image_url, first_name, last_name} =
    chef_details ?? {};
  const orderDate = order_date
    ? format(parse(order_date, 'yyyy-MM-dd', new Date()), 'MMMM d, yyyy')
    : '';
  const pickupDate = pickup_date
    ? format(parse(pickup_date, 'MM/dd/yyyy', new Date()), 'MMMM d, yyyy')
    : '';

  return (
    <Stack gap={30}>
      <Typography variant="h6" fontWeight="bold" color={SECONDARY.main}>
        Order details
      </Typography>
      <Divider />
      <Stack direction="row" justify="between">
        <Stack gap={10}>
          <Typography variant="body1" color={GREY[700]}>
            Order date
          </Typography>
          <Typography fontWeight="bold" variant="body1">
            {orderDate}
          </Typography>
        </Stack>
        <Stack gap={10}>
          <Typography variant="body1" color={GREY[700]}>
            {is_pickup ? 'Pick Up' : 'Delivery'} date
          </Typography>
          <Typography fontWeight="bold" variant="body1">
            {is_pickup ? pickupDate : 'Delivery'}
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justify="between">
        <Stack gap={10}>
          <Typography variant="body1" color={GREY[700]}>
            {is_pickup ? 'Pick Up' : 'Delivery'} Time
          </Typography>
          <Typography fontWeight="bold" variant="body1">
            {schedule_time}
          </Typography>
        </Stack>
        <Stack gap={10}>
          <Typography variant="body1" color={GREY[700]}>
            Order No
          </Typography>
          <Typography fontWeight="bold" variant="body1">
            #{order_num}
          </Typography>
        </Stack>
      </Stack>
      <Stack gap={10}>
        <Typography variant="body1" color={GREY[700]}>
          {is_pickup ? 'Pick Up' : 'Delivery'} Address
        </Typography>
        <Typography fontWeight="bold" variant="body1">
          {is_pickup
            ? primary_address != null
              ? `${primary_address?.line1}, ${primary_address?.apartment}, ${primary_address?.state}, ${primary_address?.city}, ${primary_address?.zip}`
              : 'There is no address'
            : primary_address != null
            ? `${order_address?.line1}, ${order_address?.apartment}, ${order_address?.state}, ${order_address?.city}, ${order_address?.zip}`
            : 'There is no address'}
        </Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justify="between">
        <Stack gap={10}>
          <Typography fontWeight="bold" variant="body1">
            Chef
          </Typography>
          <Stack gap={10} direction="row" style={{alignItems: 'center'}}>
            <Avatar
              image={image_url}
              firstName={first_name}
              lastName={last_name}
            />
            <Typography variant="body1" fontWeight="bold" color={GREY[700]}>
              {first_name} {last_name}
            </Typography>
          </Stack>
        </Stack>
        <Stack gap={30}>
          <Typography fontWeight="bold" variant="body1">
            Status
          </Typography>
          <Badge style={styles.badge} color={SUCCESS.main} label={status} />
        </Stack>
      </Stack>
      <Divider />
    </Stack>
  );
}
