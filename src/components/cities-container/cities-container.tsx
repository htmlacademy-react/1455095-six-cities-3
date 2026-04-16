import { useState, useCallback } from 'react';
import { OffersType, OfferType, City } from '../../types/offers';
import CitiesPlaces from '../cities-places/cities-places';
import Map from '../map/map';

type CitiesContainerProps = {
  currentCity: City;
  offers: OffersType;
};

function CitiesContainer({ currentCity, offers }: CitiesContainerProps) {
  const [activeOffer, setActiveOffer] = useState<OfferType | null>(null);

  const handleCardHover = useCallback((offer: OfferType | null) => {
    setActiveOffer(offer);
  }, []);

  return (
    <div className="cities__places-container container">
      <CitiesPlaces city={currentCity} offers={offers} onCardHover={handleCardHover} />
      <div className="cities__right-section">
        <Map city={currentCity} offers={offers} selectedOfferId={activeOffer?.id} />
      </div>
    </div>
  );
}

export default CitiesContainer;
