import React, {useEffect} from 'react';

// react-native
// mui
// layouts
// screens
// components
import Accordion from '../../../../components/accordion';
// sections
// routes
// theme
// redux
import {useDispatch, useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR, getFaqs} from '../../../../redux/slices/city';

// ----------------------------------------------------------------------

export default function ContactUsDescription() {
  const dispatch = useDispatch();
  const {faqs} = useSelector(CITYCUISINE_SELECTOR);

  useEffect(() => {
    dispatch(getFaqs());
  }, [dispatch]);

  return <Accordion accordions={faqs} />;
}
