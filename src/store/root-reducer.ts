import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { offersData } from './offers-data/offers-data.slice';
import { userProcess } from './user-process/user-process.slice';
import { currentOfferData } from './current-offer-data/current-offer-data.slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.CurrentOffer]: currentOfferData.reducer,
});
