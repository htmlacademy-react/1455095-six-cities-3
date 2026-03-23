import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { offersMock } from './mocks/offers.ts';
import { reviewsMock } from './mocks/reviews.ts';
import { store } from './store/index.ts';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offersMock} reviews={reviewsMock} />
    </Provider>
  </React.StrictMode>
);
