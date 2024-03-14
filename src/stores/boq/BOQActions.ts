import * as BOQEffects from './BOQEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import BoqModel from './models/BoqModel';
import BoqEnvelope from './models/BoqEnvelope';
import ResultActions from 'models/ResultActions';

type ActionUnion = undefined | HttpErrorResponseModel | BoqModel | BoqEnvelope | ResultActions;

export const REQUEST_BOQS: string = 'BOQActions.REQUEST_BOQS';
export const REQUEST_BOQS_FINISHED: string = 'BOQActions.REQUEST_BOQS_FINISHED';

export const requestBoqByFunnelGenID = (funnelGenId: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BoqEnvelope>(dispatch, REQUEST_BOQS, BOQEffects.requestBoqByFunnelGenID, funnelGenId, page, pageSize);
  };
};

export const REQUEST_BOQ: string = 'BOQActions.REQUEST_BOQ';
export const REQUEST_BOQ_FINISHED: string = 'BOQActions.REQUEST_BOQ_FINISHED';

export const requestBoqByBoqGenID = (boqGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<BoqModel>(dispatch, REQUEST_BOQ, BOQEffects.requestBoqByBoqGenID, boqGenID);
  };
};

export const POST_BOQ: string = 'BOQActions.REQUEST_POST_BOQ';
export const POST_BOQ_FINISHED = 'BOQActions.REQUEST_POST_BOQ_FINISHED';
export const postBoq = (data: BoqModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BoqModel>(dispatch, POST_BOQ, BOQEffects.postBoq, data);
  };
};

export const POST_UPLOAD_BOQ: string = 'BOQActions.REQUEST_POST_UPLOAD_BOQ';
export const POST_UPLOAD_BOQ_FINISHED = 'BOQActions.REQUEST_POST_UPLOAD_BOQ_FINISHED';
export const postFileBoq = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, POST_UPLOAD_BOQ, BOQEffects.postFileBoq, data);
  };
};

export const PUT_BOQ: string = 'BOQActions.REQUEST_PUT_BOQ';
export const PUT_BOQ_FINISHED = 'BOQActions.REQUEST_PUT_BOQ_FINISHED';
export const putBoq = (data: BoqModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BoqModel>(dispatch, PUT_BOQ, BOQEffects.putBoq, data);
  };
};

export const DEL_BOQ: string = 'BOQActions.REQUEST_DEL_BOQ';
export const DEL_BOQ_FINISHED = 'BOQActions.REQUEST_DEL_BOQ_FINISHED';
export const delBoq = (boqGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<BoqModel>(dispatch, DEL_BOQ, BOQEffects.delBoq, boqGenID);
  };
};

export const REQUEST_DEL_ALL_BOQ: string = 'BOQActions.REQUEST_DEL_ALL_BOQ';
export const REQUEST_DEL_ALL_BOQ_FINISHED = 'BOQActions.REQUEST_DEL_ALL_BOQ_FINISHED';
export const delAllBoq = (funnelGenId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_DEL_ALL_BOQ, BOQEffects.delAllBoq, funnelGenId);
  };
};

export const REMOVE_BOQ_RESULT: string = 'BOQActions.REMOVE_BOQ_RESULT';
export const removeResult = (): any => {
  return ActionUtility.createAction(REMOVE_BOQ_RESULT);
};
