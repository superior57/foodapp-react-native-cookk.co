import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

// react-native
import {
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
// mui
import {IconButton, Stack} from '@react-native-material/core';
// layouts
import Layout from '../../../layouts';
// screens
// components
import Container from '../../../components/container';
import Typography from '../../../components/typography';
import Button from '../../../components/button';
import Accordion from '../../../components/accordion';
// sections
// routes
// theme
import {PRIMARY, SECONDARY} from '../../../theme';
// redux
import {useDispatch, useSelector} from '../../../redux/store';
import {CITYCUISINE_SELECTOR, getFaqs} from '../../../redux/slices/city';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  form: {padding: 20, gap: 20},

  input: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  multilineInput: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  iconButton: {
    backgroundColor: PRIMARY.main,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 100,
    width: 50,
    height: 50,
  },
});

// ----------------------------------------------------------------------

export default function ContactUs() {
  const dispatch = useDispatch();
  const {faqs} = useSelector(CITYCUISINE_SELECTOR);

  useEffect(() => {
    dispatch(getFaqs());
  }, [dispatch]);

  return (
    <Layout variant="main">
      <Container>
        <ImageBackground
          source={require('../../../assets/images/contactUs/form.png')}>
          <Stack style={styles.form}>
            <Typography variant="h5" color={SECONDARY.main}>
              Ask a question
            </Typography>
            <TextInput style={styles.input} placeholder="Full name" />
            <TextInput style={styles.input} placeholder="Email address" />
            <TextInput
              multiline
              style={styles.multilineInput}
              textAlignVertical="top"
              numberOfLines={8}
              placeholder="Your message"
            />
            <Stack direction="row" justify="between">
              <Button
                paddingHorizontal={40}
                fontWeight={900}
                borderRadius={100}>
                Ask a question
              </Button>
              <IconButton
                icon={
                  <TouchableOpacity onPress={() => {}}>
                    <Stack style={styles.iconButton}>
                      <Icon name="phone" size={15} color={'white'} />
                    </Stack>
                  </TouchableOpacity>
                }
              />
            </Stack>
          </Stack>
        </ImageBackground>

        <Stack>
          <View padding={10}>
            <Typography variant="h6" fontWeight="900" color={SECONDARY.dark}>
              General questions
            </Typography>
          </View>
          <Accordion accordions={faqs} />
        </Stack>
      </Container>
    </Layout>
  );
}
