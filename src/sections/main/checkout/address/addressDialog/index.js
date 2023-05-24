import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {TouchableOpacity, StyleSheet, TextInput} from 'react-native';
// mui
import {Dialog, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Button from '../../../../../components/button';
import Container from '../../../../../components/container';
import Typography from '../../../../../components/typography';
// sections
// routes
// redux
import {dispatch, useSelector} from '../../../../../redux/store';
import {FOOD_SELECTOR, getOrderDetail} from '../../../../../redux/slices/food';
// theme
import {ERROR, GREY, SECONDARY} from '../../../../../theme';
// hook
import useAuth from '../../../../../hooks/useAuth';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 0.5,
    borderColor: GREY[500],
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },

  closeButton: {position: 'absolute', zIndex: 1, right: 5, top: 5},

  submitButton: {
    marginTop: 20,
  },
});

// ----------------------------------------------------------------------

const addressValidationSchema = yup.object().shape({
  address: yup.string().required('Address is required'),
  apartment: yup.string().required('Apartment is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  zip: yup.number().required('Zip is required'),
});

// ----------------------------------------------------------------------

export default function AddressDialog({...other}) {
  const [isLoading, setIsLoading] = useState(false);
  const {updateAddress, addAddress} = useAuth();
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {orderDetail, orderId} = checkout ?? {};
  const address = orderDetail?.available_addresses?.[0];

  const onSubmit = async data => {
    try {
      data.id = address?.id;
      setIsLoading(true);
      if (address?.id) {
        await updateAddress(data);
      } else {
        await addAddress(data);
      }
      await dispatch(getOrderDetail(orderId));
      setIsLoading(false);
      other.onDismiss();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Dialog {...other}>
      <TouchableOpacity onPress={other.onDismiss} style={styles.closeButton}>
        <Icon name="close" color={SECONDARY.main} size={20} />
      </TouchableOpacity>
      <Container>
        <Stack gap={30}>
          <Typography variant="h6" fontWeight="bold">
            {address ? 'Edit' : 'Add'} address
          </Typography>
          <Formik
            validationSchema={addressValidationSchema}
            initialValues={{
              address: address?.line1 ?? '',
              apartment: address?.apartment ?? '',
              state: address?.state ?? '',
              city: address?.city ?? '',
              zip: `${address?.zip}` ?? '',
            }}
            onSubmit={onSubmit}>
            {({handleChange, handleSubmit, values, errors}) => (
              <Stack gap={15}>
                <Stack gap={5}>
                  <Typography variant="subtitle1">Address</Typography>
                  <TextInput
                    name="address"
                    style={styles.input}
                    onChangeText={handleChange('address')}
                    value={values.address}
                  />
                  {errors.address && (
                    <Typography color={ERROR.main}>{errors.address}</Typography>
                  )}
                </Stack>
                <Stack gap={5}>
                  <Typography variant="subtitle1">Apartment</Typography>
                  <TextInput
                    name="apartment"
                    style={styles.input}
                    onChangeText={handleChange('apartment')}
                    value={values.apartment}
                  />
                  {errors.apartment && (
                    <Typography color={ERROR.main}>
                      {errors.apartment}
                    </Typography>
                  )}
                </Stack>
                <Stack gap={5}>
                  <Typography variant="subtitle1">State</Typography>
                  <TextInput
                    name="state"
                    style={styles.input}
                    onChangeText={handleChange('state')}
                    value={values.state}
                  />
                  {errors.state && (
                    <Typography color={ERROR.main}>{errors.state}</Typography>
                  )}
                </Stack>
                <Stack gap={5}>
                  <Typography variant="subtitle1">City</Typography>
                  <TextInput
                    name="city"
                    style={styles.input}
                    onChangeText={handleChange('city')}
                    value={values.city}
                  />
                  {errors.city && (
                    <Typography color={ERROR.main}>{errors.city}</Typography>
                  )}
                </Stack>
                <Stack gap={5}>
                  <Typography variant="subtitle1">Zip</Typography>
                  <TextInput
                    keyboardType="numeric"
                    name="zip"
                    style={styles.input}
                    onChangeText={handleChange('zip')}
                    value={values.zip}
                  />
                  {errors.zip && (
                    <Typography color={ERROR.main}>{errors.zip}</Typography>
                  )}
                </Stack>
                <Button
                  sx={styles.submitButton}
                  color={SECONDARY.main}
                  isLoading={isLoading}
                  onPress={handleSubmit}>
                  Save
                </Button>
              </Stack>
            )}
          </Formik>
        </Stack>
      </Container>
    </Dialog>
  );
}
