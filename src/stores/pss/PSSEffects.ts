import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import * as EffectUtility from '../../utilities/EffectUtility';
import PSSFirstLastModel from "./models/PSSFirstLastModel";
import HistoryPSSModels from "./models/HistoryPSSModels";
import PSSListModel from "./models/PSSListModel";
import ResultActions from "models/ResultActions";
import PSSModels from "./models/PSSModels";
import environment from 'environment';



export const getListPSS = async (page: number, funnelGenId: number): Promise<PSSListModel | HttpErrorResponseModel> => {
  const controllerName = `PMOPss/GetListPmoPssFunnel?page=${page}&funnelGenId=${funnelGenId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PSSListModel>(PSSListModel, endpoint);
};


export const reqPostPSS = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `PMOPss`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};

export const reqPutPSS = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `PMOPss`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putUpload<ResultActions>(ResultActions, endpoint, data);
};

export const reqPutProjectIdByPmo = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `PMOPss/UpdateProjectIdByPmo`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const reqGetPSSLatest = async (funnelGenId: number): Promise<PSSFirstLastModel | HttpErrorResponseModel> => {
  const controllerName = `PMOPss/GetLatestPmoPss?funnelGenId=${funnelGenId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PSSFirstLastModel>(PSSFirstLastModel, endpoint);
};

export const reqPSSHeaderPrint = async (funnelGenId: number): Promise<PSSModels | HttpErrorResponseModel> => {
  const controllerName = `PMOPss/GetHeader?funnelGenId=${funnelGenId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<PSSModels>(PSSModels, endpoint);
};

export const reqHistoryPss = async (page: number, pageSize:number, projectId:number ): Promise<HistoryPSSModels | HttpErrorResponseModel> => {
  const controllerName = `PMOPss/GetListHistoryPmoPss?page=${page}&pageSize=${pageSize}&projectId=${projectId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<HistoryPSSModels>(HistoryPSSModels, endpoint);
};