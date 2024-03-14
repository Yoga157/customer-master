import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import BankGaransisModel from './models/BankGaransisModel';
import BankGaransisAdminModel from './models/BankGaransisAdminModel';
import BankGaransiModel from './models/BankGaransiModel';
import BankGaransiApproveModel from './models/BankGaransiApproveModel';
import ExtendMapper from './models/ExtendMapper';
import BankGaransiEnvelope from './models/BankGaransiEnvelope';
import BankRecommended from './models/BankRecommended';
import FunnelSATableModel from './models/FunnelSATableModel';
import FunnelSALinkToModel from './models/FunnelSALinkToModel';
import FunnelSearchSAModel from './models/FunnelSearchSAModel';
import FunnelSearchPOModel from './models/FunnelSearchPOModel';
import FunnelPOTableModel from './models/FunnelPOTableModel';
import ExtendAttachmentModel from './models/ExtendAttachmentModel';
import DropdownFunnelSAModel from './models/DropdownFunnelSAModel';
import BankGaransiEditViewRequesterModel from './models/BankGaransiEditViewRequesterModel';
import BankGaransiEditViewAdminModel from './models/BankGaransiEditViewAdminModel';
import FilterSearchModel from './models/FilterSearchModel';
import AttachmentEnvelope from './models/AttachmentEnvelope';
import CompetitorProductModel from 'stores/competitor-product/models/CompetitorProductModel';
import MasterInsuranceModel from './models/MasterInsuranceModel';
import MasterInsuranceEnvelope from './models/MasterInsuranceEnvelope';
import MasterInsuranceUdcModel from './models/MasterInsuranceUdcModel';
import FunnelSARowModel from './models/FunnelSARowModel';
import FunnelPORowModel from './models/FunnelPORowModel';
import ResultActions from 'models/ResultActions';
import AttachmentMapper from 'stores/attachment/models/AttachmentMapper';
import BankGaransiDashboardEnvelope from './models/BankGaransiDashboardEnvelope';
import BankGaransiActivityModel from './models/BankGaransiActivityModel';
import AttachmentVersionEnvelope from './models/AttachmentVersionEnvelope';
import CheckExpireModel from './models/CheckExpireModel';
import MaxAmountModel from './models/MaxAmountModel';

export const postApproval = async (data: BankGaransiApproveModel): Promise<BankGaransiApproveModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/SubmitApproval';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<BankGaransiApproveModel>(BankGaransiApproveModel, endpoint, data);
};

export const postVoid = async (data: BankGaransiApproveModel): Promise<BankGaransiApproveModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/SubmitVoid';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<BankGaransiApproveModel>(BankGaransiApproveModel, endpoint, data);
};

export const postReturn = async (data: BankGaransiApproveModel): Promise<BankGaransiApproveModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/SubmitReturn';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<BankGaransiApproveModel>(BankGaransiApproveModel, endpoint, data);
};

//Service Extend Terbaru
export const postExtendReturn = async (data: ExtendMapper): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/SubmitReturn';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const postBankGaransiAdmin = async (data: BankGaransisAdminModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/Submit';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const postBankGaransi = async (data: BankGaransisModel): Promise<BankGaransisModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<BankGaransisModel>(BankGaransisModel, endpoint, data);
};

export const requestBankGaransis = async (
  id: number,
  activePage: number,
  pageSize: number
): Promise<BankGaransiEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/id=' + id + '?page=' + activePage + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<BankGaransiEnvelope>(BankGaransiEnvelope, endpoint);
};

export const requestBankGaransiAdmins = async (
  userLogin: string,
  activePage: number,
  pageSize: number,
  flagExpired: number,
  column: string,
  sorting: string
): Promise<BankGaransiDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'BankGuarantee/userLogin=' +
    userLogin +
    '?page=' +
    activePage +
    '&pageSize=' +
    pageSize +
    '&flagExpire=' +
    flagExpired +
    '&column=' +
    column +
    '&sorting=' +
    sorting;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<BankGaransiDashboardEnvelope>(BankGaransiDashboardEnvelope, endpoint);
};

