import { NameSpace } from '../../const/const';
import { State } from '../../types/state';
import { OffersType } from '../../types/offers';

export const getOffers = (state: State): OffersType => state[NameSpace.Data].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;
