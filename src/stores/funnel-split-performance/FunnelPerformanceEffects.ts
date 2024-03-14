import environment from 'environment';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as HttpUtility from 'utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from 'utilities/EffectUtility';
import FunnelStatusModel from './models/FunnelSplitModel';
import FunnelStatusUdcModel from './models/FunnelStatusUdcModel';
import FunnelSplitEnvelope from './models/FunnelSplitEnvelope';
import FunnelSplitModel from './models/FunnelSplitModel';
import ResultActions from 'models/ResultActions';
import SplitTypeModel from './models/SplitTypeModel';
import FunnelSplitModelUpdate from './models/FunnelSplitUpdateModel';

export const requestFunnelSplit = async (
  funnelGenID: number,
  page: number,
  pageSize: number
): Promise<FunnelSplitEnvelope | HttpErrorResponseModel> => {
  const controllerName = `FunnelSplitPerformance/GetListDashboard?FunnelGenID=${funnelGenID}&page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<FunnelSplitEnvelope>(FunnelSplitEnvelope, endpoint);
};

export const requestInsertFunnelSplit = async (data: FunnelSplitModelUpdate): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `FunnelSplitPerformance/Insert`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestDeleteFunnelSplit = async (FunnelSplitID: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `FunnelSplitPerformance/Delete?FunnelSplitID=${FunnelSplitID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const requestUpdateFunnelSplit = async (data: FunnelSplitModelUpdate): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `FunnelSplitPerformance/Update`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestSplitType = async (): Promise<SplitTypeModel | HttpErrorResponseModel> => {
  const controllerName = `SplitType`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SplitTypeModel>(SplitTypeModel, endpoint);
};
/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.generic;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
