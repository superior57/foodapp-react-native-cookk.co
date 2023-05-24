import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useToast} from 'react-native-styled-toast';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

// react-native
import {View, TextInput, StyleSheet} from 'react-native';
// @mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// components
import Button from '../../../components/button';
import Typography from '../../../components/typography';
// sections
//routes
import {SCREEN_ROUTES} from '../../../routes/paths';
// hook
import useAuth from '../../../hooks/useAuth';
// theme
import {ERROR} from '../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40,
    width: '100%',
  },

  form: {
    gap: 25,
  },

  input: {
    height: 50,
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },

  passwordInputGroup: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    borderRadius: 5,
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

const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('First name is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup
    .string()
    .email('Please enter valid email')
    .required('Email address is required'),
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .min(8, ({min}) => `Confirm password must be at least ${min} characters`)
    .required('Confirm password is required'),
});

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const {register} = useAuth();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {toast} = useToast();

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      await register(data);
      navigation.navigate(SCREEN_ROUTES.home);
      toast({message: ' Register Successfully', intent: 'SUCCESS'});
    } catch (error) {
      toast({message: error.message, intent: 'ERROR'});
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{
          firstName: '',
          lastName: '',
          phoneNumber: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={onSubmit}>
        {({handleChange, handleSubmit, values, errors}) => (
          <Stack style={styles.form}>
            <Stack>
              <TextInput
                name="firstName"
                placeholder="First name"
                style={styles.input}
                onChangeText={handleChange('firstName')}
                value={values.firstName}
              />
              {errors.firstName && (
                <Typography color={ERROR.main}>{errors.firstName}</Typography>
              )}
            </Stack>
            <Stack>
              <TextInput
                name="lastName"
                placeholder="Last name"
                style={styles.input}
                onChangeText={handleChange('lastName')}
                value={values.lastName}
              />
              {errors.lastName && (
                <Typography color={ERROR.main}>{errors.lastName}</Typography>
              )}
            </Stack>
            <Stack>
              <TextInput
                name="phoneNumber"
                placeholder="Phone number"
                style={styles.input}
                onChangeText={handleChange('phoneNumber')}
                value={values.phoneNumber}
              />
              {errors.phoneNumber && (
                <Typography color={ERROR.main}>{errors.phoneNumber}</Typography>
              )}
            </Stack>
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
            <Stack>
              <Stack style={styles.passwordInputGroup}>
                <TextInput
                  name="confirmPassword"
                  style={styles.passwordInput}
                  placeholder="Confirm password"
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                />
                <IconButton
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                  icon={<Icon name="eye-outline" size={20} color="#939393" />}
                />
              </Stack>
              {errors.confirmPassword && (
                <Typography color={ERROR.main}>
                  {errors.confirmPassword}
                </Typography>
              )}
            </Stack>
            <Button isLoading={isLoading} onPress={handleSubmit}>
              Continue
            </Button>
          </Stack>
        )}
      </Formik>
    </View>
  );
}
