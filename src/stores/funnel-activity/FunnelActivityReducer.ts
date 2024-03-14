import IFunnelActivityState from './models/IFunnelActivityState';
import * as FunnelActivityActions from './FunnelActivityActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import FunnelActivityModel from './models/FunnelActivityModel';
import FunnelActivitiesModel from './models/FunnelActivitiesModel';
import FunnelNotesModel from './models/FunnelNotesModel';

export const initialState: IFunnelActivityState = {
  data: [],
  firstData: new FunnelActivityModel({}),
  activityData: new FunnelActivitiesModel({}),
  notes: new FunnelNotesModel({}),
  error: false,
  refreshPage: false,
};

const funnelActivitiesReducer: Reducer = baseReducer(initialState, {
  [FunnelActivityActions.REQUEST_FUNNEL_ACTIVITIES_FINISHED](
    state: IFunnelActivityState,
    action: IAction<FunnelActivitiesModel[]>
  ): IFunnelActivityState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActivityActions.REQUEST_FUNNEL_ACTIVITY_FINISHED](
    state: IFunnelActivityState,
    action: IAction<FunnelActivitiesModel>
  ): IFunnelActivityState {
    return {
      ...state,
      activityData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActivityActions.REQUEST_POST_FUNNEL_ACTIVITY_FINISHED](
    state: IFunnelActivityState,
    action: IAction<FunnelActivityModel>
  ): IFunnelActivityState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActivityActions.REQUEST_POST_FUNNEL_NOTES_FINISHED](state: IFunnelActivityState, action: IAction<FunnelNotesModel>): IFunnelActivityState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActivityActions.REQUEST_POST_FUNNEL_ACTIVITY_SEARCH_FINISHED](
    state: IFunnelActivityState,
    action: IAction<FunnelActivitiesModel[]>
  ): IFunnelActivityState {
    return {
      ...state,
      error: action.error!,
      refreshPage: false,
      data: action.payload!,
    };
  },
});

export default funnelActivitiesReducer;
