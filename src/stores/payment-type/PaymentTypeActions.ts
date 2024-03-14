import * as PaymentTypeEffects from './PaymentTypeEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import PaymentTypeModel from './models/PaymentTypeModel';

type ActionUnion = undefined | HttpErrorResponseModel | PaymentTypeModel[];

export const REQUEST_PAYMENT_TYPE: string = 'PaymentTypeActions.REQUEST_PAYMENT_TYPE';
export const REQUEST_PAYMENT_TYPE_FINISHED: string = 'PaymentTypeActions.REQUEST_PAYMENT_TYPE_FINISHED';

export const requestPaymentType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<PaymentTypeModel[]>(dispatch, REQUEST_PAYMENT_TYPE, PaymentTypeEffects.requestPaymentType);
  };
};
