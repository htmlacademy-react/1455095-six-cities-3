import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { toggleFavoriteAction } from '../../store/api-action';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { AuthorizationStatus, AppRoute } from '../../const/const';

type FavoriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  buttonType?: 'card' | 'offer';
};

function FavoriteButton({ offerId, isFavorite, buttonType = 'card' }: FavoriteButtonProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authStatus = useAppSelector(getAuthorizationStatus);
  const isAuth = authStatus === AuthorizationStatus.Auth;

  const handleFavoriteClick = () => {
    if (!isAuth) {
      navigate(AppRoute.Login);
      return;
    }

    const status = isFavorite ? 0 : 1;
    dispatch(toggleFavoriteAction({ offerId, status }));
  };

  const buttonClass = buttonType === 'offer' ? 'offer__bookmark-button' : 'place-card__bookmark-button';
  const iconWidth = buttonType === 'offer' ? 31 : 18;
  const iconHeight = buttonType === 'offer' ? 33 : 19;

  return (
    <button className={`${buttonClass} button ${isFavorite ? `${buttonClass}--active` : ''}`} type="button" onClick={handleFavoriteClick}>
      <svg className={buttonType === 'offer' ? 'offer__bookmark-icon' : 'place-card__bookmark-icon'} width={iconWidth} height={iconHeight}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">{isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
    </button>
  );
}

export default FavoriteButton;
