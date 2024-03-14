import IBondIssuerState from './models/IBondIssuerState';
import * as BondIssuerAction from './BondIssuerAction';
import IAction from '../../models/IAction';
import BondIssuerModel from './models/BondIssuerModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IBondIssuerState = {
  data: [],
  error: false,
};

const bondIssuerReducer: Reducer = baseReducer(initialState, {
  [BondIssuerAction.REQUEST_BOND_ISSUER_FINISHED](state: IBondIssuerState, action: IAction<BondIssuerModel[]>): IBondIssuerState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default bondIssuerReducer;
