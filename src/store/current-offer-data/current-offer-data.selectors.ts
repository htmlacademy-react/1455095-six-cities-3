import { NameSpace } from '../../const/const';
import { State } from '../../types/state';
import { OfferType, OffersType } from '../../types/offers';
import { ReviewsType } from '../../types/reviews';

export const getCurrentOffer = (state: State): OfferType | null => state[NameSpace.CurrentOffer].offer;
export const getNearbyOffers = (state: State): OffersType => state[NameSpace.CurrentOffer].nearbyOffers;
export const getReviews = (state: State): ReviewsType => state[NameSpace.CurrentOffer].reviews;
export const getOfferLoadingStatus = (state: State): boolean => state[NameSpace.CurrentOffer].isOfferLoading;
export const getReviewPostingStatus = (state: State): boolean => state[NameSpace.CurrentOffer].isReviewPosting;
