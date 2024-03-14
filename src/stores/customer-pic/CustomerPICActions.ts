import * as CustomerPICEffect from './CustomerPICEffects';
import * as CustomerPICActivityEffects from './CustomerPICActivityEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import CustomerPICModel from './models/CustomerPICModel';
import CustomerPICSettingModel from './models/CustomerPICSettingModel';
import ResultActions from 'models/ResultActions';
import IAction from "models/IAction";

type ActionUnion = undefined | HttpErrorResponseModel | CustomerPICModel | CustomerPICSettingModel | ResultActions;

export const REQUEST_GET_CUSTOMER_PIC: string = "CustomerNameAction.REQUEST_GET_CUSTOMER_PIC";
export const REQUEST_GET_CUSTOMER_PIC_FINISHED: string = "CustomerNameAction.REQUEST_GET_CUSTOMER_PIC_FINISHED";

export const requestGetCustomerPIC = (customerID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_GET_CUSTOMER_PIC,
            CustomerPICActivityEffects.requestGetCustomerPIC,
            customerID
        )
    }
}

export const REQUEST_CUSTOMER_PIC: string = 'CustomerPICActions.REQUEST_CUSTOMER_PIC';
export const REQUEST_CUSTOMER_PIC_FINISHED: string = 'CustomerPICActions.REQUEST_CUSTOMER_PIC_FINISHED';

export const requestCustomerPIC = (customerGenID: number, salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerPICModel>(
      dispatch,
      REQUEST_CUSTOMER_PIC,
      CustomerPICEffect.requestCustomerPIC,
      customerGenID,
      salesID
    );
  };
};

export const REQUEST_CUSTOMER_PIC_BYID: string = 'CustomerPICActions.REQUEST_CUSTOMER_PIC_BYID';
export const REQUEST_CUSTOMER_PIC_BYID_FINISHED: string = 'CustomerPICActions.REQUEST_CUSTOMER_PIC_BYID_FINISHED';

export const requestCustomerPICBYID = (customerPICID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerPICModel>(
      dispatch,
      REQUEST_CUSTOMER_PIC_BYID,
      CustomerPICEffect.requestCustomerPICByID,
      customerPICID
    );
  };
};

export const POST_CUSTOMER_PIC: string = 'CustomerPICActions.REQUEST_POST_CUSTOMER_PIC';
export const POST_CUSTOMER_PIC_FINISHED = 'CustomerPICActions.REQUEST_POST_CUSTOMER_PIC_FINISHED';
export const postCustomerPIC = (data: CustomerPICModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_CUSTOMER_PIC, CustomerPICEffect.postCustomerPIC, data);
  };
};

export const PUT_CUSTOMER_PIC: string = 'CustomerPICActions.REQUEST_PUT_CUSTOMER_PIC';
export const PUT_CUSTOMER_PIC_FINISHED = 'CustomerPICActions.REQUEST_PUT_CUSTOMER_PIC_FINISHED';
export const putCustomerPIC = (data: CustomerPICModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, PUT_CUSTOMER_PIC, CustomerPICEffect.putCustomerPIC, data);
  };
};

export const REMOVE_FIRSTDATA_CUSTOMER_PIC: string = 'CustomerPICActions.REMOVE_FIRSTDATA_CUSTOMER_PIC';
export const REMOVE_FIRSTDATA_CUSTOMER_PIC_FINISHED: string = 'CustomerPICActions.REMOVE_FIRSTDATA_CUSTOMER_PIC_FINISHED';

export const removeCustomerPIC = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerPICModel>(dispatch, REMOVE_FIRSTDATA_CUSTOMER_PIC, CustomerPICEffect.removeCustomerPIC);
  };
};