export const requestBankGaransiAdminExs = async (
  userLogin: string,
  activePage: number,
  pageSize: number,
  flagExpired: number,
  column: string,
  sorting: string
): Promise<BankGaransiDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'BankGuarantee/userLogin=' +
    userLogin +
    '?page=' +
    activePage +
    '&pageSize=' +
    pageSize +
    '&flagExpire=' +
    flagExpired +
    '&column=' +
    column +
    '&sorting=' +
    sorting;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<BankGaransiDashboardEnvelope>(BankGaransiDashboardEnvelope, endpoint);
};

export const requestBankGaransiById = async (bankGuaranteeID: number): Promise<BankGaransiModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/bankGuaranteeID=' + bankGuaranteeID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<BankGaransiModel>(BankGaransiModel, endpoint);
};

export const requestBGViewEditAdmin = async (bankGuaranteeID: number): Promise<BankGaransiEditViewAdminModel | HttpErrorResponseModel> => {
  const controllerName = 'BGViewEditAdmin/' + bankGuaranteeID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<BankGaransiEditViewAdminModel>(BankGaransiEditViewAdminModel, endpoint);
};

export const requestBGViewEditRequester = async (bankGuaranteeID: number): Promise<BankGaransiEditViewRequesterModel | HttpErrorResponseModel> => {
  const controllerName = 'BGViewEditRequestor/' + bankGuaranteeID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<BankGaransiEditViewRequesterModel>(BankGaransiEditViewRequesterModel, endpoint);
};

//Search Funnel PO
export const requestSearchFunnelPO = async (searchObject: FunnelSearchPOModel): Promise<FunnelPOTableModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/SearchPO';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<FunnelPOTableModel>(FunnelPOTableModel, endpoint, searchObject);
};

//Funnel SA
export const requestFunnelSA = async (page: number, pageSize: number, userLogin: string): Promise<FunnelSATableModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSA/GetListFunnelSA?page=' + page + '&pageSize=' + pageSize + '&userLogin=' + userLogin;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelSATableModel>(FunnelSATableModel, endpoint);
};

//Search Funnel SA
export const requestSearchFunnelSA = async (searchObject: FunnelSearchSAModel): Promise<FunnelSATableModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSA/SearchFunnelSA';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<FunnelSATableModel>(FunnelSATableModel, endpoint, searchObject);
};

//Dropdown Funnel SA
export const requestDropdownSearchFunnelSA = async (userLogin: string, search: string): Promise<DropdownFunnelSAModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSA/Search?userLogin=' + userLogin + '&search=' + search;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<DropdownFunnelSAModel>(DropdownFunnelSAModel, endpoint);
};

//Update BG Admin
export const putBGAdmin = async (data: BankGaransiEditViewAdminModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'BGViewEditAdmin/SubmitAdmin';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

//Update BG Requester
export const putBGRequester = async (data: BankGaransiEditViewRequesterModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'BGViewEditRequestor/SubmitRequestor';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

//Edit Link To
export const requestLinkToFunnelSA = async (userLogin: string, linkTo: string): Promise<FunnelSALinkToModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSA?userLogin=' + userLogin + '&linkTo=' + linkTo;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<FunnelSALinkToModel>(FunnelSALinkToModel, endpoint);
};

//Get Division
export const requestDivision = async (): Promise<CompetitorProductModel[] | HttpErrorResponseModel> => {
  const controllerName = 'EmployeeHierarcy/DropdownDivision';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<CompetitorProductModel[]>(CompetitorProductModel, endpoint);
};

//Get Select Print
export const requestPrint = async (bankGuaranteeID: string): Promise<CompetitorProductModel[] | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/GetLetterBank?bankGUaranteeNo=' + bankGuaranteeID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CompetitorProductModel[]>(CompetitorProductModel, endpoint);
};

