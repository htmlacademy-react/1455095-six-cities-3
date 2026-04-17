import { store } from '../store';
import { AuthorizationStatus } from '../const/const';
import { OffersType } from './offers';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
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
