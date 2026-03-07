import { OfferType } from '../../types/offers';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import { getRatingWidth } from '../../utils/utils';

type PlaceCardProps = {
  offer: OfferType;
  onDataCardSend?: (offer: OfferType | null) => void;
};

function PlaceCard({ offer, onDataCardSend }: PlaceCardProps) {
  const { isPremium, previewImage, price, rating, title, type } = offer;

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
        <Link to={AppRoute.Offer + offer.id}>
          <img className="place-card__image" src={previewImage} width={260} height={200} alt="Place image" />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price && price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <button className={`place-card__bookmark-button button ${offer.isFavorite && 'place-card__bookmark-button--active'}`} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark" />
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: rating ? getRatingWidth(rating) : '0%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer + offer.id}>{title}</Link>
        </h2>
        <p className="place-card__type">{type ? type[0].toUpperCase() + type.slice(1) : ''}</p>
      </div>
    </article>
  );
}
export default PlaceCard;
