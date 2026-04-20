import { memo } from 'react';
import { OfferType } from '../../types/offers';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { getRatingWidth } from '../../utils/utils';
import FavoriteButton from '../favorite-button/favorite-button';

type PlaceCardProps = {
  offer: OfferType;
  onDataCardSend?: (offer: OfferType | null) => void;
};

function PlaceCard({ offer, onDataCardSend }: PlaceCardProps) {
  const { id, isPremium, previewImage, price, rating, title, type, isFavorite } = offer;

  const handleMouseEnter = () => {
    if (onDataCardSend) {
      onDataCardSend(offer);
    }
  };

  const handleMouseLeave = () => {
    if (onDataCardSend) {
      onDataCardSend(null);
    }
  };

  return (
    <article onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="cities__card place-card">
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}${id}`}>
          <img className="place-card__image" src={previewImage} width={260} height={200} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <FavoriteButton offerId={id} isFavorite={isFavorite} buttonType="card" />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingWidth(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type ? type[0].toUpperCase() + type.slice(1) : ''}</p>
      </div>
    </article>
  );
}

const MemoizedPlaceCard = memo(PlaceCard);
export default MemoizedPlaceCard;
