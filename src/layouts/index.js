import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
// layouts
import MainLayout from './main';
import AuthLayout from './auth';
import DashboardLayout from './dashboard';

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['dashboard', 'main', 'auth']),
};

export default function Layout({variant = 'dashboard', children}) {
  if (variant === 'main') {
    return (
      <View>
        <MainLayout>{children}</MainLayout>
      </View>
    );
  }
  if (variant === 'auth') {
    return (
      <View>
        <AuthLayout>{children}</AuthLayout>
      </View>
    );
  }

  return (
    <View>
      <DashboardLayout>{children}</DashboardLayout>
    </View>
  );
}
