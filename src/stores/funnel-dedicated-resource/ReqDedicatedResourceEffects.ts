import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import ReqDedicatedResourceEnvelope from './models/ReqDedicatedResourceEnvelope';
import ReqDedicatedResourceModel from './models/ReqDedicatedResourceModel';

export const requestDedicatedResourceByFunnelGenID = async (
  funnelGenId: number,
  page: number,
  pageSize: number
): Promise<ReqDedicatedResourceEnvelope | HttpErrorResponseModel> => {
  const controllerName = `RequestDedicatedResource/${funnelGenId}?page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<ReqDedicatedResourceEnvelope>(ReqDedicatedResourceEnvelope, endpoint);
};

export const requestDedicatedResourceByReqGenID = async (reqGenID: number): Promise<ReqDedicatedResourceModel | HttpErrorResponseModel> => {
  const controllerName = `RequestDedicatedResource/reqResourceGenID=${reqGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<ReqDedicatedResourceModel>(ReqDedicatedResourceModel, endpoint);
};

export const postRequestDedicatedResource = async (data: ReqDedicatedResourceModel): Promise<ReqDedicatedResourceModel | HttpErrorResponseModel> => {
  const controllerName = 'RequestDedicatedResource';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ReqDedicatedResourceModel>(ReqDedicatedResourceModel, endpoint, data);
};

export const putRequestDedicatedResource = async (data: ReqDedicatedResourceModel): Promise<ReqDedicatedResourceModel | HttpErrorResponseModel> => {
  const controllerName = 'RequestDedicatedResource';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ReqDedicatedResourceModel>(ReqDedicatedResourceModel, endpoint, data);
};
