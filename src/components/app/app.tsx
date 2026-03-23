import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../../layout/Layout';

import PrivateRoute from '../../pages/private-route/private-route';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import PageNotFound from '../../pages/page-not-found/page-not-found';

import { AppRoute, AuthorizationStatus } from '../../const/const';
import { OffersType } from '../../types/offers';
import { ReviewsType } from '../../types/reviews';

type AppScreenProps = {
  count: number;
  offers: OffersType;
  reviews: ReviewsType;
};

function App({ count, offers, reviews }: AppScreenProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Main offers={offers} count={count} />} />
          <Route path={AppRoute.Login} element={<Login />} />

          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <Favorites offers={offers} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<Login />} />
          {offers.map((offer) => (
            <Route key={offer.id} path={`${AppRoute.Offer}${offer.id}`} element={<Offer offer={offer} offers={offers} reviews={reviews} />} />
          ))}
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
