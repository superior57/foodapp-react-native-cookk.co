import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';

// react-native
import {TextInput, StyleSheet} from 'react-native';
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

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
// ----------------------------------------------------------------------

const addressValidationSchema = yup.object().shape({
  address: yup.string().required('Address is required'),
  apartment: yup.string().required('Apartment is required'),
  state: yup.string().required('State is required'),
  city: yup.string().required('City is required'),
  zip: yup.string().required('Zip is required'),
});

// ----------------------------------------------------------------------

export default function Address() {
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      toast({message: 'Successfully', intent: 'SUCCESS'});
    } catch (error) {
      toast({message: error.message, intent: 'ERROR'});
    }
    setIsLoading(false);
  };

  return (
    <Formik
      validationSchema={addressValidationSchema}
      initialValues={{
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }}
      onSubmit={onSubmit}>
      {({handleChange, handleSubmit, values, errors}) => (
        <Stack gap={20}>
          <Typography variant="h6" fontWeight="bold">
            Personal information
          </Typography>
          <Stack gap={5}>
            <Typography variant="subtitle">Address</Typography>
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
            <Typography variant="subtitle">Apartment</Typography>
            <TextInput
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
