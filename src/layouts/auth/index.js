import React from 'react';
// react-native
import {View} from 'react-native';
// prop-types
import PropTypes from 'prop-types';
// layouts
// components
// sections

// ----------------------------------------------------------------------
AuthLayout.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

export default function AuthLayout({children}) {
  return <View>{children}</View>;
}
