
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/header/header';
import { AppRoute } from '../const/const';

function Layout() {
  const location = useLocation();
  const isLoginPage = location.pathname === `${AppRoute.Login}`;

  return (
    <>
      <Header />
      {isLoginPage ? (
        <Outlet />
      ) : (
        <div className="page page--gray page--main">
          <Outlet />
        </div>
      )}
    </>
  );
}

export default Layout;
