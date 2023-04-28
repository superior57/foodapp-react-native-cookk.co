import React from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';

// react-native
import {
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
import Button from '../../../../components/button';
// sections
// routes
// theme
import {ERROR, PRIMARY, SECONDARY} from '../../../../theme';
// redux

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  form: {padding: 20, gap: 20},

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  multilineInput: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  iconButton: {
    backgroundColor: PRIMARY.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 100,
    width: 50,
    height: 50,
  },

  error: {color: ERROR.main},
});

// ----------------------------------------------------------------------

const loginValidationSchema = yup.object().shape({
  full_name: yup.string().required('Full name is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email address is required'),
  message: yup.string().required('Message is required'),
});

// ----------------------------------------------------------------------

export default function ContactUsForm() {
  return (
    <ImageBackground
      source={require('../../../../assets/images/contactUs/form.png')}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{full_name: '', email: '', message: ''}}
        onSubmit={values => console.log(values)}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <Stack style={styles.form}>
            <Typography variant="h5" color={SECONDARY.main}>
              Ask a question
            </Typography>
            <TextInput
              name="full_name"
              placeholder="Full name"
              style={styles.input}
              onChangeText={handleChange('full_name')}
              onBlur={handleBlur('string')}
              value={values.full_name}
            />
            {errors.full_name && (
              <Typography color={ERROR.main}>{errors.full_name}</Typography>
            )}
            <TextInput
              name="email"
              placeholder="Email address"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && (
              <Typography color={ERROR.main}>{errors.email}</Typography>
            )}
            <TextInput
              name="message"
              multiline
              style={styles.multilineInput}
              textAlignVertical="top"
              numberOfLines={8}
              placeholder="Your message"
              onChangeText={handleChange('message')}
              onBlur={handleBlur('string')}
              value={values.message}
            />
            {errors.message && (
              <Typography color={ERROR.main}>{errors.message}</Typography>
            )}
            <Stack direction="row" justify="between">
              <Button
                onPress={handleSubmit}
                paddingHorizontal={40}
                fontWeight={900}
                borderRadius={100}>
                Ask a question
              </Button>
              <IconButton
                icon={
                  <TouchableOpacity onPress={() => {}}>
                    <Stack style={styles.iconButton}>
                      <Icon name="phone" size={15} color={'white'} />
                    </Stack>
                  </TouchableOpacity>
                }
              />
            </Stack>
          </Stack>
        )}
      </Formik>
    </ImageBackground>
  );
}
