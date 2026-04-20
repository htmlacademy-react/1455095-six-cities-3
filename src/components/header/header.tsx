import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { getOffers } from '../../store/offers-data/offers-data.selectors';
import { logoutAction } from '../../store/api-action';
import { AuthorizationStatus, AppRoute } from '../../const/const';
import { getEmail } from '../../services/token';

function Header() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const offers = useAppSelector(getOffers);

  const isAuth = authStatus === AuthorizationStatus.Auth;
  const favoriteCount = offers.filter((offer) => offer.isFavorite).length;
  const userEmail = getEmail();

  const isLoginPage = location.pathname === `${AppRoute.Login}`;

  const handleLogout = (evt: React.MouseEvent) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className={`header__logo-link ${!isLoginPage ? 'header__logo-link--active' : ''}`} to={AppRoute.Root}>
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width={81} height={41} />
            </Link>
          </div>

          {!isLoginPage && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {isAuth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">{userEmail}</span>
                        <span className="header__favorite-count">{favoriteCount}</span>
                      </Link>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#" onClick={handleLogout}>
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
