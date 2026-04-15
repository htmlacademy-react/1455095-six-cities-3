import { memo, useState, useCallback, useMemo } from 'react';

import LocationsList from '../locations-list/locations-list';

import { OffersType, City } from '../../types/offers';
import { INITIAL_CITY } from '../../const/const';
import CitiesEmpty from '../../components/cities-empty/cities-empty';
import CitiesContainer from '../../components/cities-container/cities-container';

type MainProps = {
  offers: OffersType;
};

function Main({ offers }: MainProps) {
  const [currentCity, setCurrentCity] = useState<City>(INITIAL_CITY);

  const handleCityClick = useCallback((param: City) => {
    setCurrentCity(param);
  }, []);

  const hasNoOffers = useMemo(() => offers.length < 1, [offers.length]);

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationsList currentCity={currentCity} offers={offers} onDataCitySend={handleCityClick} />
      </div>
      <div className="cities">{hasNoOffers ? <CitiesEmpty /> : <CitiesContainer currentCity={currentCity} offers={offers} />}</div>
    </main>
  );
}

const MemoizedMain = memo(Main);

export default MemoizedMain;
