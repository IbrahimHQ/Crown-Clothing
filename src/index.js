import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

import { UserProvider } from './contexts/users.contexts';
import { CategoriesProvider } from './contexts/categories.context'; 
import { DropdownProvider } from './contexts/dropdown.context';
import { CartProvider } from './contexts/cart.context';

import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './utils/stripe/stripe.utils';

import { GlobalStyles } from './global.styles';
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CategoriesProvider> {/* placed inside UserProvider so products can fetch user info */}
          <DropdownProvider>
            <CartProvider>
              <Elements stripe={stripePromise}>
                <GlobalStyles />
                <App />
              </Elements>
            </CartProvider>
          </DropdownProvider>
        </CategoriesProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
