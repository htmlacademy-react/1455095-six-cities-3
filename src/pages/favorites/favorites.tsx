import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesAction } from '../../store/api-action';
import { getOffers } from '../../store/offers-data/offers-data.selectors';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const/const';
import FavoriteButton from '../../components/favorite-button/favorite-button';

function Favorites() {
  const dispatch = useAppDispatch();
  const offers = useAppSelector(getOffers);

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const favoritesOffers = offers.filter((offer) => offer.isFavorite);

  const offersByCity = favoritesOffers.reduce<Record<string, typeof favoritesOffers>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});

  const cityEntries = Object.entries(offersByCity);

  if (favoritesOffers.length === 0) {
    return (
      <main className="page__main page__main--favorites page__main--favorites-empty">
        <div className="page__favorites-container container">
          <section className="favorites favorites--empty">
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {cityEntries.map(([cityName, cityOffers]) => (
              <li key={cityName} className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link className="locations__item-link" to={AppRoute.Root}>
                      <span>{cityName}</span>
                    </Link>
                  </div>
                </div>
                <div className="favorites__places">
                  {cityOffers.map((offer) => (
                    <article key={offer.id} className="favorites__card place-card">
                      {offer.isPremium && (
                        <div className="place-card__mark">
                          <span>Premium</span>
                        </div>
                      )}
                      <div className="favorites__image-wrapper place-card__image-wrapper">
                        <Link to={`${AppRoute.Offer}${offer.id}`}>
                          <img className="place-card__image" src={offer.previewImage} width={150} height={110} alt={offer.title} />
                        </Link>
                      </div>
                      <div className="favorites__card-info place-card__info">
                        <div className="place-card__price-wrapper">
                          <div className="place-card__price">
                            <b className="place-card__price-value">€{offer.price}</b>
                            <span className="place-card__price-text">/&nbsp;night</span>
                          </div>
                          <FavoriteButton offerId={offer.id} isFavorite={offer.isFavorite} buttonType="card" />
                        </div>
                        <div className="place-card__rating rating">
                          <div className="place-card__stars rating__stars">
                            <span style={{ width: `${(offer.rating / 5) * 100}%` }} />
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <h2 className="place-card__name">
                          <Link to={`${AppRoute.Offer}${offer.id}`}>{offer.title}</Link>
                        </h2>
                        <p className="place-card__type">{offer.type}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default Favorites;
