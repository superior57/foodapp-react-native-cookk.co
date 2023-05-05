import React from 'react';
import createAvatar from '../../utils/createAvatar';

// react-native
import {Avatar as AvatarImage} from 'react-native-paper';
// mui
// layouts
// screens
// components
// sections
// routes
// theme

// ----------------------------------------------------------------------

export default function Avatar({image, firstName, lastName, size}) {
  return image ? (
    <AvatarImage.Image size={size} source={{uri: image}} />
  ) : (
    <AvatarImage.Text
      size={size}
      label={`${createAvatar(firstName).name}${createAvatar(lastName).name}`}
    />
  );
}
