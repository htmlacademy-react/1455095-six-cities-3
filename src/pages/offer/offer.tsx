import NearPlaces from '../../components/near-places/near-places';
import FormComment from '../../components/form-comment/form-comment';
import { OffersType } from '../../types/offers';
import { OfferType } from '../../types/offers';
import { ReviewsType } from '../../types/reviews';
import { nanoid } from 'nanoid';
import { DateFormat } from '../../const/const';
import { humanizeDate } from '../../utils/utils-dayjs';
import { getRatingWidth } from '../../utils/utils';

type OfferProps = {
  offers: OffersType;
  offer: OfferType;
  reviews: ReviewsType;
};

function Offer({ offer, offers, reviews }: OfferProps) {
  const { images, isPremium, rating, type, bedrooms, maxAdults, price, goods, host, description } = offer;

  const nearOffers = offers.filter((item) => offer.city.name === item.city.name);

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {images.map((img) => (
              <div key={nanoid()} className="offer__image-wrapper">
                <img className="offer__image" src={img} alt="Photo studio" />
              </div>
            ))}
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{offer.title}</h1>
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width={31} height={33}>
                  <use xlinkHref="#icon-bookmark" />
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: getRatingWidth(rating) }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">4.8</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{type ? type[0].toUpperCase() + type.slice(1) : ''}</li>
              <li className="offer__feature offer__feature--bedrooms">{bedrooms} Bedrooms</li>
              <li className="offer__feature offer__feature--adults">Max {maxAdults} adults</li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {goods.map((item) => (
                  <li key={nanoid()} className="offer__inside-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                  <img className="offer__avatar user__avatar" src={host.avatarUrl || ''} width={74} height={74} alt="Host avatar" />
                </div>
                <span className="offer__user-name">{host.name || null}</span>
                {host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">{description || null}</p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews ·<span className="reviews__amount">{reviews && reviews.length}</span>
              </h2>
              <ul className="reviews__list">
                {reviews.map((item) => (
                  <li key={item.id} className="reviews__item">
                    <div className="reviews__user user">
                      <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img className="reviews__avatar user__avatar" src={item.user.avatarUrl || ''} width={54} height={54} alt="Reviews avatar" />
                      </div>
                      <span className="reviews__user-name">{item.user.name || null}</span> {item.user.isPro && <span className="offer__user-status">{item.user.isPro && 'Pro'}</span>}
                    </div>
                    <div className="reviews__info">
                      <div className="reviews__rating rating">
                        <div className="reviews__stars rating__stars">
                          <span style={{ width: getRatingWidth(item.rating) }} />
                          <span className="visually-hidden">Rating</span>
                        </div>
                      </div>
                      <p className="reviews__text">{item.comment}</p>
                      <time className="reviews__time" dateTime={item.date}>
                        {humanizeDate({
                          date: item.date,
                          format: DateFormat.DATE_REVIEW,
                        })}
                      </time>
                    </div>
                  </li>
                ))}
              </ul>
              <FormComment />
            </section>
          </div>
        </div>
        <section className="offer__map map" />
      </section>
      <div className="container">
        <NearPlaces nearOffers={nearOffers} />
      </div>
    </main>
  );
}
export default Offer;
