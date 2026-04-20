import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { OfferType, OffersType } from '../types/offers';
import { ReviewsType, ReviewType } from '../types/reviews';
import { redirectToRoute } from './action';
import { saveToken, saveEmail, dropToken } from '../services/token';
import { AppRoute, APIRoute } from '../const/const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';

export const fetchOfferAction = createAsyncThunk<
  OffersType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<OffersType>(APIRoute.Offers);

  return data;
});

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  try {
    const { data } = await api.get<UserData>(APIRoute.Login);
    return data;
  } catch {
    throw new Error('Not authorized');
  }
});
export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ login: email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
  saveToken(data.token);
  saveEmail(data.email);
  dispatch(redirectToRoute(AppRoute.Root));
  return data;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
});

export const fetchCurrentOfferAction = createAsyncThunk<
  OfferType,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchCurrentOffer', async (offerId, { dispatch, extra: api }) => {
  try {
    const { data } = await api.get<OfferType>(`${APIRoute.Offer}${offerId}`);
    return data;
  } catch (error) {
    dispatch(redirectToRoute(AppRoute.NotFound));
    throw error;
  }
});

export const fetchNearbyOffersAction = createAsyncThunk<
  OffersType,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchNearbyOffers', async (offerId, { extra: api }) => {
  const { data } = await api.get<OffersType>(`${APIRoute.Offer}${offerId}/nearby`);
  return data;
});

export const fetchCommentsAction = createAsyncThunk<
  ReviewsType,
  string,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchComments', async (offerId, { extra: api }) => {
  const { data } = await api.get<ReviewsType>(`${APIRoute.Comments}/${offerId}`);
  return data;
});

export const postCommentAction = createAsyncThunk<
  ReviewType,
  { offerId: string; comment: string; rating: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/postComment', async ({ offerId, comment, rating }, { extra: api }) => {
  const { data } = await api.post<ReviewType>(`${APIRoute.Comments}/${offerId}`, { comment, rating });
  return data;
});

export const toggleFavoriteAction = createAsyncThunk<
  OfferType,
  { offerId: string; status: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/toggleFavorite', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<OfferType>(`${APIRoute.Favorites}/${offerId}/${status}`);
  return data;
});

export const fetchFavoritesAction = createAsyncThunk<
  OffersType,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavorites', async (_arg, { extra: api }) => {
  const { data } = await api.get<OffersType>(APIRoute.Favorites);
  return data;
});
