import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCurrentOfferAction, fetchNearbyOffersAction, fetchCommentsAction } from '../../store/api-action';
import { getCurrentOffer, getNearbyOffers, getReviews, getOfferLoadingStatus } from '../../store/current-offer-data/current-offer-data.selectors';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';
import { AuthorizationStatus, AppRoute } from '../../const/const';
import { getRatingWidth } from '../../utils/utils';

import LoadingScreen from '../loading-screen/loading-screen';
import PageNotFound from '../page-not-found/page-not-found';
import NearPlaces from '../../components/near-places/near-places';
import ReviewsList from '../../components/reviews-list/reviews-list';
import ReviewForm from '../../components/review-form/review-form';
import FavoriteButton from '../../components/favorite-button/favorite-button';
import Map from '../../components/map/map';
import { redirectToRoute } from '../../store/action';

function Offer() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const offer = useAppSelector(getCurrentOffer);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const reviews = useAppSelector(getReviews);
  const isLoading = useAppSelector(getOfferLoadingStatus);
  const authStatus = useAppSelector(getAuthorizationStatus);

  const isAuth = authStatus === AuthorizationStatus.Auth;

  useEffect(() => {
    if (id) {
      dispatch(fetchCurrentOfferAction(id))
        .unwrap()
        .catch(() => {
          dispatch(redirectToRoute(AppRoute.NotFound));
        });
      dispatch(fetchNearbyOffersAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!offer) {
    return <PageNotFound />;
  }

  const { images, isPremium, rating, type, bedrooms, maxAdults, price, goods, host, description, title, city } = offer;

  const pointsForMap = [offer, ...nearbyOffers];

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
              <h1 className="offer__name">{title}</h1>
              <FavoriteButton offerId={offer.id} isFavorite={offer.isFavorite} buttonType="offer" />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: getRatingWidth(rating) }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
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
                <div className={`offer__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                  <img className="offer__avatar user__avatar" src={host.avatarUrl || ''} width={74} height={74} alt="Host avatar" />
                </div>
                <span className="offer__user-name">{host.name || ''}</span>
                {host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">{description || ''}</p>
              </div>
            </div>

            <ReviewsList reviews={reviews} />

            {isAuth && id && <ReviewForm offerId={id} />}
          </div>
        </div>

        <Map city={city} offers={pointsForMap} selectedOfferId={offer.id} />
      </section>

      <div className="container">
        <NearPlaces nearOffers={nearbyOffers} />
      </div>
    </main>
  );
}

export default Offer;
