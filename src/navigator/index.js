// React Native Navigation Drawer – Example using Latest Navigation Version //
// https://aboutreact.com/react-native-navigation-drawer //
import 'react-native-gesture-handler';
import * as React from 'react';

// @react-navigation
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
// @mui
// layouts
// components
import AuthHeader from '../layouts/auth/authHeader';
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import ForgotPass from '../screens/auth/forgotPass';
import CreatePass from '../screens/auth/createPass';
// sections

// ----------------------------------------------------------------------

const Drawer = createDrawerNavigator();

// ----------------------------------------------------------------------

export default function Navigator() {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        screenOptions={{
          headerLeft: <AuthHeader />,
          headerShown: false,
        }}>
        <Drawer.Screen
          name="Login"
          options={{drawerLabel: 'Log in'}}
          component={Login}
        />
        <Drawer.Screen
          name="Register"
          options={{drawerLabel: 'Register'}}
          component={Register}
        />
        <Drawer.Screen
          name="ForgotPass"
          options={{drawerLabel: 'Forgot Password'}}
          component={ForgotPass}
        />
        <Drawer.Screen
          name="CreatePass"
          options={{drawerLabel: 'Create Password'}}
          component={CreatePass}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
