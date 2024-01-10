/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async (tourId) => {
  const stripe = Stripe(
    'pk_test_51OUPPtSEzzE1wtPS9PjLKmzC7rBw8b66EKmVzovSzsLCEkP2r1r4wnLfDo7VBaVJVwGSdrFGVga7GxydU0FJdw8X00zYQl3Fh6'
  ); // <==== PUT THE VARIABLE HERE

  try {
    // 1. Get checkout session from the API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);

    // 2. Create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
