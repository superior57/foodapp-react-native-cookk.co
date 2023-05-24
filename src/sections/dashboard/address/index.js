import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';

// react-native
import {TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import {useToast} from 'react-native-styled-toast';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Button from '../../../components/button';
import Typography from '../../../components/typography';
// sections
// routes
// redux
// theme
import {ERROR, SECONDARY} from '../../../theme';
// hook
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  input: {
    height: 50,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
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

export default function Address() {
  const [isLoading, setIsLoading] = useState(false);
  const {user, updateAddress, addAddress} = useAuth();
  const [disable, setDisable] = useState(true);
  const address = user?.addresses?.find(item => item.primary_address === true);
  const {toast} = useToast();

  const onSubmit = async data => {
    data.id = address?.id;
    setIsLoading(true);
    try {
      if (address?.id) {
        const response = await updateAddress(data);
        toast({message: response.data.success, intent: 'SUCCESS'});
      } else {
        const response = await addAddress(data);
        toast({message: response.data.success, intent: 'SUCCESS'});
      }
    } catch (error) {
      toast({message: error.message, intent: 'ERROR'});
    }
    setIsLoading(false);
  };

  return (
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
        <Stack gap={20}>
          <Stack direction="row" justify="between" style={styles.title}>
            <Typography variant="h6" fontWeight="bold">
              Address
            </Typography>
            <TouchableOpacity onPress={() => setDisable(!disable)}>
              <Typography>{disable ? 'Edit' : 'Disable'}</Typography>
            </TouchableOpacity>
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">Address</Typography>
            <TextInput
              editable={!disable}
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
            <Typography variant="subtitle">Apartment</Typography>
            <TextInput
              editable={!disable}
              name="apartment"
              style={styles.input}
              onChangeText={handleChange('apartment')}
              value={values.apartment}
            />
            {errors.apartment && (
              <Typography color={ERROR.main}>{errors.apartment}</Typography>
            )}
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">State</Typography>
            <TextInput
              editable={!disable}
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
            <Typography variant="subtitle">City</Typography>
            <TextInput
              editable={!disable}
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
            <Typography variant="subtitle">Zip</Typography>
            <TextInput
              keyboardType="numeric"
              editable={!disable}
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
            disabled={disable}
            color={SECONDARY.main}
            variant="outlined"
            isLoading={isLoading}
            onPress={handleSubmit}>
            Save
          </Button>
        </Stack>
      )}
    </Formik>
  );
}
