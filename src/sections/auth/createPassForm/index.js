import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import {useToast} from 'react-native-styled-toast';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// react-native
import {View, TextInput, StyleSheet} from 'react-native';
// @mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
// components
import Typography from '../../../components/typography';
import Button from '../../../components/button';
// hook
import useAuth from '../../../hooks/useAuth';
// route
import {AUTH_ROUTES} from '../../../routes/paths';
// sections
// theme
import {ERROR} from '../../../theme';

// ----------------------------------------------------------------------
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    width: '100%',
  },

  form: {
    gap: 40,
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
});

// ----------------------------------------------------------------------

const registerValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  password_confirmation: yup
    .string()
    .min(8, ({min}) => `Confirm password must be at least ${min} characters`)
    .required('Confirm password is required'),
});

// ----------------------------------------------------------------------

export default function CreatePassForm() {
  const {createPass} = useAuth();
  const accessToken = AsyncStorage.getItem('accessToken');
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {toast} = useToast();

  const onSubmit = async data => {
    setIsLoading(true);
    try {
      await createPass({
        token: accessToken,
        password: data.password,
      });
      navigation.navigate(AUTH_ROUTES.login);
    } catch (error) {
      toast({message: error.message, intent: 'ERROR'});
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        validationSchema={registerValidationSchema}
        initialValues={{email: '', password: ''}}
        onSubmit={onSubmit}>
        {({handleChange, handleSubmit, values, errors}) => (
          <Stack style={styles.form}>
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
                  name="password_confirmation"
                  style={styles.passwordInput}
                  placeholder="Confirm password"
                  secureTextEntry={!showConfirmPassword}
                  onChangeText={handleChange('password_confirmation')}
                  value={values.password_confirmation}
                />
                <IconButton
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                  icon={<Icon name="eye-outline" size={20} color="#939393" />}
                />
              </Stack>
              {errors.password_confirmation && (
                <Typography color={ERROR.main}>
                  {errors.password_confirmation}
                </Typography>
              )}
            </Stack>
            <Button isLoading={isLoading} onPress={handleSubmit}>
              Reset Password
            </Button>
          </Stack>
        )}
      </Formik>
    </View>
  );
}
