import * as PaymentTypeActions from './PaymentTypeActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IPaymentTypeState from './models/IPaymentTypeState';
import PaymentTypeModel from './models/PaymentTypeModel';

export const initialState: IPaymentTypeState = {
  data: [],
  error: false,
};

const paymentTypeReducer: Reducer = baseReducer(initialState, {
  [PaymentTypeActions.REQUEST_PAYMENT_TYPE_FINISHED](state: IPaymentTypeState, action: IAction<PaymentTypeModel[]>): IPaymentTypeState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default paymentTypeReducer;
