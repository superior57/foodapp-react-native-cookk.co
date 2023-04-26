import React from 'react';
import PropTypes from 'prop-types';
// react-native
// @mui
// layouts
import MainLayout from './main';
import DashboardLayout from './dashboard';
import AuthLayout from './auth';
// components
// sections

// ----------------------------------------------------------------------

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['dashboard', 'main', 'auth']),
};

export default function Layout({variant = 'auth', children}) {
  if (variant === 'main') {
    return <MainLayout>{children}</MainLayout>;
  }
  if (variant === 'auth') {
    return <AuthLayout>{children}</AuthLayout>;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}
