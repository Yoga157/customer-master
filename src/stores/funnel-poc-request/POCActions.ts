import * as POCEffects from './POCEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import POCMapper from './models/POCMapper';
import POCEnvelope from './models/POCEnvelope';
import POCRequestModel from './models/POCRequestModel';

type ActionUnion = undefined | HttpErrorResponseModel | POCMapper | POCEnvelope | POCRequestModel;

export const REQUEST_POCS: string = 'POCActions.REQUEST_POCS';
export const REQUEST_POCS_FINISHED: string = 'POCActions.REQUEST_POCS_FINISHED';

export const requestPOCByFunnelGenID = (funnelGenId: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<POCEnvelope>(dispatch, REQUEST_POCS, POCEffects.requestPOCByFunnelGenID, funnelGenId, page, pageSize);
  };
};

export const POST_POC: string = 'POCActions.REQUEST_POST_POC';
export const POST_POC_FINISHED = 'POCActions.REQUEST_POST_POC_FINISHED';
export const postPOC = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<POCMapper>(dispatch, POST_POC, POCEffects.postPOC, data);
  };
};

export const DEL_POC: string = 'POCActions.REQUEST_DEL_POC';
export const DEL_POC_FINISHED = 'POCActions.REQUEST_DEL_POC_FINISHED';
export const delPOC = (pocGenHID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<POCRequestModel>(dispatch, DEL_POC, POCEffects.delPOC, pocGenHID);
  };
};

export const PUT_POC: string = 'POCActions.REQUEST_PUT_POC';
export const PUT_POC_FINISHED = 'POCActions.REQUEST_PUT_POC_FINISHED';
export const putPOC = (data: POCRequestModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<POCRequestModel>(dispatch, PUT_POC, POCEffects.putPOC, data);
  };
};

export const PUT_POC_ACTUAL_DATE: string = 'BOQActions.REQUEST_PUT_POC_ACTUAL_DATE';
export const PUT_POC_ACTUAL_DATE_FINISHED = 'BOQActions.REQUEST_PUT_POC_ACTUAL_DATE_FINISHED';
export const putPOCActualDate = (data: POCRequestModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<POCRequestModel>(dispatch, PUT_POC_ACTUAL_DATE, POCEffects.putPOCActualDate, data);
  };
};

export const REQUEST_POC: string = 'POCActions.REQUEST_POC';
export const REQUEST_POC_FINISHED: string = 'POCActions.REQUEST_POC_FINISHED';

export const requestPOCByPOCGenHID = (pocGenHID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<POCRequestModel>(dispatch, REQUEST_POC, POCEffects.requestPOCByPOCGenHID, pocGenHID);
  };
};
