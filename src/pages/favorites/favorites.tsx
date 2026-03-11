import { OffersType } from '../../types/offers';

type FavoritesProps = {
  offers: OffersType;
};

function Favorites({ offers }: FavoritesProps) {
  const favoritesOffers = offers.filter((offer) => offer.isFavorite === true);

  const offersByCityMap = new Map<string, OffersType>();

  favoritesOffers.forEach((offer) => {
    const city = offer.city.name;
    if (offersByCityMap.has(city)) {
      offersByCityMap.get(city)!.push(offer);
    } else {
      offersByCityMap.set(city, [offer]);
    }
  });

  const cityEntries = Array.from(offersByCityMap.entries());

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
                    <a className="locations__item-link" href="#">
                      <span>{cityName}</span>
                    </a>
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
                        <a href="#">
                          <img className="place-card__image" src={offer.previewImage} width={150} height={110} alt={offer.title} />
                        </a>
                      </div>
                      <div className="favorites__card-info place-card__info">
                        <div className="place-card__price-wrapper">
                          <div className="place-card__price">
                            <b className="place-card__price-value">€{offer.price}</b>
                            <span className="place-card__price-text">/&nbsp;night</span>
                          </div>
                          <button className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
                            <svg className="place-card__bookmark-icon" width={18} height={19}>
                              <use xlinkHref="#icon-bookmark" />
                            </svg>
                            <span className="visually-hidden">{offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
                          </button>
                        </div>
                        <div className="place-card__rating rating">
                          <div className="place-card__stars rating__stars">
                            <span style={{ width: `${(offer.rating / 5) * 100}%` }} />
                            <span className="visually-hidden">Rating</span>
                          </div>
                        </div>
                        <h2 className="place-card__name">
                          <a href="#">{offer.title}</a>
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
