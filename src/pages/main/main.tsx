import { useState } from 'react';
import CitiesPlaces from '../../components/cities-places/cities-places';
import LocationsList from '../locations-list/locations-list';
import Map from '../../components/map/map';
import { OffersType, OfferType } from '../../types/offers';
import { useAppSelector } from '../../hooks';

type MainProps = {
  offers: OffersType;
};

function Main({ offers }: MainProps) {
  const currentCity = useAppSelector((state) => state.main.currentCityStore);
  const sortedOffers = useAppSelector((state) => state.main.currentSortingOffers);

  const [activeOffer, setActiveOffer] = useState<OfferType | null>(null);

  const handleCardHover = (offer: OfferType | null) => {
    setActiveOffer(offer);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <LocationsList currentCity={currentCity} offers={offers} />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <CitiesPlaces city={currentCity} count={sortedOffers.length} offers={sortedOffers} onCardHover={handleCardHover} />
          <div className="cities__right-section">
            <Map city={currentCity} points={sortedOffers} selectedOfferId={activeOffer?.id} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Main;
