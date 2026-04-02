import { createReducer } from '@reduxjs/toolkit';
import { OffersType } from '../types/offers';
import { AuthorizationStatus } from '../const/const';
import { loadOffers, requireAuthorization, setError, setOffersDataLoadingStatus, setUserEmail } from './action';

type Initial = {
  currentOffers: OffersType;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoadingLoading: boolean;
};

const initialState: Initial = {
  currentOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoadingLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.currentOffers = action.payload;
    })

    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoadingLoading = action.payload;
    })

    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })

    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
