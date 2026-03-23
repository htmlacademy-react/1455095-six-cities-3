import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Setting } from './const/const.ts';
import { offersMock } from './mocks/offers.ts';
import { reviewsMock } from './mocks/reviews.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App count={Setting.OffersCount} offers={offersMock} reviews={reviewsMock} />
  </React.StrictMode>,
);
