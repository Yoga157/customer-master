import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import FunnelSupportTeamEnvelope from './models/FunnelSupportTeamEnvelope';
import FunnelSupportTeamModel from './models/FunnelSupportTeamModel';

export const requestSupportTeamsByFunnelGenID = async (
  funnelGenId: number,
  page: number,
  pageSize: number
): Promise<FunnelSupportTeamEnvelope | HttpErrorResponseModel> => {
  const controllerName = `FunnelSupportTeam/${funnelGenId}?page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelSupportTeamEnvelope>(FunnelSupportTeamEnvelope, endpoint);
};

export const postSupportTeams = async (data: FunnelSupportTeamModel): Promise<FunnelSupportTeamModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSupportTeam';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<FunnelSupportTeamModel>(FunnelSupportTeamModel, endpoint, data);
};

export const putSupportTeams = async (data: FunnelSupportTeamModel): Promise<FunnelSupportTeamModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSupportTeam';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<FunnelSupportTeamModel>(FunnelSupportTeamModel, endpoint, data);
};

export const delSupportTeams = async (funnelSupportID: number): Promise<FunnelSupportTeamModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelSupportTeam/${funnelSupportID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<FunnelSupportTeamModel>(FunnelSupportTeamModel, endpoint);
};

export const requestSupportTeamsBySupportID = async (supportID: number): Promise<FunnelSupportTeamModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelSupportTeam/supportID=${supportID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelSupportTeamModel>(FunnelSupportTeamModel, endpoint);
};

/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.funnel;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
