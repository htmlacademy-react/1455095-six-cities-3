import PlaceCard from '../place-card/place-card';
import PlacesSorting from '../places-sorting/places-sorting';
import { OffersType, OfferType, City } from '../../types/offers';

type CitiesPlacesProps = {
  city: City;
  count: number;
  offers: OffersType;
  onCardHover: (offer: OfferType | null) => void;
};

function CitiesPlaces({ city, count, offers, onCardHover }: CitiesPlacesProps) {
  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {count} places to stay in {city.name}
      </b>
      <PlacesSorting />
      <div className="cities__places-list places__list tabs__content">
        {offers.map((el, index) => {
          if (index >= count) {
            return;
          }
          return <PlaceCard key={el.id} offer={el} onDataCardSend={onCardHover} />;
        })}
      </div>
    </section>
  );
}
export default CitiesPlaces;
