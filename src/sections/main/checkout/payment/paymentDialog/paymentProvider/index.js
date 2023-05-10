import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const PaymentProvider = ({publicKey, clientSecret, children}) => (
  <Elements stripe={loadStripe(publicKey || '')} options={{clientSecret}}>
    {children}
  </Elements>
);

export default PaymentProvider;
