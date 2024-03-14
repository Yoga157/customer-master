import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
//import SoftwareModel from './models/SoftwareModel';
//import SoftwareSearchModel from './models/SoftwareSearchModel';
//import SoftwareMainModel from './models/SoftwareMainModel';
//import SoftwareTypeModel from './models/SoftwareTypeModel';
//import SoftwareHeaderModel from './models/SoftwareHeaderModel';
import CreditBillingEnvelope from './models/CreditBillingEnvelope';
import CBVAttachmentModel from './models/CBVAttachmentModel'
//import SoftwareToolEnvelope from './models/SoftwareToolEnvelope';
//import SoftwareUpdateHeaderModel from './models/SoftwareUpdateHeaderModel';
//import SoftwareToolModelAdd from './models/SoftwareToolTypeAdd';
import ResultActions from 'models/ResultActions';
import CBVCreditBillingModels from './models/CBVCreditBillingModels';
import CreditBillingModel from './models/CreditBillingModel';
import SearchProjectNameModel from './models/SearchProjectNameModel';
import CBVAttachment from './models/CBVAttachment';
import CBVCreditBillingModel from './models/CBVCreditBillingModel';
import CBVAssign from './models/CBVAssign';
import CBVAssignModel from './models/CBVAssignModel';
import CBVDetail from './models/CBVDetail';
import CBVCreditByIDModel from './models/CBVCreditByIDModel';
import AttachmentMapper from './models/AttachmentMapper';
import ChangeCreditBilling from './models/ChangeCreditBilling';
import CBVUsageDetailEnvelope from './models/Detail_Usage_CBV/CBVUsageDetailEnvelope';
import CBVDocTypeModel from './models/CBVDocTypeModel';
import DropDownBillingPeriodModel from './models/DropDownBillingPeriodModel';
import FilterMainCBV from './models/FilterMainCBV';
import CBVTypeVoucherModel from './models/CBVTypeVoucherModel';
import CBVEntitlementModel from './models/CBVEntitlementModel';

/* export const requestSoftwareHeader = async (softwareID: number): Promise<SoftwareHeaderModel | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetSoftwareToolEditHeader?SoftwareID=' + softwareID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareHeaderModel>(SoftwareHeaderModel, endpoint);
}; */

export const requestCreditBillings = async (
  userLogin: number,
  text: string,
  sorting: string,
  column: string,
  page: number,
  pageSize: number
): Promise<CreditBillingEnvelope | HttpErrorResponseModel> => {
  // console.log('Effect',page,pageSize)
  const controllerName = `CreditBillingService/GetListDashboard?userLoginID=${userLogin}&text=${text}&sorting=${sorting}&column=${column}&page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CreditBillingEnvelope>(CreditBillingEnvelope, endpoint);
};

export const postCreditBilling = async (data: CBVCreditBillingModels): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'CreditBillingService';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestProjectName = async (search: string): Promise<SearchProjectNameModel | HttpErrorResponseModel> => {
  const controllerName = `Funnel/SearchProjectNameALL?search=${search}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<SearchProjectNameModel>(SearchProjectNameModel, endpoint);
};

export const postAttachmentBilling = async (data: CBVAttachment): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'CBVAttachment/SaveAttachmentTemp';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const uploadAssignCBV = async (data: AttachmentMapper): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'CBVAttachment/Upload';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postUpload<ResultActions>(ResultActions, endpoint, data);
};

export const requestAttachmentBilling = async (
  creditId: number,
  UserLoginID: number
): Promise<CBVAttachmentModel | HttpErrorResponseModel> => {
  const controllerName = `CBVAttachment/GetListDashboardCBVAttachment?creditId=${creditId}&UserLoginID=${UserLoginID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CBVAttachmentModel>(CBVAttachmentModel, endpoint);
};

export const postAssignCBVBilling = async (data: CBVAssign): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'CreditBillingService/InsertDetailCBV';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestAssignCBVBilling = async (
  CreditId: number,
): Promise<CBVAssignModel | HttpErrorResponseModel> => {
  const controllerName = `CreditBillingService/GetListDetailCBV?CreditId=${CreditId}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CBVAssignModel>(CBVAssignModel, endpoint);
};

