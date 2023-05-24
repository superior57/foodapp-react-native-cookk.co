import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';

// react-native
import {StyleSheet} from 'react-native';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../typography';
import {TouchableOpacity} from 'react-native';
// sections
// routes
// redux
// theme
import {GREY, PRIMARY} from '../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    marginBottom: 30,
  },

  button: {
    position: 'absolute',
    right: 0,
    bottom: -20,
  },
});

// ----------------------------------------------------------------------

export default function ReadMore({children}) {
  const [isReadMore, setIsReadMore] = useState(true);

  return (
    <Stack style={styles.wrapper}>
      <Typography color={GREY[700]}>
        {isReadMore ? `${children?.slice(0, 150)} ...` : children}
      </Typography>
      <TouchableOpacity
        onPress={() => setIsReadMore(!isReadMore)}
        style={styles.button}>
        <Stack direction="row">
          <Typography>{isReadMore ? 'Read more' : 'show less'}</Typography>
          <Icon name={'arrow-up-right'} size={20} color={PRIMARY.main} />
        </Stack>
      </TouchableOpacity>
    </Stack>
  );
}
