import { store } from '../store';
import { AuthorizationStatus } from '../const/const';
import { OffersType } from './offers';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
};

export type OffersData = {
  offers: OffersType;
  isOffersDataLoading: boolean;
  hasError: boolean;
};

export type GameProcess = {
  mistakes: number;
  step: number;
};

export type Error = {
  error: string | null;
};

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
