import React, {useState} from 'react';
import CuisineDialog from '../../../sections/main/home/cuisineDialog';

// react-native
// mui
import {Provider} from '@react-native-material/core';
// layouts
// screens
// components
// sections
// routes
// theme

// ----------------------------------------------------------------------

export default function DialogProvider({children}) {
  const [cuisineDialogIsOpen, setCuisineDialogIsOpen] = useState(false);

  return (
    <Provider>
      <CuisineDialog isOpen={cuisineDialogIsOpen} />
      {children}
    </Provider>
  );
}
