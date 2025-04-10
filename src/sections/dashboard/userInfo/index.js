import React, {useState} from 'react';

// react-native
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
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

  avatarWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
  },

  backdrop: {
    borderRadius: 50,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: 230,
  },
});

// ----------------------------------------------------------------------

export default function UserInfo() {
  const {user, updateAvatar} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const pickPassport = async () => {
    try {
      setIsLoading(true);
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        allowMultiSelection: false,
      });
      const formData = new FormData();
      formData.append('image', res[0]);
      await updateAvatar(formData);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
        disabled={isLoading}
        style={styles.upload}
        onPress={() => {
          pickPassport();
        }}>
        <View style={styles.avatarWrapper}>
          <Avatar
            size={100}
            image={user?.image}
            firstName={user?.user?.first_name}
            lastName={user?.user?.last_name}
          />
          {isLoading && (
            <Stack style={styles.backdrop}>
              <ActivityIndicator color="white" />
            </Stack>
          )}
        </View>
      </TouchableOpacity>
      <Stack style={styles.content}>
        <Typography variant="h5" fontWeight="bold">
          Hello {user?.user?.first_name}
        </Typography>
        <Typography variant="body1" color={GREY[600]}>
          {user?.user?.email}
        </Typography>
      </Stack>
    </Stack>
  );
}
