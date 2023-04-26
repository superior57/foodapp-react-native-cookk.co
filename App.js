/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// react-navigation
import {NavigationContainer} from '@react-navigation/native';
//navigator
import Navigator from './src/navigator';
// @mui
// layouts
// components
// sections

// ----------------------------------------------------------------------

function App() {
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

export default App;
