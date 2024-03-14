import environment from 'environment';
import * as EffectUtility from 'utilities/EffectUtility';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import KpiDataDashboardEnvelope from './models/KpiDataDashboardEnvelope';
import KpiDataDashboardDeptEnvelope from './models/KpiDataDashboardDeptEnvelope';
import KpiDataDetailPointEnvelope from './models/KpiDataDetailPointEnvelope';
import KpiDataCreatorSummaryEnvelope from './models/KpiDataCreatorSummaryEnvelope';
import KpiDataRemarkEnvelope from './models/KpiDataRemarkEnvelope';
import KpiDataDropdownModel from './models/KpiDataDropdownModel';
import KpiDataConditionModel from './models/KpiDataConditionModel';
import KpiDataDashboardModel from '../kpi-data/models/KpiDataDashboardModel';
import PeriodeQuartalModel from '../kpi-data/models/PeriodeQuartalModel';
import KpiDataDetailPointModel from '../kpi-data/models/KpiDataDetailPointModel';
import KpiDataFilter from '../kpi-data/models/KpiDataFilter';
import ResultActions from 'models/ResultActions';

export const requestKpiDatas = async (
  tahun: number,
  userlogin: string,
  activePage: number,
  pageSize: number
): Promise<KpiDataDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetSummaryKPI?tahun=${tahun}&userlogin=${userlogin}&page=${activePage}&pageSize=${pageSize}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataDashboardEnvelope>(KpiDataDashboardEnvelope, endpoint);
};

export const reqSearchKpiData = async (
  page: number, pageSize: number, userlogin: string, text
): Promise<KpiDataDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/SearchKPI?page=${page}&pageSize=${pageSize}&userlogin=${userlogin}&text=${text}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataDashboardEnvelope>(KpiDataDashboardEnvelope, endpoint);
};

export const requestKpiDashboardDatas = async (
  tahun: number,
  userlogin: string,
  activePage: number,
  pageSize: number
): Promise<KpiDataDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetSummaryKPIDashboard?tahun=${tahun}&userlogin=${userlogin}&page=${activePage}&pageSize=${pageSize}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataDashboardEnvelope>(KpiDataDashboardEnvelope, endpoint);
};

export const requestKpiDashboardSearch = async (
  text: string, userlogin: string, page: number, pageSize: number
): Promise<KpiDataDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetSummaryKPIDashboardSearch?text=${text}&userlogin=${userlogin}&page=${page}&pageSize=${pageSize}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataDashboardEnvelope>(KpiDataDashboardEnvelope, endpoint);
};

export const requestKpiDashboardDeptDatas = async (
  tahun: number,
  userlogin: string,
  activePage: number,
  pageSize: number
): Promise<KpiDataDashboardDeptEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetSummaryKPIDashboardDept?tahun=${tahun}&userlogin=${userlogin}&page=${activePage}&pageSize=${pageSize}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataDashboardDeptEnvelope>(KpiDataDashboardDeptEnvelope, endpoint);
};

export const requestKpiDashboardDeptSearch = async (
  text: string, userlogin: string, page: number, pageSize: number
): Promise<KpiDataDashboardDeptEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetSummaryKPIDashboardDeptSearch?text=${text}&userlogin=${userlogin}&page=${page}&pageSize=${pageSize}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataDashboardDeptEnvelope>(KpiDataDashboardDeptEnvelope, endpoint);
};

export const requestKpiDetailPoints = async (
  udcid: number,
  emplid: number,
  quarter: string,
  tahun: number,
  creator: string,
  activePage: number,
  pageSize: number,
  sorting: string,
  column: string
): Promise<KpiDataDetailPointEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetDetailPoint?udcid=${udcid}&emplid=${emplid}&quarter=${quarter}&tahun=${tahun}&creator=${creator}&page=${activePage}&pageSize=${pageSize}&column=${column}&sorting=${sorting}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataDetailPointEnvelope>(KpiDataDetailPointEnvelope, endpoint);
};

export const requestKpiCreatorSummarys = async (
  udcid: number,
  emplid: number,
  quarter: string,
  tahun: number,
  activePage: number,
  pageSize: number
): Promise<KpiDataCreatorSummaryEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetSummaryCreatorTable?udcid=${udcid}&emplid=${emplid}&quarter=${quarter}&tahun=${tahun}&page=${activePage}&pageSize=${pageSize}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataCreatorSummaryEnvelope>(KpiDataCreatorSummaryEnvelope, endpoint);
};

