import { createAction } from '@reduxjs/toolkit';
import { City, OffersType } from '../types/offers';
import { SortType } from '../types/sorting';

export const toggleCity = createAction('main/toggleCity', (value: City) => ({
  payload: value,
}));

export const renderOffers = createAction('main/renderOffers', (value: OffersType) => ({
  payload: value,
}));

export const sortOffers = createAction('main/sortOffers', (value: SortType) => ({
  payload: value,
}));
