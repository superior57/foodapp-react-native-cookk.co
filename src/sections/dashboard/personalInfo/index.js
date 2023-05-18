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
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  title: {
    alignItems: 'center',
  },

  input: {
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
});
// ----------------------------------------------------------------------

const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('First name is required'),
  username: yup.string().required('Username is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email address is required'),
  instagram: yup.string(),
  facebook: yup.string(),
});

// ----------------------------------------------------------------------

export default function PersonalInfo() {
  const [isLoading, setIsLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const {toast} = useToast();
  const {
    updatePersonalInfo,
    user: {user},
  } = useAuth();

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      const response = await updatePersonalInfo(data);
      toast({message: response.data.success, intent: 'SUCCESS'});
    } catch (error) {
      toast({message: error.message, intent: 'ERROR'});
    }
    setIsLoading(false);
  };

  return (
    <Formik
      validationSchema={registerValidationSchema}
      initialValues={{
        firstName: user?.first_name ?? '',
        lastName: user?.last_name ?? '',
        username: user?.username ?? '',
        phoneNumber: user?.mobile ?? '',
        email: user?.email ?? '',
        instagram: user?.instagram ?? '',
        facebook: user?.facebook ?? '',
      }}
      onSubmit={onSubmit}>
      {({handleChange, handleSubmit, values, errors}) => (
        <Stack gap={20}>
          <Stack direction="row" justify="between" style={styles.title}>
            <Typography variant="h6" fontWeight="bold">
              Personal information
            </Typography>
            <TouchableOpacity onPress={() => setDisable(!disable)}>
              <Typography>Edit</Typography>
            </TouchableOpacity>
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">First Name</Typography>
            <TextInput
              editable={!disable}
              name="firstName"
              style={styles.input}
              onChangeText={handleChange('firstName')}
              value={values.firstName}
            />
            {errors.firstName && (
              <Typography color={ERROR.main}>{errors.firstName}</Typography>
            )}
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">Last Name</Typography>
            <TextInput
              editable={!disable}
              name="lastName"
              style={styles.input}
              onChangeText={handleChange('lastName')}
              value={values.lastName}
            />
            {errors.lastName && (
              <Typography color={ERROR.main}>{errors.lastName}</Typography>
            )}
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">Username</Typography>
            <TextInput
              editable={!disable}
              name="username"
              style={styles.input}
              onChangeText={handleChange('username')}
              value={values.username}
            />
            {errors.username && (
              <Typography color={ERROR.main}>{errors.username}</Typography>
            )}
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">Phone Number</Typography>
            <TextInput
              editable={!disable}
              name="phoneNumber"
              style={styles.input}
              onChangeText={handleChange('phoneNumber')}
              value={values.phoneNumber}
            />
            {errors.phoneNumber && (
              <Typography color={ERROR.main}>{errors.phoneNumber}</Typography>
            )}
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">email</Typography>
            <TextInput
              editable={false}
              name="email"
              style={styles.input}
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {errors.email && (
              <Typography color={ERROR.main}>{errors.email}</Typography>
            )}
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">Instagram</Typography>
            <TextInput
              editable={!disable}
              name="instagram"
              style={styles.input}
              onChangeText={handleChange('instagram')}
              value={values.instagram}
            />
            {errors.instagram && (
              <Typography color={ERROR.main}>{errors.instagram}</Typography>
            )}
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">Facebook</Typography>
            <TextInput
              editable={!disable}
              name="facebook"
              style={styles.input}
              onChangeText={handleChange('facebook')}
              value={values.facebook}
            />
            {errors.facebook && (
              <Typography color={ERROR.main}>{errors.facebook}</Typography>
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
