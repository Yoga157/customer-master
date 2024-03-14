import IInsuranceState from './models/IInsuranceState';
import * as InsuranceAction from './InsuranceAction';
import IAction from '../../models/IAction';
import InsuranceModel from './models/InsuranceModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IInsuranceState = {
  data: [],
  error: false,
};

const insuranceReducer: Reducer = baseReducer(initialState, {
  [InsuranceAction.REQUEST_INSURANCE_FINISHED](state: IInsuranceState, action: IAction<InsuranceModel[]>): IInsuranceState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default insuranceReducer;
