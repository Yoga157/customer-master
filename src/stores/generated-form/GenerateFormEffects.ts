import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import FunnelSATableModel from './models/FunnelSATableModel';
import FormTypeModel from './models/FormTypeModel';
import GeneratedTableModel from './models/GeneratedTableModel';
import GenerateFormModel from './models/GeneratedFormModel';
import FunnelSARowModel from './models/FunnelSARowModel';
import ResultActions from 'models/ResultActions';
import FunnelSASearchModel from './models/FunnelSASearchModel';
import GeneratedFormEnvelope from './models/GeneratedFormEnvelope';
import axios from 'axios';

export const requestFunnelSA = async (page: number, pageSize: number, formType: number): Promise<FunnelSATableModel | HttpErrorResponseModel> => {
  const controllerName = 'GenerateForm/GetListFunnelSA?' + 'page=' + page + '&pageSize=' + pageSize + '&formType=' + formType;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelSATableModel>(FunnelSATableModel, endpoint);
};

export const requestSearchFunnelSA = async (searchObject: FunnelSASearchModel): Promise<FunnelSATableModel | HttpErrorResponseModel> => {
  const controllerName = 'GenerateForm/SearchFunnelSA';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<FunnelSATableModel>(FunnelSATableModel, endpoint, searchObject);
};

export const requestGeneratedForm = async (
  page: number,
  pageSize: number,
  UserLoginID: number
): Promise<GeneratedTableModel | HttpErrorResponseModel> => {
  const controllerName = 'GenerateForm/GetListAll?' + 'page=' + page + '&pageSize=' + pageSize + '&UserLoginID=' + UserLoginID;

  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<GeneratedTableModel>(GeneratedTableModel, endpoint);
};

export const requestSearchGeneratedForm = async (
  page: number,
  pageSize: number,
  UserLoginID: number,
  text: string
): Promise<GeneratedTableModel | HttpErrorResponseModel> => {
  const controllerName = 'GenerateForm/Search?' + 'page=' + page + '&pageSize=' + pageSize + '&UserLoginID=' + UserLoginID + '&text=' + text;

  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<GeneratedTableModel>(GeneratedTableModel, endpoint);
};

export const requestFormType = async (): Promise<FormTypeModel | HttpErrorResponseModel> => {
  const controllerName = 'Udc/DropdownFormType';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FormTypeModel>(FormTypeModel, endpoint);
};

export const requestPostGeneratedForm = async (data: GeneratedFormEnvelope): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'GenerateForm';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestPutGeneratedForm = async (data: GeneratedFormEnvelope): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'GenerateForm/Update';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestDeleteGeneratedForm = async (formID: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `GenerateForm?FormID=${formID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

// export const requestProjectFunnelSA = async (projectName: string): Promise<any[] | HttpErrorResponseModel> => {
//   let controllerName = `GenerateForm/GetProjectNameSearch?projectName=${projectName}`;
//   const endpoint: string = environment.api.generic.replace(':controller', controllerName);
//   let res: any = axios.get(endpoint)
//   return res.data

//   // return EffectUtility.getToModel<any[]>(ResultActions, endpoint);
// };

export const insertFunnelSAObject = async (data: FunnelSARowModel): Promise<FunnelSARowModel | HttpErrorResponseModel> => {
  const FunnelSAObject = new FunnelSARowModel(data);

  return FunnelSAObject;
};

export const clearFunnelSAObject = async (): Promise<FunnelSARowModel | HttpErrorResponseModel> => {
  const FunnelSAObject = new FunnelSARowModel({});

  return FunnelSAObject;
};

export const clearResult = async (): Promise<any> => {
  const clear = new ResultActions({});
  return clear;
};
