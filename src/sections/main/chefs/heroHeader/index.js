import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    width: '100%',
    paddingVertical: 20,
    justifyContent: 'space-between',
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

  filterItem: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 80,
  },
});

// ----------------------------------------------------------------------

export default function HeroHeader({setChefsArray, setSearchIsLoading}) {
  const {chefs} = useSelector(CITYCUISINE_SELECTOR);
  const [warnningMsg, setWarnningMsg] = useState();
  const [searchKey, setSearchKey] = useState('');
  const [status, setStatus] = useState(false);

  const searchChefs = key => {
    if (key.length > 3) {
      setWarnningMsg();
      const filteredArray = chefs.filter(
        item =>
          item.chef.birth_place.toLowerCase().includes(key.toLowerCase()) ||
          item.foods.find(food =>
            food.title.toLowerCase().includes(key.toLowerCase()),
          ) ||
          item.foods.find(food =>
            food.cuisine.name.toLowerCase().includes(key.toLowerCase()),
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

  const searchLoading = () => {
    setSearchIsLoading(true);
    setTimeout(() => {
      setSearchIsLoading(false);
    }, 500);
  };

  const filterChefsByHalal = () => {
    searchLoading();
    const filteredArray = chefs.filter(item => item.chef.halal);
    setChefsArray(filteredArray);
  };

  const filterChefsByCatering = () => {
    searchLoading();
    const filteredArray = chefs.filter(item => item.chef.catering);
    setChefsArray(filteredArray);
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
        searchLoading();
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
            onChangeText={value => {
              setSearchKey(value);
              setStatus(false);
            }}
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
        {warnningMsg && (
          <Typography color={ERROR.main}>{warnningMsg}</Typography>
        )}
        <Stack direction="row" style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={() => dispatch(openDialog('choose_city_dialog'))}>
            <Stack style={styles.filterItem} justify="center">
              <Image
                style={{width: 50}}
                resizeMode="contain"
                source={require('../../../../assets/images/chefs/another-city.png')}
              />
              <Typography color={SECONDARY.main} fontWeight="bold">
                Another City
              </Typography>
            </Stack>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              searchLoading();
              setSearchKey('EurAsian');
              searchChefs('eurasian');
            }}>
            <Stack style={styles.filterItem} gap={10}>
              <Image
                source={require('../../../../assets/images/chefs/eurasian.png')}
              />
              <Typography color={SECONDARY.main} fontWeight="bold">
                EurAsian
              </Typography>
            </Stack>
          </TouchableOpacity>
          <TouchableOpacity>
            <Stack style={styles.filterItem}>
              <Image
                source={require('../../../../assets/images/chefs/cakes.png')}
              />
              <Typography color={SECONDARY.main} fontWeight="bold">
                Cakes
              </Typography>
            </Stack>
          </TouchableOpacity>
          <TouchableOpacity onPress={filterChefsByHalal}>
            <Stack style={styles.filterItem} gap={5}>
              <Image
                source={require('../../../../assets/images/chefs/halal.png')}
              />
              <Typography color={SECONDARY.main} fontWeight="bold">
                Halal
              </Typography>
            </Stack>
          </TouchableOpacity>
          <TouchableOpacity onPress={filterChefsByCatering}>
            <Stack style={styles.filterItem} gap={10}>
              <Image
                source={require('../../../../assets/images/chefs/catering.png')}
              />
              <Typography color={SECONDARY.main} fontWeight="bold">
                Catering
              </Typography>
            </Stack>
          </TouchableOpacity>
        </Stack>
        <Divider />
        <Stack style={styles.banner} justify="center">
          <Image
            style={styles.bannerImage}
            source={require('../../../../assets/images/chefs/Texture.png')}
          />
          <Typography variant="subtitle1" color="white">
            Get free delivery on orders over $100
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}
