import CitiesPlaces from '../../components/cities-places/cities-places';
import Map from '../../components/map/map';
import { OffersType } from '../../types/offers';

type MainProps = {
  count: number;
  offers: OffersType;
};

function Main({ count, offers }: MainProps) {
  const currentCity = offers[0]?.city;

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Paris</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Cologne</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Brussels</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item tabs__item--active">
                <span>Amsterdam</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Hamburg</span>
              </a>
            </li>
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span>Dusseldorf</span>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <CitiesPlaces count={count} offers={offers} />
          <div className="cities__right-section">
            <Map city={currentCity} points={offers.slice(0, count)} />
          </div>
        </div>
      </div>
    </main>
  );
}
export default Main;
