import * as CustomerEffect from './CustomerEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import CustomerModel from './models/CustomerModel';
import UploadModel from './models/UploadModel';
import CustomersModel from './models/CustomersModel';
import CustomerFileModel from './models/CustomersModel';
import CustomerExistingModel from './models/CustomerExistingModel';
import CustomerOptions from './models/CustomerOptions';
import CustomerToFunnelModel from './models/CustomerToFunnelModel';
import CustomerToFunnelEnvelope from './models/CustomerToFunnelEnvelope';
import CustomerFunnel from './models/CustomerFunnel';
import ResultActions from 'models/ResultActions';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | CustomerModel
  | CustomersModel
  | UploadModel
  | CustomerFileModel
  | CustomerOptions
  | CustomerToFunnelModel
  | CustomerToFunnelEnvelope
  | CustomerFunnel
  | ResultActions
  | CustomerExistingModel;

export const REQUEST_CUSTOMER_FUNNEL: string = 'CustomerActions.REQUEST_CUSTOMER_FUNNEL';
export const REQUEST_CUSTOMER_FUNNEL_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMER_FUNNEL_FINISHED';

export const requestCustomerFunnel = (fromSales: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerFunnel>(dispatch, REQUEST_CUSTOMER_FUNNEL, CustomerEffect.requestCustomerFunnel, fromSales);
  };
};

export const POST_CUSTOMER: string = 'CustomerActions.REQUEST_POST_CUSTOMER';
export const POST_CUSTOMER_FINISHED = 'CustomerActions.REQUEST_POST_CUSTOMER_FINISHED';
export const postCustomer = (data: CustomersModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_CUSTOMER, CustomerEffect.postCustomer, data);
  };
};

export const PUT_CUSTOMER: string = 'CustomerActions.PUT_CUSTOMER';
export const PUT_CUSTOMER_FINISHED = 'CustomerActions.PUT_CUSTOMER_FINISHED';
export const putCustomer = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PUT_CUSTOMER, CustomerEffect.putCustomer, data);
  };
};

export const PUT_CUSTOMER_NPWP: string = 'CustomerActions.PUT_CUSTOMER_NPWP';
export const PUT_CUSTOMER_NPWP_FINISHED = 'CustomerActions.PUT_CUSTOMER_NPWP_FINISHED';
export const putCustomerNPWP = (data: CustomerModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerModel>(dispatch, PUT_CUSTOMER_NPWP, CustomerEffect.putCustomerNPWP, data);
  };
};

export const POST_FILE: string = 'CustomerActions.REQUEST_POST_FILE';
export const POST_FILE_FINISHED = 'CustomerActions.REQUEST_POST_FILE_FINISHED';
export const postFile = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_FILE, CustomerEffect.postUpload, data);
  };
};

export const REQUEST_CUSTOMERS: string = 'CustomerActions.REQUEST_CUSTOMERS';
export const REQUEST_CUSTOMERS_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMERS_FINISHED';

export const requestCustomers = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerModel>(dispatch, REQUEST_CUSTOMERS, CustomerEffect.requestCustomers);
  };
};

export const REQUEST_CUSTOMERS_BY_NAME: string = 'CustomerActions.REQUEST_CUSTOMERS_BY_NAME';
export const REQUEST_CUSTOMERS_BY_NAME_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMERS_BY_NAME_FINISHED';

export const requestCustomerByName = (custName: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerModel>(dispatch, REQUEST_CUSTOMERS, CustomerEffect.requestCustomerByName, custName);
  };
};

export const REQUEST_CUSTOMERS_BY_NAME_BLACKLIST: string = 'CustomerActions.REQUEST_CUSTOMERS_BY_NAME_BLACKLIST';
export const REQUEST_CUSTOMERS_BY_NAME_BLACKLIST_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMERS_BY_NAME_BLACKLIST_FINISHED';

