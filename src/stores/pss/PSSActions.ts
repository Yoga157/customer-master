import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import * as ActionUtility from '../../utilities/ActionUtility';
import PSSFirstLastModel from "./models/PSSFirstLastModel";
import HistoryPSSModels from "./models/HistoryPSSModels";
import { ReduxDispatch } from "models/ReduxProps";
import PSSListModel from "./models/PSSListModel";
import ResultActions from "models/ResultActions";
import PSSModels from "./models/PSSModels";
import * as PSSEffects from "./PSSEffects";
import IAction from "models/IAction";


type ActionUnion =
  | undefined
  | boolean
  | HttpErrorResponseModel
  | ResultActions
  | PSSListModel
  | any[]
  | PSSModels
  | PSSFirstLastModel
  | HistoryPSSModels

  
export const GET_LIST_PSS: string = 'PSSActions.REQUEST_GET_LIST_PSS';
export const GET_LIST_PSS_FINISHED: string = 'PSSActions.REQUEST_GET_LIST_PSS_FINISHED';
  export const getListPSS = (page: number, funnelGenId: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PSSListModel>(
      dispatch,
      GET_LIST_PSS,
      PSSEffects.getListPSS,
      page,
      funnelGenId,
    );
  };
};
  
export const CREATE_PSS: string = 'PSSActions.REQUEST_CREATE_PSS';
export const CREATE_PSS_FINISHED: string = 'PSSActions.REQUEST_CREATE_PSS_FINISHED';
  export const reqPostPSS = (data: any): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      CREATE_PSS,
      PSSEffects.reqPostPSS,
      data,
    );
  };
};
  
export const PUT_PSS: string = 'PSSActions.REQUEST_PUT_PSS';
export const PUT_PSS_FINISHED: string = 'PSSActions.REQUEST_PUT_PSS_FINISHED';
  export const reqPutPSS = (data: any): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      PUT_PSS,
      PSSEffects.reqPutPSS,
      data,
    );
  };
};
  
export const PUT_PROJECT_ID: string = 'PSSActions.REQUEST_PUT_PROJECT_ID';
export const PUT_PROJECT_ID_FINISHED: string = 'PSSActions.REQUEST_PUT_PROJECT_ID_FINISHED';
  export const reqPutProjectIdByPmo = (data: any): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      PUT_PROJECT_ID,
      PSSEffects.reqPutProjectIdByPmo,
      data,
    );
  };
};
  
export const GET_PSS_LATEST: string = 'PSSActions.REQUEST_GET_PSS_LATEST';
export const GET_PSS_LATEST_FINISHED: string = 'PSSActions.REQUEST_GET_PSS_LATEST_FINISHED';
  export const reqGetPSSLatest = (funnelGenId: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PSSFirstLastModel>(
      dispatch,
      GET_PSS_LATEST,
      PSSEffects.reqGetPSSLatest,
      funnelGenId,
    );
  };
};

export const PSS_HEADER: string = 'PSSActions.REQUEST_PSS_HEADER';
export const PSS_HEADER_FINISHED: string = 'PSSActions.REQUEST_PSS_HEADER_FINISHED';
export const reqPSSHeaderPrint = (funnelGenId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PSSModels>(
      dispatch,
      PSS_HEADER,
      PSSEffects.reqPSSHeaderPrint,
      funnelGenId,
    );
  };
};

export const HISTORY_PSS: string = 'PSSActions.REQUEST_HISTORY_PSS';
export const HISTORY_PSS_FINISHED: string = 'PSSActions.REQUEST_HISTORY_PSS_FINISHED';
export const reqHistoryPss = (page: number, pageSize:number, projectId:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<HistoryPSSModels>(
      dispatch,
      HISTORY_PSS,
      PSSEffects.reqHistoryPss,
      page,
      pageSize,
      projectId,
    );
  };
};

export const CLEAR_RESULT: string = 'PSSActions.CLEAR_RESULT';
export const removeResult = (): IAction<ResultActions> => {
  return ActionUtility.createAction(CLEAR_RESULT);
};