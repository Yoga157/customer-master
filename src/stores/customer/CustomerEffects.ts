import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import CustomerModel from './models/CustomerModel';
import CustomerFileModel from './models/CustomerFileModel';
import CustomersModel from './models/CustomersModel';
import CustomerExistingModel from './models/CustomerExistingModel';
import CustomerToFunnelModel from './models/CustomerToFunnelModel';
import CustomerToFunnelEnvelope from './models/CustomerToFunnelEnvelope';
import CustomerFunnel from './models/CustomerFunnel';
import ResultActions from 'models/ResultActions';
import CustomerOptions from './models/CustomerOptions';
export const requestCustomerFunnel = async (fromSales: number): Promise<CustomerFunnel | HttpErrorResponseModel> => {
  const controllerName = `FunnelCustomer/${fromSales}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CustomerFunnel>(CustomerFunnel, endpoint);
};

export const requestExisting = async (customerName: string): Promise<CustomerExistingModel | HttpErrorResponseModel> => {
  const controllerName = `Customer/CheckCustomerExisting=${customerName}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<CustomerExistingModel>(CustomerExistingModel, endpoint);
};

export const requestExistingFunnel = async (customerName: string): Promise<CustomerExistingModel | HttpErrorResponseModel> => {
  const controllerName = `Customer/CheckCustomerExistingFunnel=${customerName}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<CustomerExistingModel>(CustomerExistingModel, endpoint);
};

export const postCustomer = async (data: CustomersModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'Customer';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const putCustomer = async (data: CustomersModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'Customer/UpdateCustomer';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};

export const putCustomerNPWP = async (data: CustomerModel): Promise<CustomerModel | HttpErrorResponseModel> => {
  const controllerName = 'Customer/UpdateNPWP';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<CustomerModel>(CustomerModel, endpoint, data);
};

export const postUpload = async (data: CustomerFileModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FileCustomerCard';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};

// export const requestCustomers = async():Promise<CustomerOptions | HttpErrorResponseModel> => {
//   let controllerName = 'Customer';
//   const endpoint: string = environment.api.generic.replace(':controller',controllerName);

//   return EffectUtility.getToModel<CustomerOptions>(CustomerOptions, endpoint);
// };

export const requestCustomers = async (): Promise<CustomerModel | HttpErrorResponseModel> => {
  const controllerName = 'Customer';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<CustomerModel>(CustomerModel, endpoint);
};

export const requestCustomerById = async (customerGenId: number): Promise<CustomerModel | HttpErrorResponseModel> => {
  const controllerName = `Customer/genid=${customerGenId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<CustomerModel>(CustomerModel, endpoint);
};

export const requestCustomerByName = async (CustName: string): Promise<CustomerModel | HttpErrorResponseModel> => {
  const controllerName = 'Customer/SearchCustomer?CustName=' + CustName;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.postToModel<CustomerModel>(CustomerModel, endpoint);
};

export const requestCustomerByNameBlackList = async (CustName: string): Promise<CustomerOptions | HttpErrorResponseModel> => {
  const controllerName = 'Customer/SearchCustomerWithFlag?CustName=' + CustName;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.postToModel<CustomerOptions>(CustomerOptions, endpoint);
};

export const requestCustomerTypeC = async (CustName: string): Promise<CustomerModel | HttpErrorResponseModel> => {
  const controllerName = 'Customer/SearchCustomerTypeC?CustName=' + CustName;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.postToModel<CustomerModel>(CustomerModel, endpoint);
};

export const requestCustomerIDCNotNull = async (CustName: string): Promise<CustomerModel | HttpErrorResponseModel> => {
  const controllerName = 'Customer/SearchCustomerIDCNotNull?CustName=' + CustName;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.postToModel<CustomerModel>(CustomerModel, endpoint);
};

export const requestCustomerFunnelLocal = async (): Promise<CustomerToFunnelEnvelope | HttpErrorResponseModel> => {
  const jsonString = localStorage.getItem('customerFunnel');
  let listCustomerFunnel: CustomerToFunnelModel[] = [];
  let totalRows: number = 0;
  if (jsonString !== null) {
    listCustomerFunnel = JSON.parse(jsonString);
    totalRows = listCustomerFunnel.length;
  }
  const result = new CustomerToFunnelEnvelope({ totalRows: totalRows, rows: listCustomerFunnel });
  return result;
};

export const postCustomerToFunnelLocal = async (data: CustomerToFunnelModel): Promise<CustomerToFunnelModel | HttpErrorResponseModel> => {
  data.customerPICID = 1;

  const customerFunnel = new CustomerToFunnelModel(data);
  localStorage.setItem('customerFunnel', JSON.stringify(customerFunnel));
  return customerFunnel;
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
