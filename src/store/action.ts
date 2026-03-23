import { createAction } from '@reduxjs/toolkit';
import { City, OffersType } from '../types/offers';

export const toggleCity = createAction('main/toggleCity', (value: City) => ({
  payload: value,
}));
export const renderOffers = createAction('main/renderOffers', (value: OffersType) => ({
  payload: value,
}));

// Переопределение метода toString в RTK:
// toggleCity.toString вернет строку 'main/toggleCity'

// тут мы понимаем, что в действие передается значение, а в те что выше нет
// export const addSomeValueAction = createAction(Action.ADD_SOME_VALUE, (value) => ({
//   payload: value,
//   currentTime: new Date().getTime(), // <доп действия
// }));
