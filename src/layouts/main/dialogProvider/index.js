import React, {useState, useEffect} from 'react';
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
  const {current: openedDialog} = useSelector(DIALOG_SELECTOR);

  const isOpenComingDialog = openedDialog === 'coming_dialog';
  const isOpenCityDialog = openedDialog === 'choose_city_dialog';
  const isOpenCuisineDialog = openedDialog === 'choose_cuisine_dialog';

  const [comingDialogIsOpen, setComingDialogIsOpen] = useState(false);
  const [cityDialogIsOpen, setCityDialogIsOpen] = useState(false);
  const [cuisineDialogIsOpen, setCuisineDialogIsOpen] = useState(false);

  useEffect(() => {
    setComingDialogIsOpen(isOpenComingDialog);
  }, [isOpenComingDialog]);

  useEffect(() => {
    setCityDialogIsOpen(isOpenCityDialog);
  }, [isOpenCityDialog]);

  useEffect(() => {
    setCuisineDialogIsOpen(isOpenCuisineDialog);
  }, [isOpenCuisineDialog]);

  return (
    <>
      <CuisineDialog isOpen={cuisineDialogIsOpen} />
      {children}
    </>
  );
}
