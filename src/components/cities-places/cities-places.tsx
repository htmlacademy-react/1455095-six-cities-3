import { useState } from 'react';
import PlaceCard from '../place-card/place-card';
import PlacesSorting from '../places-sorting/places-sorting';
import { OffersType, OfferType, City } from '../../types/offers';
import { SortType } from '../../types/sorting';
import { SORT_OPTION } from '../../const/const';

type CitiesPlacesProps = {
  city: City;
  offers: OffersType;
  onCardHover: (offer: OfferType | null) => void;
};

function CitiesPlaces({ city, offers, onCardHover }: CitiesPlacesProps) {
  const [currentSortType, setCurrentSortType] = useState<SortType>(SORT_OPTION[0]);

  const sortedOffers = (): OffersType => {
    const offersArr = [...offers].filter((item: OfferType) => item.city.name === city.name);

    switch (currentSortType) {
      case 'Price: low to high':
        return offersArr.sort((a, b) => a.price - b.price);

      case 'Price: high to low':
        return offersArr.sort((a, b) => b.price - a.price);

      case 'Top rated first':
        return offersArr.sort((a, b) => b.rating - a.rating);

      case 'Popular':
      default:
        return offersArr;
    }
  };

  const handleSortClick = (param: SortType) => {
    setCurrentSortType(param);
  };

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {sortedOffers().length} places to stay in {city.name}
      </b>
      <PlacesSorting currentSortType={currentSortType} onDataSortTypeSend={handleSortClick} />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers()
          .slice(0, 4)
          .map((el) => (
            <PlaceCard key={el.id} offer={el} onDataCardSend={onCardHover} />
          ))}
      </div>
    </section>
  );
}
export default CitiesPlaces;
