import environment from 'environment';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';

import * as EffectUtility from 'utilities/EffectUtility';
import POCMapper from './models/POCMapper';
import POCEnvelope from './models/POCEnvelope';
import POCRequestModel from './models/POCRequestModel';

export const postPOC = async (data: POCMapper): Promise<POCMapper | HttpErrorResponseModel> => {
  const controllerName = 'POC';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postUpload<POCMapper>(POCMapper, endpoint, data);
};

export const delPOC = async (pocGenHID: number): Promise<POCRequestModel | HttpErrorResponseModel> => {
  const controllerName = `POC/${pocGenHID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<POCRequestModel>(POCRequestModel, endpoint);
};

export const putPOC = async (data: POCRequestModel): Promise<POCRequestModel | HttpErrorResponseModel> => {
  const controllerName = 'POC';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<POCRequestModel>(POCRequestModel, endpoint, data);
};

export const putPOCActualDate = async (data: POCRequestModel): Promise<POCRequestModel | HttpErrorResponseModel> => {
  const controllerName = 'POC/UpdateActualPOCDate';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<POCRequestModel>(POCRequestModel, endpoint, data);
};

export const requestPOCByFunnelGenID = async (funnelGenId: number, page: number, pageSize: number): Promise<POCEnvelope | HttpErrorResponseModel> => {
  const controllerName = `POC/${funnelGenId}?page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<POCEnvelope>(POCEnvelope, endpoint);
};

export const requestPOCByPOCGenHID = async (pocGenHID: number): Promise<POCRequestModel | HttpErrorResponseModel> => {
  const controllerName = `POC/pocGenHID=${pocGenHID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<POCRequestModel>(POCRequestModel, endpoint);
};
