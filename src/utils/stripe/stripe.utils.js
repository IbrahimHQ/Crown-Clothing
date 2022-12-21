import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

//from .env so only app has access to the file b/c it is only stored on the process environment, not exposed in code repository