import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import LoginModel from './models/LoginModel';
import UserResultModel from './models/UserResultModel';
import GundamByEntryKeyModel from 'stores/project-gundam/models/GundamByEntryKeyModel';

export const postLogin = async (data: LoginModel): Promise<UserResultModel | HttpErrorResponseModel> => {
  const controllerName = 'Auth/Login';
  const endpoint: string = environment.api.auth.replace(':controller', controllerName);
  return EffectUtility.postToModel<UserResultModel>(UserResultModel, endpoint, data);
};

export const postLogout = async (data: UserResultModel): Promise<UserResultModel | HttpErrorResponseModel> => {
  localStorage.removeItem('userLogin');
  const result: UserResultModel = new UserResultModel({});
  return result;
};

export const postLoginLocal = async (data: UserResultModel): Promise<UserResultModel | HttpErrorResponseModel> => {
  localStorage.setItem('userLogin', JSON.stringify(data));
  return data;
};

export const requestCurrentUser = async (): Promise<UserResultModel | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('userLogin');
  let result: UserResultModel = new UserResultModel({});

  // console.log(jsonString);
  if (jsonString !== null) {
    result = JSON.parse(jsonString);
  }

  return result;
};

/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.auth;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
