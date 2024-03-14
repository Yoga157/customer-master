import * as FunnelStatusEffects from './FunnelPerformanceEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import FunnelSplitModel from './models/FunnelSplitModel';
import FunnelStatusUdcModel from './models/FunnelStatusUdcModel';
import FunnelSplitEnvelope from './models/FunnelSplitEnvelope';
import SplitTypeModel from './models/SplitTypeModel';
import ResultActions from 'models/ResultActions';
import FunnelSplitModelUpdate from './models/FunnelSplitUpdateModel';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | ResultActions
  | FunnelSplitModel[]
  | FunnelStatusUdcModel
  | FunnelSplitEnvelope
  | SplitTypeModel
  | FunnelSplitModelUpdate;

export const REQUEST_FUNNEL_SPLIT: string = 'FunnelSplitActions.REQUEST_FUNNEL_SPLIT';
export const REQUEST_FUNNEL_SPLIT_FINISHED: string = 'FunnelSplitActions.REQUEST_FUNNEL_SPLIT_FINISHED';

export const requestFunnelSplit = (funnelGenID: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSplitEnvelope>(
      dispatch,
      REQUEST_FUNNEL_SPLIT,
      FunnelStatusEffects.requestFunnelSplit,
      funnelGenID,
      page,
      pageSize
    );
  };
};

export const REQUEST_INSERT_FUNNEL_SPLIT: string = 'FunnelSplitActions.REQUEST_INSERT_FUNNEL_SPLIT';
export const REQUEST_INSERT_FUNNEL_SPLIT_FINISHED: string = 'FunnelSplitActions.REQUEST_INSERT_FUNNEL_SPLIT_FINISHED';

export const requestInsertFunnelSplit = (data: FunnelSplitModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_INSERT_FUNNEL_SPLIT, FunnelStatusEffects.requestInsertFunnelSplit, data);
  };
};

export const REQUEST_UPDATE_FUNNEL_SPLIT: string = 'FunnelSplitActions.REQUEST_UPDATE_FUNNEL_SPLIT';
export const REQUEST_UPDATE_FUNNEL_SPLIT_FINISHED: string = 'FunnelSplitActions.REQUEST_UPDATE_FUNNEL_SPLIT_FINISHED';

export const requestUpdateFunnelSplit = (data: FunnelSplitModelUpdate): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_UPDATE_FUNNEL_SPLIT, FunnelStatusEffects.requestUpdateFunnelSplit, data);
  };
};

export const REQUEST_SPLIT_TYPE: string = 'FunnelSplitActions.REQUEST_SPLIT_TYPE';
export const REQUEST_SPLIT_TYPE_FINISHED: string = 'FunnelSplitActions.REQUEST_SPLIT_TYPE_FINISHED';

export const requestSplitType = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<SplitTypeModel>(dispatch, REQUEST_SPLIT_TYPE, FunnelStatusEffects.requestSplitType);
  };
};

export const REQUEST_DELETE_FUNNEL_SPLIT: string = 'FunnelSplitActions.REQUEST_DELETE_FUNNEL_SPLIT';
export const REQUEST_DELETE_FUNNEL_SPLIT_FINISHED: string = 'FunnelSplitActions.REQUEST_DELETE_FUNNEL_SPLIT_FINISHED';

export const requestDeleteFunnelSplit = (FunnelSplitID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_DELETE_FUNNEL_SPLIT,
      FunnelStatusEffects.requestDeleteFunnelSplit,
      FunnelSplitID
    );
  };
};
