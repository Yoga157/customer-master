import IFunnleStatusState from './models/IFunnleStatusState';
import * as FunnelStatusActions from './FunnelStatusActions';
import IAction from 'models/IAction';
import baseReducer from 'utilities/BaseReducer';
import { Reducer } from 'redux';
import FunnelStatusModel from './models/FunnelStatusModel';
import FunnelStatusUdcModel from './models/FunnelStatusUdcModel';

export const initialState: IFunnleStatusState = {
  data: [],
  dataStatus: new FunnelStatusUdcModel({}),
  error: false,
};

const funnelStatusReducer: Reducer = baseReducer(initialState, {
  [FunnelStatusActions.REQUEST_FUNNEL_STATUS_FINISHED](state: IFunnleStatusState, action: IAction<FunnelStatusModel[]>): IFunnleStatusState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
  [FunnelStatusActions.REQUEST_FUNNEL_STATUS_BY_ID_FINISHED](state: IFunnleStatusState, action: IAction<FunnelStatusUdcModel>): IFunnleStatusState {
    return {
      ...state,
      dataStatus: action.payload!,
      error: action.error!,
    };
  },
});

export default funnelStatusReducer;
