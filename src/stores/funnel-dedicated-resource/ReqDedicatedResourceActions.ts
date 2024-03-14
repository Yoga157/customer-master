import * as ReqDedicatedResourceEffects from './ReqDedicatedResourceEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ReqDedicatedResourceEnvelope from './models/ReqDedicatedResourceEnvelope';
import ReqDedicatedResourceModel from './models/ReqDedicatedResourceModel';

type ActionUnion = undefined | HttpErrorResponseModel | ReqDedicatedResourceEnvelope | ReqDedicatedResourceModel;

export const REQUEST_DEDICATED_RESOURCE: string = 'ReqDedicatedResourceActions.REQUEST_DEDICATED_RESOURCE';
export const REQUEST_DEDICATED_RESOURCE_FINISHED: string = 'ReqDedicatedResourceActions.REQUEST_DEDICATED_RESOURCE_FINISHED';

export const requestDedicatedResourceByFunnelGenID = (funnelGenId: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ReqDedicatedResourceEnvelope>(
      dispatch,
      REQUEST_DEDICATED_RESOURCE,
      ReqDedicatedResourceEffects.requestDedicatedResourceByFunnelGenID,
      funnelGenId,
      page,
      pageSize
    );
  };
};

export const REQUEST_DEDICATED_RESOURCE_REQ_GEN_ID: string = 'ReqDedicatedResourceActions.REQUEST_DEDICATED_RESOURCE_REQ_GEN_ID';
export const REQUEST_DEDICATED_RESOURCE_REQ_GEN_ID_FINISHED: string = 'ReqDedicatedResourceActions.REQUEST_DEDICATED_RESOURCE_REQ_GEN_ID_FINISHED';

export const requestDedicatedResourceByReqGenID = (reqGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ReqDedicatedResourceModel>(
      dispatch,
      REQUEST_DEDICATED_RESOURCE_REQ_GEN_ID,
      ReqDedicatedResourceEffects.requestDedicatedResourceByReqGenID,
      reqGenID
    );
  };
};

export const POST_REQ_DEDICATED_RESOURCE: string = 'ReqDedicatedResourceActions.POST_REQ_DEDICATED_RESOURCE';
export const POST_REQ_DEDICATED_RESOURCE_FINISHED = 'ReqDedicatedResourceActions.POST_REQ_DEDICATED_RESOURCE_FINISHED';
export const postRequestDedicatedResource = (data: ReqDedicatedResourceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ReqDedicatedResourceModel>(
      dispatch,
      POST_REQ_DEDICATED_RESOURCE,
      ReqDedicatedResourceEffects.postRequestDedicatedResource,
      data
    );
  };
};

export const PUT_REQ_DEDICATED_RESOURCE: string = 'ReqDedicatedResourceActions.PUT_REQ_DEDICATED_RESOURCE';
export const PUT_REQ_DEDICATED_RESOURCE_FINISHED = 'ReqDedicatedResourceActions.PUT_REQ_DEDICATED_RESOURCE_FINISHED';
export const putRequestDedicatedResource = (data: ReqDedicatedResourceModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ReqDedicatedResourceModel>(
      dispatch,
      PUT_REQ_DEDICATED_RESOURCE,
      ReqDedicatedResourceEffects.putRequestDedicatedResource,
      data
    );
  };
};