//Advanced Search
export const postFilterSearch = async (data: FilterSearchModel): Promise<BankGaransiDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/FilterSearch';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<BankGaransiDashboardEnvelope>(BankGaransiDashboardEnvelope, endpoint, data);
};

//request attachment
export const requestAttachmentServer = async (
  page: number,
  pageSize: number,
  bgID: string,
  UserLoginID: number,
  modul: number
): Promise<AttachmentEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'BankGuarantee/GetListAttachmentBG?page=' + page + '&pageSize=' + pageSize + '&bgID=' + bgID + '&UserLoginID=' + UserLoginID + '&modul=' + modul;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<AttachmentEnvelope>(AttachmentEnvelope, endpoint);
};

// Master Insurance
export const postMasterInsurance = async (data: MasterInsuranceModel): Promise<MasterInsuranceModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/InsertBankInsurance';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<MasterInsuranceModel>(MasterInsuranceModel, endpoint, data);
};

// Get Master Insurance
export const requestMasterInsurance = async (
  page: number,
  pageSize: number,
  text: string
): Promise<MasterInsuranceEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/GetListInsuranceDashboard?page=' + page + '&pageSize=' + pageSize + '&text=' + text;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<MasterInsuranceEnvelope>(MasterInsuranceEnvelope, endpoint);
};

//Get Company
export const requestCompany = async (ID: number): Promise<MasterInsuranceUdcModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/company';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<MasterInsuranceUdcModel[]>(MasterInsuranceUdcModel, endpoint);
};

//Get Company Applicant
export const requestCompanyApplicant = async (ID: number): Promise<MasterInsuranceUdcModel[] | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/CompanyApplicant';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<MasterInsuranceUdcModel[]>(MasterInsuranceUdcModel, endpoint);
};

//Get Bank CG
export const requestBankCG = async (): Promise<DropdownFunnelSAModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/DropdownBankCG';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<DropdownFunnelSAModel>(DropdownFunnelSAModel, endpoint);
};

// Get Master Insurance By ID
export const requestMasterInsuranceById = async (ID: number): Promise<MasterInsuranceUdcModel | HttpErrorResponseModel> => {
  const controllerName = 'Udc/' + ID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<MasterInsuranceUdcModel>(MasterInsuranceUdcModel, endpoint);
};

// Update Master Insurance
export const putMasterInsurace = async (data: MasterInsuranceModel): Promise<MasterInsuranceModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/UpdateInsuranceDashboard';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<MasterInsuranceModel>(MasterInsuranceModel, endpoint, data);
};

//Customer BG
export const requestCustomerBG = async (userLogin: string, flagExpire: number): Promise<DropdownFunnelSAModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/DropdownCustomerAdvanceSearch?userLogin=' + userLogin + '&flagExpire=' + flagExpire;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<DropdownFunnelSAModel>(DropdownFunnelSAModel, endpoint);
};

//Creator BG
export const requestCreatorBG = async (userLogin: string, flagExpire: number): Promise<DropdownFunnelSAModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/DropdownCreatorAdvanceSearch?userLogin=' + userLogin + '&flagExpire=' + flagExpire;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<DropdownFunnelSAModel>(DropdownFunnelSAModel, endpoint);
};

//History BG
export const requestHistoryBG = async (DocNumber: string): Promise<BankGaransiActivityModel | HttpErrorResponseModel> => {
  const controllerName = 'FunnelActivity/DocNumber?DocNumber=' + DocNumber;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<BankGaransiActivityModel>(BankGaransiActivityModel, endpoint);
};

//Get Extend Attachment
export const requestAttachmentExtend = async (bg: string): Promise<ExtendAttachmentModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/GetAttachmentExtend?BGNo=' + bg;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<ExtendAttachmentModel>(ExtendAttachmentModel, endpoint);
};

