import * as UserEffects from './UserEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import LoginModel from './models/LoginModel';
import UserResultModel from './models/UserResultModel';
import IStore from 'models/IStore';

type ActionUnion = undefined | HttpErrorResponseModel | LoginModel | UserResultModel;

export const REQUEST_POST_LOGIN: string = 'UserActions.REQUEST_POST_LOGIN';
export const REQUEST_POST_LOGIN_FINISHED: string = 'UserActions.REQUEST_POST_LOGIN_FINISHED';

export const postLogin = (data: LoginModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<UserResultModel>(dispatch, REQUEST_POST_LOGIN, UserEffects.postLogin, data);
  };
};

export const REQUEST_POST_LOGOUT: string = 'UserActions.REQUEST_POST_LOGOUT';
export const REQUEST_POST_LOGOUT_FINISHED: string = 'UserActions.REQUEST_POST_LOGOUT_FINISHED';

export const postLogout = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<UserResultModel>(dispatch, REQUEST_POST_LOGIN, UserEffects.postLogout);
  };
};

export const REQUEST_POST_LOGIN_LOCAL: string = 'UserActions.REQUEST_POST_LOGIN_LOCAL';
export const REQUEST_POST_LOGIN_LOCAL_FINISHED: string = 'UserActions.REQUEST_POST_LOGIN_LOCAL_FINISHED';

export const postLoginLocal = (data: UserResultModel): any => {
  // console.log('postLoginLocal',data);

  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<UserResultModel>(dispatch, REQUEST_POST_LOGIN_LOCAL, UserEffects.postLoginLocal, data);
  };
};

export const REQUEST_CURRENT_USER: string = 'UserActions.REQUEST_CURRENT_USER';
export const REQUEST_CURRENT_USER_FINISHED: string = 'UserActions.REQUEST_CURRENT_USER_FINISHED';

export const requestCurrentUser = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<UserResultModel>(dispatch, REQUEST_CURRENT_USER, UserEffects.requestCurrentUser);
  };
};