export const deleteCreditBilling = async(creditId:string):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = `CreditBillingService/Delete?CreditBillingServiceID=${creditId}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const deleteCreditDetail = async(CreditDetailId:number):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = `CreditBillingService/DeleteDetail?CreditDetailId=${CreditDetailId}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const requestDetailCBV = async (
  CreditId: number,
  UserLogin: number
): Promise<CBVDetail | HttpErrorResponseModel> => {
  const controllerName = `CreditBillingService/GetListDetailDashboardCBV?CreditId=${CreditId}&UserLogin=${UserLogin}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CBVDetail>(CBVDetail, endpoint);
};

export const requestCBVCreditId = async (
  CreditId: number,
): Promise<CBVCreditByIDModel | HttpErrorResponseModel> => {
  const controllerName = `CreditBillingService/GetCBVByCreditID?CreditId=${CreditId}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CBVCreditByIDModel>(CBVCreditByIDModel, endpoint);
};

export const putCreditBilling= async (
  data: ChangeCreditBilling
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'CreditBillingService';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(
      ResultActions,
      endpoint,
      data
  );
};

export const requestDetailUsageCBV = async (
  billingPeriod: string,
  voucherNo: string,
  PICName: string,
  page: number,
  pageSize: number
): Promise<CBVUsageDetailEnvelope | HttpErrorResponseModel> => {
  const controllerName = `CreditBillingService/GetListDetailUsageCBV?billingPeriod=${billingPeriod}&voucherNo=${voucherNo}&PICName=${PICName}&page=${page}&pageSize=${pageSize}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CBVUsageDetailEnvelope>(CBVUsageDetailEnvelope, endpoint);
};

export const requestCBVDocType = async (): Promise<CBVDocTypeModel | HttpErrorResponseModel> => {
  const controllerName = `DocType/CBVDocType`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<CBVDocTypeModel>(CBVDocTypeModel, endpoint);
};

export const DropDownBillingPeriod = async (
  creditId: number,
  PicNameID: string
): Promise<DropDownBillingPeriodModel | HttpErrorResponseModel> => {
  const controllerName = `CreditBillingService/DropdownBillingPeriod?creditId=${creditId}&PicNameID=${PicNameID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropDownBillingPeriodModel>(DropDownBillingPeriodModel, endpoint);
};

export const RequestFilterMainCBV = async (data: FilterMainCBV): Promise<CreditBillingEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'CreditBillingService/FilterSearch';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<CreditBillingEnvelope>(CreditBillingEnvelope, endpoint, data);
};

export const deleteAttachmentBilling = async(AttachmentID:number, userLogin: number):Promise<ResultActions | HttpErrorResponseModel > => {
  let controllerName = `CBVAttachment/Delete?AttachmentID=${AttachmentID}&userLogin=${userLogin}`;
  const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const removeResult = async (): Promise<ResultActions | HttpErrorResponseModel> => {
  const clearResult = new ResultActions({});
  return clearResult;
};

export const requestCBVTypeVoucher = async (ID: number): Promise<CBVTypeVoucherModel | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/CBVTypeVoucher';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<CBVTypeVoucherModel>(CBVTypeVoucherModel, endpoint);
};

export const requestEntitlement = async (): Promise<CBVEntitlementModel | HttpErrorResponseModel> => {
  const controllerName = `CreditBillingService/GetEntitlement`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CBVEntitlementModel>(CBVEntitlementModel, endpoint);
};



// export const requestFileAttachmentCBV= async(attachmentId:string):Promise<any | HttpErrorResponseModel > => {
//   let controllerName = `CBVAttachment/download-file/${attachmentId}`;
//   const endpoint: string = environment.api.funnel.replace(':controller',controllerName);
//   return EffectUtility.getToDownload<any>(Blob, endpoint);
// };