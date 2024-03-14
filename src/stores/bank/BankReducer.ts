import IBankState from './models/IBankState';
import * as BankAction from './BankAction';
import IAction from '../../models/IAction';
import BankModel from './models/BankModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IBankState = {
  data: [],
  error: false,
};

const bankReducer: Reducer = baseReducer(initialState, {
  [BankAction.REQUEST_BANK_FINISHED](state: IBankState, action: IAction<BankModel[]>): IBankState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default bankReducer;
