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

export default function Avatar({image, firstName, lastName}) {
  return image ? (
    <AvatarImage.Image size={25} source={{uri: image}} />
  ) : (
    <AvatarImage.Text
      size={25}
      label={`${createAvatar(firstName).name}${createAvatar(lastName).name}`}
    />
  );
}