export const requestKpiRemarks = async (
  udcid: number,
  emplid: number,
  tahun: number,
  activePage: number,
  pageSize: number
): Promise<KpiDataRemarkEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetHistoryRemark?udcid=${udcid}&emplid=${emplid}&tahun=${tahun}&page=${activePage}&pageSize=${pageSize}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataRemarkEnvelope>(KpiDataRemarkEnvelope, endpoint);
};

export const requestKpiDetailRemarks = async (
  udcid: number,
  emplid: number,
  docNo: number,
  docType: string,
  activePage: number,
  pageSize: number
): Promise<KpiDataRemarkEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetHistoryPointRemark?udcid=${udcid}&emplid=${emplid}&docno=${docNo}&doctype=${docType}&page=${activePage}&pageSize=${pageSize}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataRemarkEnvelope>(KpiDataRemarkEnvelope, endpoint);
};

export const requestKpiCreatorRemarks = async (
  udcid: number,
  emplid: number,
  quarter: string,
  creator: string,
  activePage: number,
  pageSize: number
): Promise<KpiDataRemarkEnvelope | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetHistoryRemarkCreator?udcid=${udcid}&emplid=${emplid}&quarter=${quarter}&creator=${creator}&page=${activePage}&pageSize=${pageSize}`;

  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataRemarkEnvelope>(KpiDataRemarkEnvelope, endpoint);
};

export const requestDropdownPic = async (userLogin: string): Promise<KpiDataDropdownModel | HttpErrorResponseModel> => {
  const controllerName = 'Kpi/DropdownPicSearch?userLogin=' + userLogin;
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataDropdownModel>(KpiDataDropdownModel, endpoint);
};

export const requestDropdownYear = async (): Promise<KpiDataDropdownModel | HttpErrorResponseModel> => {
  const controllerName = 'Kpi/DropdownYear';
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataDropdownModel>(KpiDataDropdownModel, endpoint);
};

export const requestKpiCondition = async (udcid: number): Promise<KpiDataConditionModel | HttpErrorResponseModel> => {
  const controllerName = 'Kpi/KpiCondition?udcid=' + udcid;
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataConditionModel>(KpiDataConditionModel, endpoint);
};

export const requestKpiPdf = async (tahun: number, userlogin: string): Promise<KpiDataDashboardModel | HttpErrorResponseModel> => {
  const controllerName = `Kpi/GetDataPdf?tahun=${tahun}&userlogin=${userlogin}`;
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<KpiDataDashboardModel>(KpiDataDashboardModel, endpoint);
};

export const postUpdateRemark = async (data: KpiDataDashboardModel): Promise<KpiDataDashboardModel | HttpErrorResponseModel> => {
  const controllerName = 'Kpi/UpdateRemark';
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.postToModel<KpiDataDashboardModel>(KpiDataDashboardModel, endpoint, data);
};

export const postUpdateRemarkPoint = async (data: KpiDataDetailPointModel): Promise<KpiDataDetailPointModel | HttpErrorResponseModel> => {
  const controllerName = 'Kpi/UpdateRemarkPoint';
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.postToModel<KpiDataDetailPointModel>(KpiDataDetailPointModel, endpoint, data);
};

export const postUpdateRemarkCreator = async (data: KpiDataDetailPointModel): Promise<KpiDataDetailPointModel | HttpErrorResponseModel> => {
  const controllerName = 'Kpi/UpdateRemarkCreator';
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.postToModel<KpiDataDetailPointModel>(KpiDataDetailPointModel, endpoint, data);
};

export const postUpdatePointManual = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'Kpi/UpdatePointKPISummary';
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestPeriodeQuartal = async (quartal: string): Promise<PeriodeQuartalModel | HttpErrorResponseModel> => {
  const controllerName = 'Kpi/GetPeriodeQuartal?quartal=' + quartal;
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.getToModel<PeriodeQuartalModel>(PeriodeQuartalModel, endpoint);
};

export const postKPIFilter = async (data: KpiDataFilter): Promise<KpiDataDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'Kpi/FilterSearch';
  const endpoint: string = environment.api.kpi.replace(':controller', controllerName);
  return EffectUtility.postToModel<KpiDataDashboardEnvelope>(KpiDataDashboardEnvelope, endpoint, data);
};
