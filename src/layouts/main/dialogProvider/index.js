import React, {useEffect, useState} from 'react';
import CuisineDialog from '../../../sections/main/home/cuisineDialog';

// react-native
// mui
// redux
import {useSelector} from '../../../redux/store';
import {DIALOG_SELECTOR} from '../../../redux/slices/dialog';
// layouts
// screens
// components
// sections
// routes
// theme

// ----------------------------------------------------------------------

export default function DialogProvider({children}) {
  const {currentDialog} = useSelector(DIALOG_SELECTOR);
  const [isOpenCuisineDialog, setIsOpenCuisineDialog] = useState(false);
  useEffect(() => {
    setIsOpenCuisineDialog(currentDialog === 'choose_cuisine_dialog');
  }, [currentDialog]);

  return (
    <>
      <CuisineDialog isOpen={isOpenCuisineDialog} />
      {children}
    </>
  );
}
