import { useState } from 'react';
import { OffersType } from '../../types/offers';
import { OfferType } from '../../types/offers';
import PlaceCard from '../place-card/place-card';

type NearPlacesProps = {
  nearOffers: OffersType;
};

function NearPlaces({ nearOffers }: NearPlacesProps) {
  const [, setActiveOffer] = useState<OfferType | null>(null);

  const handleCardHover = (offer: OfferType | null) => {
    setActiveOffer(offer);
  };

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {nearOffers.map((offer, index) => {
          if (index >= 3) {
            return;
          }

          return <PlaceCard key={offer.id} offer={offer} onDataCardSend={handleCardHover} />;
        })}
      </div>
    </section>
  );
}
export default NearPlaces;
