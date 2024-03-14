import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import BoqModel from './models/BoqModel';
import BoqEnvelope from './models/BoqEnvelope';
import ResultActions from 'models/ResultActions';
import BoqUpload from './models/BoqUpload';

export const requestBoqByFunnelGenID = async (funnelGenId: number, page: number, pageSize: number): Promise<BoqEnvelope | HttpErrorResponseModel> => {
  const controllerName = `BOQ/${funnelGenId}?page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<BoqEnvelope>(BoqEnvelope, endpoint);
};

export const postBoq = async (data: BoqModel): Promise<BoqModel | HttpErrorResponseModel> => {
  const controllerName = 'BOQ';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<BoqModel>(BoqModel, endpoint, data);
};

export const putBoq = async (data: BoqModel): Promise<BoqModel | HttpErrorResponseModel> => {
  const controllerName = 'BOQ';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<BoqModel>(BoqModel, endpoint, data);
};

export const delBoq = async (boqGenID: number): Promise<BoqModel | HttpErrorResponseModel> => {
  const controllerName = `BOQ/${boqGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<BoqModel>(BoqModel, endpoint);
};

export const delAllBoq = async (funnelGenId: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `BOQ/DeleteAll?FunnelGenID=${funnelGenId}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const requestBoqByBoqGenID = async (boqGenID: number): Promise<BoqModel | HttpErrorResponseModel> => {
  const controllerName = `BOQ/boqGenID=${boqGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<BoqModel>(BoqModel, endpoint);
};

export const postFileBoq = async (data: BoqUpload): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'BOQ/InsertUpload';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};
