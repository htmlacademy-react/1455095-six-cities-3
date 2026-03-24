enum DateFormat {
  DATE_REVIEW = 'MMMM YYYY',
}

enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer:',
  Root = '/',
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const INITIAL_CITY = {
  name: 'Paris',
  location: {
    latitude: 48.858889,
    longitude: 2.294444,
    zoom: 12,
  },
};

const SORT_OPTION = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] as const;

export { DateFormat, AppRoute, AuthorizationStatus, INITIAL_CITY, SORT_OPTION };
