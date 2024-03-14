import environment from 'environment'
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios'
import * as EffectUtility from '../../utilities/EffectUtility'
import CustomerPICModel from './models/CustomerPICModel';
import ResultActions from 'models/ResultActions';

export const requestCustomerPIC = async(customerGenID:number, salesID:number):Promise<CustomerPICModel | HttpErrorResponseModel> => {
  let controllerName = 'CustomerPIC/customerGenID=' + customerGenID + '?salesID=' + salesID ;
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);

  return EffectUtility.getToModel<CustomerPICModel>(CustomerPICModel, endpoint);
};

export const requestCustomerPICByID = async(customerPICID:number):Promise<CustomerPICModel | HttpErrorResponseModel> => {
  let controllerName = 'CustomerPIC/customerPICID=' + customerPICID;
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);

  return EffectUtility.getToModel<CustomerPICModel>(CustomerPICModel, endpoint);
};

export const postCustomerPIC = async(data:CustomerPICModel):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = 'CustomerPIC';
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};


export const putCustomerPIC = async(data:CustomerPICModel):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = 'CustomerPIC';
  const endpoint: string = environment.api.generic.replace(':controller',controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const removeCustomerPIC = async(data:CustomerPICModel):Promise<CustomerPICModel | HttpErrorResponseModel > => {
let clearResult = new CustomerPICModel({})  
return clearResult
};



/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.generic;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
