import React from 'react';

// react-native
import {StyleSheet} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Avatar from '../../../components/avatar';
import Typography from '../../../components/typography';
// sections
// routes
// hook
import useAuth from '../../../hooks/useAuth';
// redux
// theme
import {GREY} from '../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },

  content: {
    width: 230,
  },
});

// ----------------------------------------------------------------------

export default function UserInfo() {
  const {user: userInfo} = useAuth();
  const {user} = userInfo ?? {};
  return (
    <Stack direction="row" gap={20} style={styles?.wrapper}>
      <Avatar
        size={100}
        image={userInfo?.image}
        firstName={user?.first_name}
        lastName={user?.last_name}
      />
      <Stack style={styles.content}>
        <Typography variant="h5" fontWeight="bold">
          Hello {user?.first_name}
        </Typography>
        <Typography variant="body1" color={GREY[600]}>
          {user?.email}
        </Typography>
      </Stack>
    </Stack>
  );
}
