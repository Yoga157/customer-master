import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ICommissionIndexState from './models/ICommissionIndexState';

import * as CommissionIndexActions from './CommissionIndexActions';
import CommissionIndexModel from './models/CommissionIndexModel';

export const initialState: ICommissionIndexState = {
  commissionIndex: [],
  error: false,
  refreshPage: false,
};

const commissionIndexReducer: Reducer = baseReducer(initialState, {
  [CommissionIndexActions.REQUEST_COMMISION_INDEX_FINISHED](
    state: ICommissionIndexState,
    action: IAction<CommissionIndexModel[]>
  ): ICommissionIndexState {
    return {
      ...state,
      commissionIndex: action.payload!,
      error: action.error!,
      refreshPage: false,
    };
  },
});

export default commissionIndexReducer;
