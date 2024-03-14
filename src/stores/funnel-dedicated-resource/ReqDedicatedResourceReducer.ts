import * as ReqDedicatedResourceActions from './ReqDedicatedResourceActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IReqDedicatedResourceState from './models/IReqDedicatedResourceState';
import ReqDedicatedResourceEnvelope from './models/ReqDedicatedResourceEnvelope';
import ReqDedicatedResourceModel from './models/ReqDedicatedResourceModel';

export const initialState: IReqDedicatedResourceState = {
  listData: new ReqDedicatedResourceEnvelope({}),
  data: new ReqDedicatedResourceModel({}),
  error: false,
  refreshPage: false,
};

const reqDedicatedResourceReducer: Reducer = baseReducer(initialState, {
  [ReqDedicatedResourceActions.REQUEST_DEDICATED_RESOURCE_FINISHED](
    state: IReqDedicatedResourceState,
    action: IAction<ReqDedicatedResourceEnvelope>
  ): IReqDedicatedResourceState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ReqDedicatedResourceActions.REQUEST_DEDICATED_RESOURCE_REQ_GEN_ID_FINISHED](
    state: IReqDedicatedResourceState,
    action: IAction<ReqDedicatedResourceModel>
  ): IReqDedicatedResourceState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [ReqDedicatedResourceActions.POST_REQ_DEDICATED_RESOURCE_FINISHED](
    state: IReqDedicatedResourceState,
    action: IAction<ReqDedicatedResourceModel>
  ): IReqDedicatedResourceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [ReqDedicatedResourceActions.PUT_REQ_DEDICATED_RESOURCE_FINISHED](
    state: IReqDedicatedResourceState,
    action: IAction<ReqDedicatedResourceModel>
  ): IReqDedicatedResourceState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
});

export default reqDedicatedResourceReducer;
