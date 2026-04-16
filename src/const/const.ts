export enum DateFormat {
  DATE_REVIEW = 'MMMM YYYY',
}

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer:',
  Root = '/',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const INITIAL_CITY = {
  name: 'Paris',
  location: {
    latitude: 48.858889,
    longitude: 2.294444,
    zoom: 12,
  },
};

export const SORT_OPTION = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as const;

export const TIMEOUT_SHOW_ERROR = 2000;

export enum APIRoute {
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
  NearPlace = '/offers/{offerId}/nearby',
  Offer = '/offers/',
  Offers = '/offers',
  Comments = '/comments/{offerId}',
}

export enum NameSpace {
  Data = 'DATA',
  App = 'APP',
  User = 'USER',
}
