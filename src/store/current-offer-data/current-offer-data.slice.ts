import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { OfferType, OffersType } from '../../types/offers';
import { ReviewsType } from '../../types/reviews';
import { fetchCurrentOfferAction, fetchNearbyOffersAction, fetchCommentsAction, postCommentAction, toggleFavoriteAction } from '../api-action';

type CurrentOfferData = {
  offer: OfferType | null;
  nearbyOffers: OffersType;
  reviews: ReviewsType;
  isOfferLoading: boolean;
  isReviewPosting: boolean;
  hasError: boolean;
};

const initialState: CurrentOfferData = {
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isOfferLoading: false,
  isReviewPosting: false,
  hasError: false,
};

export const currentOfferData = createSlice({
  name: NameSpace.CurrentOffer,
  initialState,
  reducers: {
    clearCurrentOffer: (state) => {
      state.offer = null;
      state.nearbyOffers = [];
      state.reviews = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentOfferAction.pending, (state) => {
        state.isOfferLoading = true;
        state.hasError = false;
      })
      .addCase(fetchCurrentOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchCurrentOfferAction.rejected, (state) => {
        state.isOfferLoading = false;
        state.hasError = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isReviewPosting = true;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.reviews = [action.payload, ...state.reviews];
        state.isReviewPosting = false;
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isReviewPosting = false;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;

        if (state.offer?.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }

        const nearbyIndex = state.nearbyOffers.findIndex((offer) => offer.id === updatedOffer.id);
        if (nearbyIndex !== -1) {
          state.nearbyOffers[nearbyIndex] = updatedOffer;
        }
      });
  },
});

export const { clearCurrentOffer } = currentOfferData.actions;
