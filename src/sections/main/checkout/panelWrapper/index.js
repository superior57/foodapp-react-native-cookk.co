import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// react-native
import {StyleSheet, View} from 'react-native';
// mui
import {Divider, Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Typography from '../../../../components/typography';
// sections
// routes
// redux
// theme
import {GREY, SECONDARY} from '../../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GREY[400],
  },

  header: {
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
  },

  icon: {
    backgroundColor: SECONDARY.main,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    width: 25,
    height: 25,
    borderRadius: 100,
  },

  body: {
    paddingVertical: 20,
  },
});

// ----------------------------------------------------------------------

export default function PanelWrapper({
  icon,
  title = '',
  subtitle = '',
  children,
}) {
  return (
    <Stack style={styles.wrapper}>
      <Stack direction="row" justify="between" style={styles.header}>
        <Stack direction="row" gap={10}>
          <Stack style={styles.icon}>
            <Icon name={icon} color="white" />
          </Stack>
          <Typography
            variant="subtitle1"
            color={SECONDARY.main}
            fontWeight="bold">
            {title}
          </Typography>
        </Stack>
        <Typography variant="subtitle2">{subtitle}</Typography>
      </Stack>
      <Divider />
      <View style={styles.body}>{children}</View>
    </Stack>
  );
}