//Attachment Version
export const requestAttachmentVersions = async (
  docNo: string,
  fileName: string,
  modul: number,
  type: number,
  userLogin: number
): Promise<AttachmentVersionEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'FileFunnel/GetListHistoryByDocNumber?DocNumber=' +
    docNo +
    '&fileName=' +
    fileName +
    '&modul=' +
    modul +
    '&type=' +
    type +
    '&UserLoginID=' +
    userLogin;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<AttachmentVersionEnvelope>(AttachmentVersionEnvelope, endpoint);
};

//Check Expired
export const checkExpired = async (userLogin: string): Promise<CheckExpireModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/CheckBGExpire?userLogin=' + userLogin;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CheckExpireModel>(CheckExpireModel, endpoint);
};

//Max Amount
export const maxAmount = async (bondType: string, projectAmount: number): Promise<MaxAmountModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee/GetNilaiMaxBondType?BondType=' + bondType + '&ProjectAmount=' + projectAmount;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<MaxAmountModel>(MaxAmountModel, endpoint);
};

export const insertFunnelSAObject = async (data: FunnelSARowModel): Promise<FunnelSARowModel | HttpErrorResponseModel> => {
  const FunnelSAObject = new FunnelSARowModel(data);

  return FunnelSAObject;
};

export const insertFunnelPOObject = async (data: FunnelPORowModel): Promise<FunnelPORowModel | HttpErrorResponseModel> => {
  const FunnelPOObject = new FunnelPORowModel(data);

  return FunnelPOObject;
};

export const putBankGaransi = async (data: BankGaransiModel): Promise<BankGaransiModel | HttpErrorResponseModel> => {
  const controllerName = 'BankGuarantee';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<BankGaransiModel>(BankGaransiModel, endpoint, data);
};

export const requestBankRecomended = async (bandIssuer: string, requireOn: string): Promise<BankRecommended | HttpErrorResponseModel> => {
  const controllerName = `EstimatedBankGuarantee?bondIssuer=${bandIssuer}&requireOn=${requireOn}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<BankRecommended>(BankRecommended, endpoint);
};

export const requestBankEstimated = async (bandIssuerID: number): Promise<BankRecommended | HttpErrorResponseModel> => {
  const controllerName = `EstimatedBankGuarantee/id=${bandIssuerID}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<BankRecommended>(BankRecommended, endpoint);
};

export const requestMandatoryAttachment = async (bondType: string): Promise<any | HttpErrorResponseModel> => {
  const controllerName = `BankGuarantee/GetAttachmentMandatoryInfo?bondType=${bondType}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<any>(String, endpoint);
};

export const requestBGSearch = async (
  userLogin: string,
  textSearch: string,
  activePage: number,
  pageSize: number,
  flagExpire: number,
  column: string,
  sorting: string
): Promise<BankGaransiDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'BankGuarantee/userLogin=' +
    userLogin +
    '?page=' +
    activePage +
    '&pageSize=' +
    pageSize +
    '&flagExpire=' +
    flagExpire +
    '&searchText=' +
    textSearch +
    '&column=' +
    column +
    '&sorting=' +
    sorting;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<BankGaransiDashboardEnvelope>(BankGaransiDashboardEnvelope, endpoint);
};

export const requestBGExSearch = async (
  userLogin: string,
  textSearch: string,
  activePage: number,
  pageSize: number,
  flagExpire: number,
  column: string,
  sorting: string
): Promise<BankGaransiDashboardEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'BankGuarantee/userLogin=' +
    userLogin +
    '?page=' +
    activePage +
    '&pageSize=' +
    pageSize +
    '&flagExpire=' +
    flagExpire +
    '&searchText=' +
    textSearch +
    '&column=' +
    column +
    '&sorting=' +
    sorting;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<BankGaransiDashboardEnvelope>(BankGaransiDashboardEnvelope, endpoint);
};

export const postAttachment = async (data: AttachmentMapper): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FileFunnel/Upload';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};

export const clearResult = async (): Promise<any> => {
  const clear = new ResultActions({});
  return clear;
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
