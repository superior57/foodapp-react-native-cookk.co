import React from 'react';

// react-navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// react-native
import {View, Text, ScrollView} from 'react-native';
// @mui
// layouts
// components
import Login from '../screens/auth/login';
import Register from '../screens/auth/register';
import ForgotPass from '../screens/auth/forgotPass';
import CreatePass from '../screens/auth/createPass';
// sections

// ----------------------------------------------------------------------

const Stack = createNativeStackNavigator();

// ----------------------------------------------------------------------

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
        }}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="CreatePass" component={CreatePass} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
