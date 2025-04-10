import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useToast} from 'react-native-styled-toast';

// react-native
import {
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Linking,
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
import {contactUs} from '../../../../redux/slices/contact-us';
import {dispatch} from '../../../../redux/store';
// redux

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  form: {padding: 20, gap: 20},

  input: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
  },

  multilineInput: {
    height: 150,
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
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

const contactUsValidationSchema = yup.object().shape({
  full_name: yup.string().required('Full name is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email address is required'),
  message: yup.string().required('Message is required'),
});

// ----------------------------------------------------------------------

export default function ContactUsForm() {
  const handleCall = () => {
    Linking.openURL('tel:+19299285292');
  };

  const [isLoading, setIsLoading] = useState(false);

  const {toast} = useToast();

  const onSubmit = async data => {
    try {
      setIsLoading(true);
      await dispatch(contactUs(data));
    } catch (error) {
      toast({message: error.message, intent: 'ERROR'});
    }
    setIsLoading(false);
  };

  return (
    <ImageBackground
      source={require('../../../../assets/images/contactUs/form.png')}>
      <Formik
        validationSchema={contactUsValidationSchema}
        initialValues={{full_name: '', email: '', message: ''}}
        onSubmit={onSubmit}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <Stack style={styles.form}>
            <Typography variant="h6" color={SECONDARY.main}>
              Unlock the earning potential of your kitchen with our support
            </Typography>
            <Stack>
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
            </Stack>
            <Stack>
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
            </Stack>
            <Stack>
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
            </Stack>
            <Stack direction="row" justify="between">
              <Button
                isLoading={isLoading}
                onPress={handleSubmit}
                width={180}
                fontWeight={900}
                borderRadius={100}>
                Get started
              </Button>
              <IconButton
                icon={
                  <TouchableOpacity onPress={handleCall}>
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
