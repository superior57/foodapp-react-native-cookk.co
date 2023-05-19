/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {ToastProvider} from 'react-native-styled-toast';
import {DefaultTheme} from 'react-native-paper';
import TipProvider from 'react-native-tip';
// react-navigation
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
// theme
import {ThemeProvider} from 'styled-components';
import {AuthProvider} from './src/contexts/JWTContext';

// ----------------------------------------------------------------------

const theme = {
  ...DefaultTheme,
  space: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  colors: {
    text: '#0A0A0A',
    background: '#FFF',
    border: '#E2E8F0',
    muted: '#F0F1F3',
    success: '#7DBE31',
    error: '#FC0021',
    info: '#00FFFF',
  },
};

// ----------------------------------------------------------------------

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <ReduxProvider store={store}>
            <Provider>
              <Navigator />
            </Provider>
          </ReduxProvider>
        </ToastProvider>
      </ThemeProvider>
      <TipProvider />
    </AuthProvider>
  );
}

export default App;
