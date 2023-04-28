import React from 'react';

// react-native
import {View} from 'react-native';
// mui
// layouts
// screens
// components
import Accordion from '../../../../components/accordion';
import Typography from '../../../../components/typography';
// sections
// routes
// theme
// redux
import {useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR} from '../../../../redux/slices/city';

// ----------------------------------------------------------------------

export default function ContactUsDescription() {
  const {faqs} = useSelector(CITYCUISINE_SELECTOR);

  return (
    <View marginTop={20}>
      <View padding={10}>
        <Typography variant="h5">General questions</Typography>
      </View>
      <Accordion accordions={faqs} />
    </View>
  );
}
