import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useToast} from 'react-native-styled-toast';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// react-native
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
// @mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// components
import Button from '../../../components/button';
import Typography from '../../../components/typography';
// sections
// routes
import {AUTH_ROUTES, SCREEN_ROUTES} from '../../../routes/paths';
// theme
import {ERROR} from '../../../theme';
// hooks
import useAuth from '../../../hooks/useAuth';

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
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },

  passwordInputGroup: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  passwordInput: {
    flex: 1,
    padding: 0,
  },

  eyeIcon: {
    backgroundColor: 'white',
    position: 'absolute',
    right: 0,
  },

  link: {
    fontSize: 18,
    color: 'white',
    textDecorationLine: 'underline',
    width: 150,
  },
});

// ----------------------------------------------------------------------

const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email address is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
});

// ----------------------------------------------------------------------

export default function LoginForm() {
  const {login} = useAuth();

  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const {toast} = useToast();

  const onSubmit = async (data, {resetForm}) => {
    setIsLoading(true);
    try {
      await login(data);
      navigation.navigate(SCREEN_ROUTES.home);
    } catch (error) {
      toast({message: error.message, intent: 'ERROR'});
      resetForm();
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{email: '', password: ''}}
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
            <Stack>
              <Stack style={styles.passwordInputGroup}>
                <TextInput
                  name="password"
                  style={styles.passwordInput}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  value={values.password}
                />
                <IconButton
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                  icon={<Icon name="eye-outline" size={20} color="#939393" />}
                />
              </Stack>
              {errors.password && (
                <Typography color={ERROR.main}>{errors.password}</Typography>
              )}
            </Stack>

            <TouchableOpacity
              onPress={() => navigation.navigate(AUTH_ROUTES.forgotPass)}>
              <Typography sx={styles.link}>Forgot password</Typography>
            </TouchableOpacity>

            <Button isLoading={isLoading} onPress={handleSubmit}>
              Continue
            </Button>
          </Stack>
        )}
      </Formik>
    </View>
  );
}
