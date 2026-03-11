const Setting = {
  OffersCount: 4,
};

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

export { Setting, DateFormat, AppRoute, AuthorizationStatus };
