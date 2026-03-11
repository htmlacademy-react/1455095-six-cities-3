export interface Location {
  latitude: number;
  longitude: number;
  zoom: number;
}

export interface City {
  name: string;
  location: Location;
}

export interface Host {
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export interface OfferType {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
}

export type OffersType = OfferType[];
