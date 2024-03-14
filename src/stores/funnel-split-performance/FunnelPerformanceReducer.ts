import IFunnelPerformanceState from './models/IFunnelPerformanceState';
import * as FunnelStatusActions from './FunnelPerformanceActions';
import IAction from 'models/IAction';
import baseReducer from 'utilities/BaseReducer';
import { Reducer } from 'redux';
import FunnelStatusModel from './models/FunnelSplitModel';
import FunnelStatusUdcModel from './models/FunnelStatusUdcModel';
import FunnelSplitEnvelope from './models/FunnelSplitEnvelope';
import ResultActions from 'models/ResultActions';
import SplitTypeModel from './models/SplitTypeModel';

export const initialState: IFunnelPerformanceState = {
  data: new FunnelSplitEnvelope({}),
  dataStatus: new FunnelStatusUdcModel({}),
  splitType: [],
  ResultActions: new ResultActions({}),
  error: false,
};

const funnelStatusReducer: Reducer = baseReducer(initialState, {
  [FunnelStatusActions.REQUEST_FUNNEL_SPLIT_FINISHED](state: IFunnelPerformanceState, action: IAction<FunnelSplitEnvelope>): IFunnelPerformanceState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },

  [FunnelStatusActions.REQUEST_INSERT_FUNNEL_SPLIT_FINISHED](
    state: IFunnelPerformanceState,
    action: IAction<ResultActions>
  ): IFunnelPerformanceState {
    return {
      ...state,
      ResultActions: action.payload!,
      error: action.error!,
    };
  },

  [FunnelStatusActions.REQUEST_UPDATE_FUNNEL_SPLIT_FINISHED](
    state: IFunnelPerformanceState,
    action: IAction<ResultActions>
  ): IFunnelPerformanceState {
    return {
      ...state,
      ResultActions: action.payload!,
      error: action.error!,
    };
  },

  [FunnelStatusActions.REQUEST_DELETE_FUNNEL_SPLIT_FINISHED](
    state: IFunnelPerformanceState,
    action: IAction<ResultActions>
  ): IFunnelPerformanceState {
    return {
      ...state,
      ResultActions: action.payload!,
      error: action.error!,
    };
  },

  [FunnelStatusActions.REQUEST_SPLIT_TYPE_FINISHED](state: IFunnelPerformanceState, action: IAction<any>): IFunnelPerformanceState {
    return {
      ...state,
      splitType: action.payload!,
      error: action.error!,
    };
  },
});

export default funnelStatusReducer;
