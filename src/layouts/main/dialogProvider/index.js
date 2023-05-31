import React, {useEffect, useState} from 'react';

// react-native
// mui
// redux
import {useSelector} from '../../../redux/store';
import {DIALOG_SELECTOR} from '../../../redux/slices/dialog';
// layouts
// screens
// components
// sections
import CityDialog from '../../../sections/main/home/cityDialog';
// import CuisineDialog from '../../../sections/main/home/cuisineDialog';
// routes
// theme

// ----------------------------------------------------------------------

export default function DialogProvider({children}) {
  const {currentDialog} = useSelector(DIALOG_SELECTOR);
  // const [isOpenCuisineDialogIsOpen, setIsOpenCuisineDialogIsOpen] =
  //   useState(false);
  const [isOpenCityDialogIsOpen, setIsOpenCityDialogIsOpen] = useState(false);
  const isOpenCityDialog = currentDialog === 'choose_city_dialog';
  // const isOpenCuisineDialog = currentDialog === 'choose_cuisine_dialog';

  // useEffect(() => {
  //   setIsOpenCuisineDialogIsOpen(isOpenCuisineDialog);
  // }, [isOpenCuisineDialog]);

  useEffect(() => {
    setIsOpenCityDialogIsOpen(isOpenCityDialog);
  }, [isOpenCityDialog]);

  return (
    <>
      {/* <CuisineDialog isOpen={isOpenCuisineDialogIsOpen} /> */}
      <CityDialog isOpen={isOpenCityDialogIsOpen} />
      {children}
    </>
  );
}
