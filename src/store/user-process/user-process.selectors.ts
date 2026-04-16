import { NameSpace } from '../../const/const';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const/const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;
