import IUserState from './models/IUserState';
import * as UserActions from './UserActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import UserResultModel from './models/UserResultModel';

export const initialState: IUserState = {
  data: new UserResultModel({}),
  error: false,
  refreshPage: false,
};

const userReducer: Reducer = baseReducer(initialState, {
  [UserActions.REQUEST_POST_LOGIN_FINISHED](state: IUserState, action: IAction<UserResultModel>): IUserState {
    return {
      ...state,
      error: action.error!,
      data: action.payload!,
      refreshPage: action.error ? false : true,
    };
  },

  [UserActions.REQUEST_POST_LOGIN_LOCAL_FINISHED](state: IUserState, action: IAction<UserResultModel>): IUserState {
    return {
      ...state,
      error: action.error!,
      data: action.payload!,
      refreshPage: action.error ? false : true,
    };
  },

  [UserActions.REQUEST_POST_LOGOUT_FINISHED](state: IUserState, action: IAction<UserResultModel>): IUserState {
    return {
      ...state,
      error: action.error!,
      data: action.payload!,
      refreshPage: action.error ? false : true,
    };
  },

  [UserActions.REQUEST_CURRENT_USER_FINISHED](state: IUserState, action: IAction<UserResultModel>): IUserState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
});

export default userReducer;
