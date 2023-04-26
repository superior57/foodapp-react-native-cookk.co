import React from 'react';
import {List} from 'react-native-paper';
import Typography from '../typography';

// react-native
// mui
// layouts
// screens
// components
// sections
// routes
// theme

// ----------------------------------------------------------------------

export default function Accordion({accordions}) {
  return (
    <List.Section>
      {accordions.map((item, _i) => (
        <List.Accordion key={_i} title={item?.question}>
          <Typography>{item.answer}</Typography>
        </List.Accordion>
      ))}
    </List.Section>
  );
}
