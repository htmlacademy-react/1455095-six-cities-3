import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { State } from '../../types/state';
import { OffersType, City } from '../../types/offers';
import { SortType } from '../../types/sorting';

export const getOffers = (state: State): OffersType => state[NameSpace.Data].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;

export const getOffersByCity = createSelector([getOffers, (_state: State, city: City) => city], (offers, city): OffersType => offers.filter((offer) => offer.city.name === city.name));

export const getSortedOffers = createSelector([getOffers, (_state: State, city: City) => city, (_state: State, _city: City, sortType: SortType) => sortType], (offers, city, sortType): OffersType => {
  const filteredOffers = offers.filter((offer) => offer.city.name === city.name);

  switch (sortType) {
    case 'Price: low to high':
      return [...filteredOffers].sort((a, b) => a.price - b.price);
    case 'Price: high to low':
      return [...filteredOffers].sort((a, b) => b.price - a.price);
    case 'Top rated first':
      return [...filteredOffers].sort((a, b) => b.rating - a.rating);
    default:
      return filteredOffers;
  }
});
