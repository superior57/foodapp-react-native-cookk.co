import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Divider} from 'react-native-paper';
// mui
import {Dialog, Stack} from '@react-native-material/core';
// redux
// layouts
// screens
// components
import Typography from '../../../../../../components/typography';
import Container from '../../../../../../components/container';
import Button from '../../../../../../components/button';
// sections
import CartCountBox from './cartCountBox';
// routes
// theme
import {GREY, SECONDARY} from '../../../../../../theme';
import useAuth from '../../../../../../hooks/useAuth';
import {useSelector} from '../../../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../../../redux/slices/food';
import {useNavigation} from '@react-navigation/native';
import {AUTH_ROUTES} from '../../../../../../routes/paths';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  content: {height: 500},

  multilineInput: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: GREY[400],
  },

  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    padding: 3,
  },

  closeIcon: {borderRadius: 20, padding: 2},

  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
    height: 200,
  },
});

// ----------------------------------------------------------------------

export default function CartDetailDialog({
  data,
  setSelectedData,
  onSubmit,
  ...other
}) {
  const navigation = useNavigation();
  const {isAuthenticated} = useAuth();
  const [orderCount, setOrderCount] = useState();
  const [note, setNote] = useState();
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;

  useEffect(() => {
    if (other.visible) {
      setNote(cart?.find(item => item?.id === data?.id)?.notes ?? '');
      setOrderCount(
        cart?.find(item => item?.id === data?.id) ? 1 : data?.min_order ?? 1,
      );
    }
  }, [other.visible]);

  const submit = () => {
    if (isAuthenticated) {
      data.notes = note;
      data.count = orderCount;
      setSelectedData(data);
      onSubmit();
    } else {
      navigation.navigate(AUTH_ROUTES.login);
      other.onDismiss();
    }
  };

  return (
    <Dialog {...other}>
      <View>
        <TouchableOpacity onPress={other.onDismiss} style={styles.closeButton}>
          <Icon
            name="close"
            backgroundColor="white"
            color={SECONDARY.main}
            size={20}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <ScrollView style={styles.content}>
          <Stack>
            <Image
              source={{uri: data?.image_url}}
              style={styles.image}
              resizeMode="cover"
            />
            <Container>
              <Stack gap={10}>
                <Typography
                  variant="subtitle1"
                  color={SECONDARY.main}
                  fontWeight="bold">
                  {data?.title}
                </Typography>
                <Stack direction="row" justify="between">
                  <Typography fontWeight={600}>
                    {`$${data?.current_price} /${data?.quantity} ${
                      data?.measurement || ''
                    }`}
                  </Typography>
                  <CartCountBox
                    foodId={data?.id}
                    value={orderCount}
                    minOrder={data?.min_order}
                    onChange={val => {
                      setOrderCount(val);
                    }}
                  />
                </Stack>
                {data?.min_order > 1 && (
                  <Typography variant="caption">
                    min orders {`${data?.min_order} ${data?.measurement || ''}`}
                  </Typography>
                )}
                <Stack>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Description
                  </Typography>
                  <Typography variant="caption">{data?.description}</Typography>
                </Stack>
                <Stack>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Ingredients
                  </Typography>
                  <Typography variant="caption">{data?.ingredients}</Typography>
                </Stack>
                <Divider />
                <Stack>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Allergy warning
                  </Typography>
                  <Typography variant="caption">
                    Please be aware that the ingredients mentioned are the
                    primary ones, and the food could contain allergens such as
                    milk, peanuts, tree nuts, wheat, dairy, eggs, fish,
                    shellfish, soy, or sesame.
                  </Typography>
                </Stack>
                <Divider />
                <Stack gap={10}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    Notes
                  </Typography>
                  <TextInput
                    onChangeText={setNote}
                    defaultValue={note}
                    multiline
                    style={styles.multilineInput}
                    textAlignVertical="top"
                    numberOfLines={4}
                  />
                </Stack>
                <Button color={SECONDARY.main} onPress={submit}>
                  Add to cart
                </Button>
              </Stack>
            </Container>
          </Stack>
        </ScrollView>
      </View>
    </Dialog>
  );
}
