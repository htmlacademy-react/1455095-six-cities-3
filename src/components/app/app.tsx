import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useAppSelector } from '../../hooks';

import PrivateRoute from '../../pages/private-route/private-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import Main from '../../pages/main/main';
import Offer from '../../pages/offer/offer';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import PageNotFound from '../../pages/page-not-found/page-not-found';

import { OffersType } from '../../types/offers';
import { ReviewsType } from '../../types/reviews';

import { reviewsMock } from '../../mocks/reviews.ts';
import { AppRoute, AuthorizationStatus } from '../../const/const';

function App() {
  const offers: OffersType = useAppSelector((state) => state.main.currentOffers);
  const reviews: ReviewsType = reviewsMock;
  const authorizationStatus = useAppSelector((state) => state.main.authorizationStatus);
  const isOffersDataLoadingLoading = useAppSelector((state) => state.main.isOffersDataLoadingLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoadingLoading) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Main offers={offers} />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
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
