import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Fontisto';

// react-native
import {
  Image,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Divider} from 'react-native-paper';
// mui
import {Stack} from '@react-native-material/core';
// layouts
// screens
// components
import Button from '../../../../components/button';
import Container from '../../../../components/container';
import Typography from '../../../../components/typography';
// sections
// routes
// theme
import {ERROR, SECONDARY} from '../../../../theme';
// redux
import {dispatch, useSelector} from '../../../../redux/store';
import {CITYCUISINE_SELECTOR} from '../../../../redux/slices/city';
import {openDialog} from '../../../../redux/slices/dialog';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    width: '100%',
  },

  inputGroup: {
    position: 'relative',
    marginBottom: 10,
  },

  input: {
    height: 42,
    paddingLeft: 40,
    paddingRight: 100,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
  },

  searchIcon: {
    position: 'absolute',
    padding: 10,
    left: 0,
  },

  searchButton: {
    position: 'absolute',
    right: 0,
  },

  buttonGroup: {
    paddingVertical: 20,
  },

  banner: {
    position: 'relative',
    backgroundColor: SECONDARY.main,
    height: 40,
    alignItems: 'center',
    marginTop: 40,
  },

  bannerImage: {
    position: 'absolute',
  },
});

// ----------------------------------------------------------------------

export default function HeroHeader({setChefsArray}) {
  const {chefs} = useSelector(CITYCUISINE_SELECTOR);
  const [warnningMsg, setWarnningMsg] = useState();
  const [searchKey, setSearchKey] = useState('');
  const [status, setStatus] = useState(false);

  const searchChefs = key => {
    if (key.length > 3) {
      setWarnningMsg();
      const filteredArray = chefs.filter(
        item =>
          Object.values(item.chef).some(
            val =>
              typeof val === 'string' &&
              val.toLowerCase().includes(key.toLowerCase()),
          ) ||
          item.foods.find(food =>
            Object.values(food).some(
              val =>
                typeof val === 'string' &&
                val.toLowerCase().includes(key.toLowerCase()),
            ),
          ),
      );
      setChefsArray(filteredArray);
    } else {
      if (key.length > 1 && key.length < 4) {
        setWarnningMsg('requires at least 4 letters');
      } else {
        setWarnningMsg();
      }
      setChefsArray(chefs);
    }
  };

  useEffect(() => {
    if (searchKey === '') {
      setStatus(false);
    }
  }, [searchKey]);

  const onSubmit = () => {
    if (searchKey !== '') {
      setStatus(!status);
      if (status) {
        setSearchKey('');
        searchChefs('');
      } else {
        searchChefs(searchKey);
      }
    } else {
      setChefsArray(chefs);
    }
  };

  return (
    <Stack style={styles.wrapper}>
      <Container>
        <Stack style={styles.inputGroup}>
          <TextInput
            onChangeText={value => setSearchKey(value)}
            value={searchKey}
            style={styles.input}
            placeholder="Search for a meal, cuisine ..."
          />
          <View style={styles.searchIcon}>
            <Icon size={20} name="search" />
          </View>
          <View style={styles.searchButton}>
            <Button
              onPress={onSubmit}
              variant={status ? 'outlined' : 'contained'}
              color={SECONDARY.main}
              width={90}>
              {status ? 'Clear' : 'Search'}
            </Button>
          </View>
        </Stack>
        <Typography color={ERROR.main}>{warnningMsg}</Typography>
        <Stack direction="row" wrap="wrap" gap={20} style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={() => dispatch(openDialog('choose_city_dialog'))}>
            <Typography color={SECONDARY.main} fontWeight="bold">
              Select a different city
            </Typography>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSearchKey('');
              searchChefs('');
            }}>
            <Typography color={SECONDARY.main} fontWeight="bold">
              All Chefs
            </Typography>
          </TouchableOpacity>
        </Stack>
        <Divider />
        <Stack style={styles.banner} justify="center">
          <Image
            style={styles.bannerImage}
            source={require('../../../../assets/images/chefs/Texture.png')}
          />
          <Typography variant="subtitle1" color="white">
            Get free delivery on orders over $50
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}
