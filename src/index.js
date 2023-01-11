import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { Provider } from 'react-redux';
import { store } from './store/store';

import { UserProvider } from './contexts/users.contexts';
import { DropdownProvider } from './contexts/dropdown.context';
import { CartProvider } from './contexts/cart.context';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';

import { GlobalStyles } from './global.styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}> {/* a wrapping provider can access any child component but a child cannot access a parent */}
      <BrowserRouter>
          <DropdownProvider>
            <CartProvider>
              <Elements stripe={stripePromise}>
                <GlobalStyles />
                <App />
              </Elements>
            </CartProvider>
          </DropdownProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
