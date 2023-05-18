import React, {useState} from 'react';
import * as yup from 'yup';
import {Formik} from 'formik';
import Icon from 'react-native-vector-icons/Ionicons';

// react-native
import {TextInput, StyleSheet} from 'react-native';
import {useToast} from 'react-native-styled-toast';
// mui
import {IconButton, Stack} from '@react-native-material/core';
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
});
// ----------------------------------------------------------------------

const passwordValidationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .min(8, ({min}) => `Current password must be at least ${min} characters`)
    .required('Current password is required'),
  newPassword: yup
    .string()
    .min(8, ({min}) => `New password must be at least ${min} characters`)
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .min(8, ({min}) => `Confirm password must be at least ${min} characters`)
    .required('Confirm password is required'),
});

// ----------------------------------------------------------------------

export default function Password() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      validationSchema={passwordValidationSchema}
      initialValues={{
        first_name: '',
        last_name: '',
        username: '',
        phone_number: '',
        email: '',
        instagram: '',
        facebook: '',
      }}
      onSubmit={onSubmit}>
      {({handleChange, handleSubmit, values, errors}) => (
        <Stack gap={20}>
          <Typography variant="h6" fontWeight="bold">
            Update password
          </Typography>
          <Stack gap={5}>
            <Typography variant="subtitle">Current password</Typography>
            <Stack style={styles.passwordInputGroup}>
              <TextInput
                name="currentPassword"
                style={styles.passwordInput}
                secureTextEntry={!showCurrentPassword}
                onChangeText={handleChange('currentPassword')}
                value={values.currentPassword}
              />
              <IconButton
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                style={styles.eyeIcon}
                icon={<Icon name="eye-outline" size={20} color="#939393" />}
              />
            </Stack>
            {errors.currentPassword && (
              <Typography color={ERROR.main}>
                {errors.currentPassword}
              </Typography>
            )}
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">New password</Typography>
            <Stack style={styles.passwordInputGroup}>
              <TextInput
                name="newPassword"
                style={styles.passwordInput}
                secureTextEntry={!showNewPassword}
                onChangeText={handleChange('newPassword')}
                value={values.newPassword}
              />
              <IconButton
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.eyeIcon}
                icon={<Icon name="eye-outline" size={20} color="#939393" />}
              />
            </Stack>
            {errors.newPassword && (
              <Typography color={ERROR.main}>{errors.newPassword}</Typography>
            )}
          </Stack>
          <Stack gap={5}>
            <Typography variant="subtitle">Confirm password</Typography>
            <Stack style={styles.passwordInputGroup}>
              <TextInput
                name="confirmPassword"
                style={styles.passwordInput}
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
