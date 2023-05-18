import React, {useEffect, useState} from 'react';

// react-native
import {StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
// mui
import {Badge, Stack} from '@react-native-material/core';
// layouts
import Layout from '../../../layouts';
// screens
// components
import Container from '../../../components/container';
import Typography from '../../../components/typography';
import LoadingScreen from '../../../components/loadingScreen';
// sections
// routes
// redux
import {dispatch, useSelector} from '../../../redux/store';
import {FOOD_SELECTOR, getOrders} from '../../../redux/slices/food';
// theme
import {SUCCESS} from '../../../theme';

// ----------------------------------------------------------------------

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
});

// ----------------------------------------------------------------------

export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const {orders: allOrders} = useSelector(FOOD_SELECTOR);
  const orders = allOrders?.filter(item => item?.status !== 'initiated');

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      await dispatch(getOrders());
      setIsLoading(false);
    };

    fetch();
  }, []);
  return isLoading ? (
    <LoadingScreen />
  ) : (
    <Layout variant="dashboard">
      <Container>
        <Stack gap={20}>
          <Typography variant="h6" fontWeight="bold">
            Orders
          </Typography>
          {orders?.length === 0 ? (
            <Typography textAlign="center">There is no data.</Typography>
          ) : (
            orders?.map((item, _i) => (
              <Card key={_i} style={styles.card}>
                <Stack gap={5}>
                  <Stack direction="row" justify="between">
                    <Typography variant="subtitle1">Order Number :</Typography>
                    <Typography>#{item?.order_num}</Typography>
                  </Stack>
                  <Stack direction="row" justify="between">
                    <Typography variant="subtitle1">Order Date :</Typography>
                    <Typography>{item?.order_date}</Typography>
                  </Stack>
                  <Stack direction="row" justify="between">
                    <Typography variant="subtitle1">Chef :</Typography>
                    <Typography>
                      {item?.chef?.first_name} {item?.chef?.last_name}
                    </Typography>
                  </Stack>
                  <Stack direction="row" justify="between">
                    <Typography variant="subtitle1">Price :</Typography>
                    <Typography>${item?.sub_total}</Typography>
                  </Stack>
                  <Stack direction="row" justify="between">
                    <Typography variant="subtitle1">Status :</Typography>
                    <Badge
                      style={styles.badge}
                      color={SUCCESS.main}
                      label={item?.status}
                    />
                  </Stack>
                </Stack>
              </Card>
            ))
          )}
        </Stack>
      </Container>
    </Layout>
  );
}
