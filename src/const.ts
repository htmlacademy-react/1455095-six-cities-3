export const Setting = {
  OffersCount: 4,
};

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer:id',
  Root = '/',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
