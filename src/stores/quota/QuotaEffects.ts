import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import environment from 'environment';

import QuotaBrandHardwareModelMaster from './models/QuotaBrandHardwareModelMaster';
import QuotaBrandSoftwareModelMaster from './models/QuotaBrandSoftwareModelMaster';
import ReportSummarySharedQuota from './models/ReportSummarySharedQuota.model';
import QuotaServiceModelMaster from './models/QuotaServiceModelMaster';
import QuotaModelByEntryKey from './models/QuotaModelByEntryKey';
import PostQuotaMasterModel from './models/PostQuotaMasterModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import EmplyeeHirarcyModel from './models/EmplyeeHirarcyModel';
import SummaryQuotaModel from './models/SummaryQuotaModel';
import QuotaMasterModel from './models/QuotaMasterModel';
import ResultActions from 'models/ResultActions';

export const requestGetBrandHardwareMaster = async (salesId: number, tahun: number): Promise<QuotaBrandHardwareModelMaster | HttpErrorResponseModel> => {
  const controllerName = `QuotaMaster/BrandHardware?salesId=${salesId}&tahun=${tahun}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<QuotaBrandHardwareModelMaster>(QuotaBrandHardwareModelMaster, endpoint);
};

export const requestGetBrandSoftwareMaster = async (salesId: number, tahun: number): Promise<QuotaBrandSoftwareModelMaster | HttpErrorResponseModel> => {
  const controllerName = `QuotaMaster/BrandSoftware?salesId=${salesId}&tahun=${tahun}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<QuotaBrandSoftwareModelMaster>(QuotaBrandSoftwareModelMaster, endpoint);
};  

export const requestGetQuotaServiceMaster = async (salesId: number, tahun: number): Promise<QuotaServiceModelMaster | HttpErrorResponseModel> => {
  const controllerName = `QuotaMaster/Service?salesId=${salesId}&tahun=${tahun}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<QuotaServiceModelMaster>(QuotaServiceModelMaster, endpoint);
};

export const requestGetEmplyeeHirarcy = async (operationtype: string, accountname: string): Promise<EmplyeeHirarcyModel | HttpErrorResponseModel> => {
  const controllerName = `EmployeeHierarcy/Direct?operationtype=${operationtype}&accountname=${accountname}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<EmplyeeHirarcyModel>(EmplyeeHirarcyModel, endpoint);
};

export const getQuotaMasterMyOwnQuota = async (salesID: number, tahun: string): Promise<QuotaMasterModel | HttpErrorResponseModel> => {
  const controllerName = `QuotaMaster/MyOwnQuota?salesID=${salesID}&tahun=${tahun}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<QuotaMasterModel>(QuotaMasterModel, endpoint);
};

export const getQuotaMasterMyTeamQuota = async (accountName: string, tahun: string, column:string, sorting:string): Promise<QuotaMasterModel[] | HttpErrorResponseModel> => {
  const controllerName = `QuotaMaster/MyTeamQuota?accountName=${accountName}&tahun=${tahun}&column=${column}&sorting=${sorting}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<QuotaMasterModel[]>(QuotaMasterModel, endpoint);
};

export const getQuotaMasterMyTeamQuotaSearch = async (accountName: string, column:string, sorting:string, search:string): Promise<QuotaMasterModel[] | HttpErrorResponseModel> => {
  const controllerName = `QuotaMaster/MyTeamQuotaSearch?accountName=${accountName}&column=${column}&sorting=${sorting}&search=${search}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<QuotaMasterModel[]>(QuotaMasterModel, endpoint);
};


export const getReportSummarySharedQuota = async (accountName: string, tahun: number): Promise<ReportSummarySharedQuota | HttpErrorResponseModel> => {
  const controllerName = `QuotaMaster/ReportSummarySharedQuota?accountName=${accountName}&tahun=${tahun}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ReportSummarySharedQuota>(ReportSummarySharedQuota, endpoint);
};

export const getSummaryQuota = async (salesID: number, tahun: number): Promise<SummaryQuotaModel | HttpErrorResponseModel> => {
  const controllerName = `QuotaMaster/SummaryQuota?salesID=${salesID}&tahun=${tahun}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<SummaryQuotaModel>(SummaryQuotaModel, endpoint);
};

export const getQuotaByEntryKey = async (type:string): Promise<QuotaModelByEntryKey[] | HttpErrorResponseModel> => {
  const controllerName = `Udc/GetByEntryKey/${type}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<QuotaModelByEntryKey[]>(QuotaModelByEntryKey, endpoint);
};

export const postQuotaMaster = async (data:PostQuotaMasterModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `QuotaMaster`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint,data);
};

export const postQuotaMyTeam = async (data:PostQuotaMasterModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `QuotaMaster/SaveQuotaTeam`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint,data);
};

export const removeResult= async():Promise<ResultActions | HttpErrorResponseModel > => {
 const clearResult = new ResultActions({})
  return clearResult
};