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
// redux
import {store} from './src/redux/store';
import {Provider as ReduxProvider} from 'react-redux';
import {Provider} from '@react-native-material/core';
// @mui
// layouts
// components
// sections

// ----------------------------------------------------------------------

function App() {
  return (
    <ReduxProvider store={store}>
      <Provider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </Provider>
    </ReduxProvider>
  );
}

export default App;
