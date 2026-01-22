import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '../../layout/Layout';
import PrivateRoute from '../../pages/private-route/private-route';

import { AppRoute, AuthorizationStatus } from '../../const';

import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import PageNotFound from '../../pages/page-not-found/page-not-found';

type AppScreenProps = {
  count: number;
};

function App({ count }: AppScreenProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Main count={count} />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Login} element={<Login />} />
          <Route path={AppRoute.Offer} element={<Offer />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
