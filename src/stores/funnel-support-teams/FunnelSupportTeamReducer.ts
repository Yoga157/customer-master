import * as SupportTeamActions from './FunnelSupportTeamActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ISupportTeamState from './models/IFunnelSupportTeamState';
import FunnelSupportTeamEnvelope from './models/FunnelSupportTeamEnvelope';
import FunnelSupportTeamModel from './models/FunnelSupportTeamModel';

export const initialState: ISupportTeamState = {
  listData: new FunnelSupportTeamEnvelope({}),
  data: new FunnelSupportTeamModel({}),
  error: false,
  refreshPage: false,
};

const funnelSupportTeamReducer: Reducer = baseReducer(initialState, {
  [SupportTeamActions.REQUEST_SUPPORT_TEAMS_FINISHED](state: ISupportTeamState, action: IAction<FunnelSupportTeamEnvelope>): ISupportTeamState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [SupportTeamActions.REQUEST_SUPPORT_TEAM_FINISHED](state: ISupportTeamState, action: IAction<FunnelSupportTeamModel>): ISupportTeamState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [SupportTeamActions.REQUEST_POST_SUPPORT_TEAMS_FINISHED](state: ISupportTeamState, action: IAction<FunnelSupportTeamModel>): ISupportTeamState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [SupportTeamActions.REQUEST_PUT_SUPPORT_TEAMS_FINISHED](state: ISupportTeamState, action: IAction<FunnelSupportTeamModel>): ISupportTeamState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [SupportTeamActions.DEL_SUPPORT_TEAM_FINISHED](state: ISupportTeamState, action: IAction<FunnelSupportTeamModel>): ISupportTeamState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
});

export default funnelSupportTeamReducer;