export const requestCustomerByNameBlackList = (custName: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerOptions>(
      dispatch,
      REQUEST_CUSTOMERS_BY_NAME_BLACKLIST,
      CustomerEffect.requestCustomerByNameBlackList,
      custName
    );
  };
};

export const REQUEST_CUSTOMERS_TYPE_C: string = 'CustomerActions.REQUEST_CUSTOMERS_TYPE_C';
export const REQUEST_CUSTOMERS_TYPE_C_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMERS_TYPE_C_FINISHED';

export const requestCustomerTypeC = (custName: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerModel>(
      dispatch,
      REQUEST_CUSTOMERS_TYPE_C,
      CustomerEffect.requestCustomerTypeC,
      custName
    );
  };
};

export const REQUEST_CUSTOMER_BY_ID: string = 'CustomerActions.REQUEST_CUSTOMERS_BY_NAME';
export const REQUEST_CUSTOMER_BY_ID_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMERS_BY_NAME_FINISHED';

export const requestCustomerById = (customerGenId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerModel>(dispatch, REQUEST_CUSTOMER_BY_ID, CustomerEffect.requestCustomerById, customerGenId);
  };
};

export const REQUEST_CUSTOMER_EXISTING: string = 'CustomerActions.REQUEST_CUSTOMER_EXISTING';
export const REQUEST_CUSTOMER_EXISTING_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMER_EXISTING_FINISHED';
export const requestCustomerExisting = (customerName: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerExistingModel>(dispatch, REQUEST_CUSTOMER_EXISTING, CustomerEffect.requestExisting, customerName);
  };
};

export const REQUEST_CUSTOMER_EXISTING_FUNNEL: string = 'CustomerActions.REQUEST_CUSTOMER_EXISTING_FUNNEL';
export const REQUEST_CUSTOMER_EXISTING_FUNNEL_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMER_EXISTING_FUNNEL_FINISHED';
export const requestCustomerExistingFunnel = (customerName: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerExistingModel>(
      dispatch,
      REQUEST_CUSTOMER_EXISTING_FUNNEL,
      CustomerEffect.requestExistingFunnel,
      customerName
    );
  };
};

export const REQUEST_POST_CUSTOMER_FUNNEL_LOCAL: string = 'CustomerActions.REQUEST_POST_CUSTOMER_FUNNEL_LOCAL';
export const REQUEST_POST_CUSTOMER_FUNNEL_LOCAL_FINISHED: string = 'CustomerActions.REQUEST_POST_CUSTOMER_FUNNEL_LOCAL_FINISHED';

export const postCustomerFunnelLocal = (data: CustomerToFunnelModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerToFunnelModel>(
      dispatch,
      REQUEST_POST_CUSTOMER_FUNNEL_LOCAL,
      CustomerEffect.postCustomerToFunnelLocal,
      data
    );
  };
};

export const REQUEST_CUSTOMER_FUNNEL_LOCAL: string = 'CustomerActions.REQUEST_CUSTOMER_FUNNEL_LOCAL';
export const REQUEST_CUSTOMER_FUNNEL_LOCAL_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMER_FUNNEL_LOCAL_FINISHED';

export const requestCustomerFunnelLocal = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerToFunnelEnvelope>(
      dispatch,
      REQUEST_CUSTOMER_FUNNEL_LOCAL,
      CustomerEffect.requestCustomerFunnelLocal
    );
  };
};

export const REQUEST_CUSTOMER_IDC_NOTNULL: string = 'CustomerActions.REQUEST_CUSTOMER_IDC_NOTNULL';
export const REQUEST_CUSTOMER_IDC_NOTNULL_FINISHED: string = 'CustomerActions.REQUEST_CUSTOMER_IDC_NOTNULL_FINISHED';

export const requestCustomerIDCNotNull = (custName: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerModel>(
      dispatch,
      REQUEST_CUSTOMER_IDC_NOTNULL,
      CustomerEffect.requestCustomerIDCNotNull,
      custName
    );
  };
};