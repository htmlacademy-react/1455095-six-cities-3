import { createReducer } from '@reduxjs/toolkit';
import { OffersType } from '../types/offers';
import { offersMock } from '../mocks/offers';
import { City } from '../types/offers';
import { SortType } from '../types/sorting';
import { INITIAL_CITY, SORT_OPTION } from '../const/const';
import { toggleCity, renderOffers, sortOffers } from './action';

const getSortedOffers = (offers: OffersType, sortType: SortType): OffersType => {
  const sortedOffers = [...offers];

  switch (sortType) {
    case 'Price: low to high':
      return sortedOffers.sort((a, b) => a.price - b.price);

    case 'Price: high to low':
      return sortedOffers.sort((a, b) => b.price - a.price);

    case 'Top rated first':
      return sortedOffers.sort((a, b) => b.rating - a.rating);

    case 'Popular':
    default:
      return sortedOffers;
  }
};

const getOffersByCity = (offers: OffersType, cityName: string): OffersType => offers.filter((offer) => offer.city.name === cityName);

const offersCurrentCityStore: OffersType = getOffersByCity(offersMock, INITIAL_CITY.name);

type Initial = {
  currentCityStore: City;
  currentOffers: OffersType;
  currentSortingType: SortType;
  currentSortingOffers: OffersType;
};

const initialState: Initial = {
  currentCityStore: INITIAL_CITY,
  currentOffers: offersMock,
  currentSortingType: SORT_OPTION[0],
  currentSortingOffers: offersCurrentCityStore,
};

export const updateMainCity = createReducer(initialState, (builder) => {
  builder
    .addCase(toggleCity, (state, action) => {
      const newCity = action.payload;
      state.currentCityStore = newCity;
      const cityOffers = getOffersByCity(state.currentOffers, newCity.name);
      state.currentSortingType = SORT_OPTION[0];
      state.currentSortingOffers = getSortedOffers(cityOffers, SORT_OPTION[0]);
    })

    .addCase(renderOffers, (state, action) => {
      state.currentOffers = action.payload;
      const cityOffers = getOffersByCity(action.payload, state.currentCityStore.name);
      state.currentSortingOffers = getSortedOffers(cityOffers, state.currentSortingType);
    })

    .addCase(sortOffers, (state, action) => {
      const newSortType = action.payload;
      state.currentSortingType = newSortType;
      const cityOffers = getOffersByCity(state.currentOffers, state.currentCityStore.name);
      state.currentSortingOffers = getSortedOffers(cityOffers, newSortType);
    });
});
