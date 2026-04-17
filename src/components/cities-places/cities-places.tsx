import { memo, useState, useCallback } from 'react';
import { useAppSelector } from '../../hooks';
import { getSortedOffers } from '../../store/offers-data/offers-data.selectors';
import PlaceCard from '../place-card/place-card';
import PlacesSorting from '../places-sorting/places-sorting';
import { OfferType, City } from '../../types/offers';
import { SortType } from '../../types/sorting';
import { SORT_OPTION } from '../../const/const';

type CitiesPlacesProps = {
  city: City;
  onCardHover: (offer: OfferType | null) => void;
};

function CitiesPlaces({ city, onCardHover }: CitiesPlacesProps) {
  const [currentSortType, setCurrentSortType] = useState<SortType>(SORT_OPTION[0]);

  const sortedOffers = useAppSelector((state) => getSortedOffers(state, city, currentSortType));

  const handleSortClick = useCallback((param: SortType) => {
    setCurrentSortType(param);
  }, []);

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">
        {sortedOffers.length} places to stay in {city.name}
      </b>
      <PlacesSorting currentSortType={currentSortType} onDataSortTypeSend={handleSortClick} />
      <div className="cities__places-list places__list tabs__content">
        {sortedOffers.map((offer) => (
          <PlaceCard key={offer.id} offer={offer} onDataCardSend={onCardHover} />
        ))}
      </div>
    </section>
  );
}

const MemoizedCitiesPlaces = memo(CitiesPlaces);
export default MemoizedCitiesPlaces;
