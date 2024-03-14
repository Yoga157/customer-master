import * as POCRequirementEffects from './POCRequirementEffects';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from 'utilities/ActionUtility';
import { ReduxDispatch } from 'models/ReduxProps';
import IStore from 'models/IStore';
import POCRequirementEnvelope from './models/POCRequirementEnvelope';
import POCRequirementDashboard from './models/POCRequirementDashboard';

type ActionUnion = undefined | HttpErrorResponseModel | POCRequirementEnvelope | POCRequirementDashboard;

export const REQUEST_POC_REQUIREMENT: string = 'POCRequirementActions.REQUEST_POC_REQUIREMENT';
export const REQUEST_POC_REQUIREMENT_FINISHED: string = 'POCRequirementActions.REQUEST_POC_REQUIREMENT_FINISHED';

export const requestPOCReqByPOCGenHID = (pocGenHID: number, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<POCRequirementEnvelope>(
      dispatch,
      REQUEST_POC_REQUIREMENT,
      POCRequirementEffects.requestPOCReqByPOCGenHID,
      pocGenHID,
      page,
      pageSize
    );
  };
};

export const REQUEST_POC_REQUIREMENT_BY_ID: string = 'POCRequirementActions.REQUEST_POC_REQUIREMENT_BY_ID';
export const REQUEST_POC_REQUIREMENT_BY_ID_FINISHED: string = 'POCRequirementActions.REQUEST_POC_REQUIREMENT_BY_ID_FINISHED';

export const requestPOCReqByPOCGenReqID = (pocReqGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<POCRequirementDashboard>(
      dispatch,
      REQUEST_POC_REQUIREMENT_BY_ID,
      POCRequirementEffects.requestPOCReqByPOCGenReqID,
      pocReqGenID
    );
  };
};

export const POST_POC_REQUIREMENT: string = 'POCRequirementActions.REQUEST_POST_POC_REQUIREMENT';
export const POST_POC_REQUIREMENT_FINISHED = 'POCRequirementActions.REQUEST_POST_POC_REQUIREMENT_FINISHED';
export const postPOCRequirement = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<POCRequirementDashboard>(dispatch, POST_POC_REQUIREMENT, POCRequirementEffects.postPOCRequirement, data);
  };
};

export const DEL_POC_REQUIREMENT: string = 'POCRequirementActions.REQUEST_DEL_POC_REQUIREMENT';
export const DEL_POC_REQUIREMENT_FINISHED = 'POCRequirementActions.REQUEST_DEL_POC_REQUIREMENT_FINISHED';
export const delPOCRequirement = (pocGenHID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<POCRequirementDashboard>(dispatch, DEL_POC_REQUIREMENT, POCRequirementEffects.delPOCRequirement, pocGenHID);
  };
};

export const PUT_POC_REQUIREMENT_COMPELETED: string = 'POCRequirementActions.REQUEST_PUT_POC_REQUIREMENT_COMPELETED';
export const PUT_POC_REQUIREMENT_COMPELETED_FINISHED = 'POCRequirementActions.REQUEST_PUT_POC_REQUIREMENT_COMPELETED_FINISHED';
export const putPOCRequirementCompleted = (pocReqGenID: number, userLogin: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<POCRequirementDashboard>(
      dispatch,
      PUT_POC_REQUIREMENT_COMPELETED,
      POCRequirementEffects.putPOCRequirementCompleted,
      pocReqGenID,
      userLogin
    );
  };
};
