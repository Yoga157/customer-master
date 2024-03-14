import ISupportRoleState from './models/ISupportRoleState';
import * as SupportRoleActions from './SupportRoleActions';
import IAction from '../../models/IAction';
import SupportRoleModel from './models/SupportRoleModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: ISupportRoleState = {
  data: [],
  error: false,
};

const supportRoleReducer: Reducer = baseReducer(initialState, {
  [SupportRoleActions.REQUEST_SUPPORT_ROLE_FINISHED](state: ISupportRoleState, action: IAction<SupportRoleModel[]>): ISupportRoleState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default supportRoleReducer;
