import { Route, Routes } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const/const.ts';
import PrivateRoute from '../../pages/private-route/private-route';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import Main from '../../pages/main/main';
import Offer from '../../pages/offer/offer';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import ErrorScreen from '../../pages/error-screen/error-screen.tsx';

import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

import { getOffers, getOffersDataLoadingStatus, getErrorStatus } from '../../store/offers-data/offers-data.selectors.ts';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors.ts';

import { OffersType } from '../../types/offers';
import { ReviewsType } from '../../types/reviews';
import { reviewsMock } from '../../mocks/reviews.ts';

function App() {
  const offers: OffersType = useAppSelector(getOffers);
  const isOffersDataLoadingLoading = useAppSelector(getOffersDataLoadingStatus);
  const reviews: ReviewsType = reviewsMock;
  const isAuthChecked = useAppSelector(getAuthorizationStatus);
  const hasError = useAppSelector(getErrorStatus);

  if (!isAuthChecked || isOffersDataLoadingLoading) {
    return <LoadingScreen />;
  }

  if (hasError) {
    return <ErrorScreen />;
  }

  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Main offers={offers} />} />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
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
    </HistoryRouter>
  );
}
export default App;
