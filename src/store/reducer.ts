import { createReducer } from '@reduxjs/toolkit';
import { OffersType } from '../types/offers';
import { offersMock } from '../mocks/offers';
import { City } from '../types/offers';
import { INITIAL_CITY } from '../const/const';
import { toggleCity, renderOffers } from './action';

const offersCurrentCityStore: OffersType = offersMock.filter((offer) => offer.city.name === INITIAL_CITY.name);

type Initial = {
  currentCityStore: City;
  currentOffers: OffersType;
};

const initialState: Initial = {
  currentCityStore: INITIAL_CITY,
  currentOffers: offersCurrentCityStore,
};

// Редюсер отвечает за обновление хранилища
export const updateMainCity = createReducer(initialState, (builder) => {
  builder.addCase(toggleCity, (state, action) => {
    state.currentCityStore = action.payload;
  });

  builder.addCase(renderOffers, (state, action) => {
    state.currentOffers = action.payload;
  });

  // Иммутабельность
  // immer - отдельная библиотека, позволяет добиться иммутабельности
  // Тут мы обращаемся к state и как будто меняем свойства существующего объекта, но фактически
  // мы возвращаем новый объект
});
