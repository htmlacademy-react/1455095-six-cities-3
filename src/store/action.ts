import { createAction } from '@reduxjs/toolkit';
import { OffersType } from '../types/offers';
import { AppRoute, AuthorizationStatus } from '../const/const';

export const loadOffers = createAction<OffersType>('main/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('setError');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const redirectToRoute = createAction<AppRoute>('user/redirectToRoute');
