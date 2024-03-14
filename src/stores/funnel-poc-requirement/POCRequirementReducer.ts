import * as POCRequirementActions from './POCRequirementActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IPOCRequirementState from './models/IPOCRequirementState';
import POCRequirementEnvelope from './models/POCRequirementEnvelope';
import POCRequirementDashboard from './models/POCRequirementDashboard';

export const initialState: IPOCRequirementState = {
  listData: new POCRequirementEnvelope({}),
  firstData: new POCRequirementDashboard({}),
  error: false,
  refreshPage: false,
};

const pocRequirementReducer: Reducer = baseReducer(initialState, {
  [POCRequirementActions.REQUEST_POC_REQUIREMENT_FINISHED](
    state: IPOCRequirementState,
    action: IAction<POCRequirementEnvelope>
  ): IPOCRequirementState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [POCRequirementActions.REQUEST_POC_REQUIREMENT_BY_ID_FINISHED](
    state: IPOCRequirementState,
    action: IAction<POCRequirementDashboard>
  ): IPOCRequirementState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [POCRequirementActions.DEL_POC_REQUIREMENT_FINISHED](state: IPOCRequirementState, action: IAction<POCRequirementDashboard>): IPOCRequirementState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [POCRequirementActions.POST_POC_REQUIREMENT_FINISHED](state: IPOCRequirementState, action: IAction<POCRequirementDashboard>): IPOCRequirementState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [POCRequirementActions.PUT_POC_REQUIREMENT_COMPELETED_FINISHED](
    state: IPOCRequirementState,
    action: IAction<POCRequirementDashboard>
  ): IPOCRequirementState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
});

export default pocRequirementReducer;
