import React from 'react';
import {List} from 'react-native-paper';

// react-native
import {StyleSheet, View} from 'react-native';
// mui
// layouts
// screens
// components
import Typography from '../typography';
// sections
// routes
// theme

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  answer: {
    padding: 20,
    backgroundColor: 'white',
  },
});

// ----------------------------------------------------------------------

export default function Accordion({accordions}) {
  const [expanded, setExpanded] = React.useState();

  const handlePress = data => setExpanded(data === expanded ? null : data);

  return (
    <List.Section>
      {accordions.map((item, _i) => (
        <List.Accordion
          key={_i}
          title={item?.question}
          expanded={expanded === _i}
          onPress={() => handlePress(_i)}>
          <View style={styles.answer}>
            <Typography sx={{lineHeight: 20}}>{item.answer}</Typography>
          </View>
        </List.Accordion>
      ))}
    </List.Section>
  );
}
