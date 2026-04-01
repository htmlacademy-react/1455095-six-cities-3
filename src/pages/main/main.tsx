import { useState } from 'react';
import CitiesPlaces from '../../components/cities-places/cities-places';
import LocationsList from '../locations-list/locations-list';
import Map from '../../components/map/map';
import { OffersType, OfferType, City } from '../../types/offers';
import { INITIAL_CITY } from '../../const/const';

type MainProps = {
  offers: OffersType;
};

function Main({ offers }: MainProps) {
  const [activeOffer, setActiveOffer] = useState<OfferType | null>(null);
  const [currentCity, setCurrentCity] = useState<City>(INITIAL_CITY);

  const handleCardHover = (offer: OfferType | null) => {
    setActiveOffer(offer);
  };

  const handleCityClick = (param: City) => {
    setCurrentCity(param);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationsList currentCity={currentCity} offers={offers} onDataCitySend={handleCityClick} />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <CitiesPlaces city={currentCity} offers={offers} onCardHover={handleCardHover} />
          <div className="cities__right-section">
            <Map city={currentCity} points={offers} selectedOfferId={activeOffer?.id} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
