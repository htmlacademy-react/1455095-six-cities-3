import { Link } from 'react-router-dom';
import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../const/const';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors.ts';
import { AppRoute } from '../../const/const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { logoutAction } from '../../store/api-action';
import { getEmail } from '../../services/token';

// доработать header
// почему я приняла решение делать в локад сторадж, а не в сторе
// amsterdam который - постоянно меняется разное

function Header() {
  const dispatch = useAppDispatch();
  const isAuthChecked = useAppSelector(getAuthorizationStatus);
  const userLogin = getEmail();

  console.log(isAuthChecked);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link">
              <Logo />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthChecked === AuthorizationStatus.Auth ? (
                <>
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{userLogin}</span>
                      <span className="header__favorite-count">3</span>
                    </a>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to="/"
                      onClick={(evt) => {
                        evt.preventDefault();
                        dispatch(logoutAction());
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
              ) : (
                <li className="header__nav-item user">
                  <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
