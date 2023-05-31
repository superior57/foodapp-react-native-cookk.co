import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// react-native
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
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
import {GREY, SECONDARY, SUCCESS} from '../../../../../../theme';
import useAuth from '../../../../../../hooks/useAuth';
import {useSelector} from '../../../../../../redux/store';
import {FOOD_SELECTOR} from '../../../../../../redux/slices/food';
import {useNavigation} from '@react-navigation/native';
import {AUTH_ROUTES} from '../../../../../../routes/paths';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  content: {
    position: 'relative',
    borderRadius: 5,
    width: '130%',
    left: '-15%',
    height: 600,
    backgroundColor: 'white',
    zIndex: 10,
  },

  multilineInput: {
    height: 100,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: GREY[400],
  },

  closeButton: {
    borderRadius: 50,
    position: 'absolute',
    backgroundColor: 'white',
    right: -35,
    top: 5,
    zIndex: 99999,
    padding: 5,
  },

  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    width: '100%',
    height: 300,
  },
});

// ----------------------------------------------------------------------

export default function CartDetailDialog({
  data,
  foods,
  setSelectedData,
  onSubmit,
  ...other
}) {
  const navigation = useNavigation();
  const {isAuthenticated} = useAuth();
  const [orderCount, setOrderCount] = useState();
  const [note, setNote] = useState();
  const [similiarFoods, setSimiliarFoods] = useState();
  const {checkout} = useSelector(FOOD_SELECTOR);
  const {cart} = checkout;

  useEffect(() => {
    if (other.visible) {
      const temp = foods?.filter(
        item =>
          item.title.split('with')[0] === data.title.split('with')[0] &&
          item.id !== data.id,
      );
      setSimiliarFoods(temp);
      setNote(cart?.find(item => item?.id === data?.id)?.notes ?? '');
      setOrderCount(
        cart?.find(item => item?.id === data?.id) ? 1 : data?.min_order ?? 1,
      );
    }
  }, [other.visible, data?.id]);

  const submit = () => {
    if (isAuthenticated) {
      const temp = {...data};
      temp.notes = note;
      temp.count = orderCount;
      setSelectedData(temp);
      onSubmit(temp);
    } else {
      navigation.navigate(AUTH_ROUTES.login);
      other.onDismiss();
    }
  };

  return (
    <Dialog {...other}>
      <TouchableOpacity onPress={other.onDismiss} style={styles.closeButton}>
        <Icon
          name="close"
          backgroundColor="white"
          color={SECONDARY.main}
          size={20}
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
            <Stack gap={30}>
              <Stack gap={10}>
                <Typography
                  variant="subtitle1"
                  color={SECONDARY.main}
                  fontWeight="bold">
                  {data?.title}
                </Typography>
                <Stack
                  direction="row"
                  justify="between"
                  style={{alignItems: 'center'}}>
                  <Stack gap={5}>
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      color={SUCCESS.main}>
                      {`$${data?.current_price} /${data?.quantity} ${
                        data?.measurement || ''
                      }`}
                    </Typography>
                    {data?.min_order > 1 && (
                      <Typography>
                        min orders{' '}
                        {`${data?.min_order} ${data?.measurement || ''}`}
                      </Typography>
                    )}
                  </Stack>
                  <CartCountBox
                    foodId={data?.id}
                    value={orderCount}
                    minOrder={data?.min_order}
                    onChange={val => {
                      setOrderCount(val);
                    }}
                  />
                </Stack>
              </Stack>
              {similiarFoods?.length > 0 && (
                <Stack>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color={SECONDARY.main}>
                    {'Similiar food'}
                  </Typography>
                  {similiarFoods.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => setSelectedData(item)}>
                      <Typography variant="subtitle2" color={GREY[600]}>
                        {item.title} -{' '}
                        {`$${item.current_price} /${item.quantity} ${
                          item.measurement || ''
                        }`}
                      </Typography>
                    </TouchableOpacity>
                  ))}
                </Stack>
              )}
              <Stack gap={5}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Description
                </Typography>
                <Divider />
                <Typography>{data?.description}</Typography>
              </Stack>
              <Stack gap={5}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Ingredients
                </Typography>
                <Divider />
                <Typography>{data?.ingredients}</Typography>
              </Stack>
              <Stack gap={5}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Allergy warning
                </Typography>
                <Divider />
                <Typography>
                  Please be aware that the ingredients mentioned are the primary
                  ones, and the food could contain allergens such as milk,
                  peanuts, tree nuts, wheat, dairy, eggs, fish, shellfish, soy,
                  or sesame.
                </Typography>
              </Stack>
              <Stack gap={10}>
                <Typography variant="subtitle1" fontWeight="bold">
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
    </Dialog>
  );
}
