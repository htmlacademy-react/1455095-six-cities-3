import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const/const';
import { OffersData } from '../../types/state';
import { fetchOfferAction } from '../api-action';

const initialState: OffersData = {
  offers: [],
  isOffersDataLoading: false,
  hasError: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      });
  },
});
