// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';
import * as React from 'react';

// @react-navigation
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
// @mui
// layouts
import AuthHeader from '../layouts/auth/authHeader';
// screens
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import ForgotPass from '../screens/auth/forgotPass';
import CreatePass from '../screens/auth/createPass';
import Home from '../screens/main/home';
import Chefs from '../screens/main/chefs';
import Cart from '../screens/main/cart';
import SingleChef from '../screens/main/singleChef';
import Checkout from '../screens/main/checkout';
import Confirm from '../screens/main/confirm';
import ContactUs from '../screens/main/contactUs';
import Profile from '../screens/dashboard/profile';
import Payments from '../screens/dashboard/payments';
import Orders from '../screens/dashboard/orders';
// components
// sections
import DrawerView from './drawer';
// routes
import {AUTH_ROUTES, DASHBOARD_ROUTES, SCREEN_ROUTES} from '../routes/paths';

// ----------------------------------------------------------------------

const Drawer = createDrawerNavigator();

// ----------------------------------------------------------------------

export default function Navigator() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName={SCREEN_ROUTES.home}
        drawerContent={() => <DrawerView />}
        screenOptions={{
          headerLeft: <AuthHeader />,
          headerShown: false,
        }}>
        <Drawer.Screen name={AUTH_ROUTES.login} component={Login} />
        <Drawer.Screen name={AUTH_ROUTES.register} component={Register} />
        <Drawer.Screen name={AUTH_ROUTES.forgotPass} component={ForgotPass} />
        <Drawer.Screen name={AUTH_ROUTES.createPass} component={CreatePass} />
        <Drawer.Screen name={SCREEN_ROUTES.home} component={Home} />
        <Drawer.Screen name={SCREEN_ROUTES.chefs} component={Chefs} />
        <Drawer.Screen name={SCREEN_ROUTES.cart} component={Cart} />
        <Drawer.Screen name={SCREEN_ROUTES.singleChef} component={SingleChef} />
        <Drawer.Screen name={SCREEN_ROUTES.checkout} component={Checkout} />
        <Drawer.Screen name={SCREEN_ROUTES.confirm} component={Confirm} />
        <Drawer.Screen name={SCREEN_ROUTES.contactUs} component={ContactUs} />
        <Drawer.Screen name={DASHBOARD_ROUTES.profile} component={Profile} />
        <Drawer.Screen name={DASHBOARD_ROUTES.payments} component={Payments} />
        <Drawer.Screen name={DASHBOARD_ROUTES.orders} component={Orders} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
