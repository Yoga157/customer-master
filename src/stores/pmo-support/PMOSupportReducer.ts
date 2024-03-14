import IPMOSupportState from './models/IPMOSupportState';
import * as PMOSupportActions from './PMOSupportActions';
import IAction from '../../models/IAction';
import PMOSupportModel from './models/PMOSupportModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IPMOSupportState = {
  data: new PMOSupportModel({}),
  error: false,
};

const pmoSupportReducer: Reducer = baseReducer(initialState, {
  [PMOSupportActions.REQUEST_PMO_FINISHED](state: IPMOSupportState, action: IAction<PMOSupportModel>): IPMOSupportState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default pmoSupportReducer;
