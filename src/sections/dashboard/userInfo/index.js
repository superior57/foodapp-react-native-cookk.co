import React, {useState} from 'react';

// react-native
import {StyleSheet, TouchableOpacity} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
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
  const {user: userInfo, updateAvatar} = useAuth();
  const {user} = userInfo ?? {};
  const [passport, setPassport] = useState();

  const pickPassport = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: false,
      });
      setPassport(res[0]);
      const formData = new FormData();
      formData.append('image', passport);
      updateAvatar(formData);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log(error);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Stack direction="row" gap={20} style={styles?.wrapper}>
      <TouchableOpacity
        style={styles.upload}
        onPress={() => {
          pickPassport();
        }}>
        <Avatar
          size={100}
          image={passport?.uri ?? userInfo?.image}
          firstName={user?.first_name}
          lastName={user?.last_name}
        />
      </TouchableOpacity>
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
