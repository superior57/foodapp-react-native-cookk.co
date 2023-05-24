import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useToast} from 'react-native-styled-toast';
import {useNavigation} from '@react-navigation/native';

// react-native
import {View, TextInput, StyleSheet} from 'react-native';
// @mui
import {Stack} from '@react-native-material/core';
// layouts
// components
import Button from '../../../components/button';
import Typography from '../../../components/typography';
// kooks
import useAuth from '../../../hooks/useAuth';
// route
import {AUTH_ROUTES} from '../../../routes/paths';
// theme
import {ERROR} from '../../../theme';
// sections

// ----------------------------------------------------------------------
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    width: '100%',
  },

  form: {
    gap: 40,
  },

  input: {
    height: 50,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

// ----------------------------------------------------------------------

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email address is required'),
});

// ----------------------------------------------------------------------

export default function ForgotPassForm() {
  const {forgotPass} = useAuth();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const {toast} = useToast();

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      await forgotPass(data);
      toast({
        message: `If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes`,
        intent: 'SUCCESS',
      });
      navigation.navigate(AUTH_ROUTES.createPass);
    } catch (error) {
      toast({message: error.message, intent: 'ERROR'});
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: ''}}
        onSubmit={onSubmit}>
        {({handleChange, handleSubmit, values, errors}) => (
          <Stack style={styles.form}>
            <Stack>
              <TextInput
                name="email"
                placeholder="Email address"
                style={styles.input}
                onChangeText={handleChange('email')}
                value={values.email}
              />
              {errors.email && (
                <Typography color={ERROR.main}>{errors.email}</Typography>
              )}
            </Stack>
            <Button isLoading={isLoading} onPress={handleSubmit}>
              Send
            </Button>
          </Stack>
        )}
      </Formik>
    </View>
  );
}
