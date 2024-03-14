import IBondTypeState from './models/IBondTypeState';
import * as BondTypeAction from './BondTypeAction';
import IAction from '../../models/IAction';
import BondTypeModel from './models/BondTypeModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IBondTypeState = {
  data: [],
  error: false,
};

const bondTypeReducer: Reducer = baseReducer(initialState, {
  [BondTypeAction.REQUEST_BOND_TYPE_FINISHED](state: IBondTypeState, action: IAction<BondTypeModel[]>): IBondTypeState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default bondTypeReducer;
