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
// import CreditBillingEnvelope from './models/CreditBillingEnvelope';
//import SoftwareToolEnvelope from './models/SoftwareToolEnvelope';
//import SoftwareUpdateHeaderModel from './models/SoftwareUpdateHeaderModel';
//import SoftwareToolModelAdd from './models/SoftwareToolTypeAdd';
import ResultActions from 'models/ResultActions';
// import CBVCreditBillingModels from './models/CBVCreditBillingModels';
import AWSBillingEnvelope from './models/AWSBillingEnvelope';
import AWSBillingByIdModel from './models/AWSBillingByIdModel';
import AWSBillingInsertUsageDetail from './models/AWSBillingInsertUsageDetail';
import DropDownSearchCBVModel from './models/DropDownSearchCBVModel';
import DropDownSearchLPRModel from './models/DropDownSearchLPRModel';
import DropDownPICModel from './models/DropDownPICModel';
import VoucherAmountPICNameModel from './models/VoucherAmountPICNameModel';
import UsageDetailDashboardEnvelope from './models/UsageDetailDashhboard/UsageDetailDashboardEnvelope';
import BillingDetailPerProductEnvelope from './models/Aws_Billing_Detail_Perproduct/BillingDetailPerProductEnvelope';
import ChangeAccountId from './models/ChangeAccountId';
import NeccessityModel from './models/NeccesityModel';
import AWSBillingModel from './models/AWSBillingModel';
import FilterAWSBillingModel from './models/FilterAWSBillingModel';
import AWSBillingHPermission from './models/AWSBillingPermission';
import DropDownSearchSOModel from './models/DropDownSearchSOModel';
import AWSAmountUnsettleModel from './models/AWSAmountUnsettleModel';
import AWSBillingPeriodModel from './models/AWSBillingPeriodModel';
import DropDownModel from './models/DropDownModel';

/* export const requestSoftwareHeader = async (softwareID: number): Promise<SoftwareHeaderModel | HttpErrorResponseModel> => {
  const controllerName = 'Software/GetSoftwareToolEditHeader?SoftwareID=' + softwareID;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<SoftwareHeaderModel>(SoftwareHeaderModel, endpoint);
}; */

export const requestAWSBillings = async (
  userLoginID: number,
  text: string,
  sorting: string,
  column: string,
  activePage: number,
  pageSize: number
): Promise<AWSBillingEnvelope | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = 'AWSBilling/GetListDashboardAwsBillingHeader?userLoginID=' + userLoginID + '&text=' + text + '&sorting=' + sorting + '&column=' + column + '&page=' + activePage + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<AWSBillingEnvelope>(AWSBillingEnvelope, endpoint);
};


export const requestAWSBillingById = async (
  ID: number,
): Promise<AWSBillingByIdModel | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = `AWSBilling/GetAwsBillingHeader?billingIdH=${ID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<AWSBillingByIdModel>(AWSBillingByIdModel, endpoint);
};

export const InsertUsageDetail = async (data: AWSBillingInsertUsageDetail): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'AWSBilling/InsertUsageDetail';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const DropDownSearchCBV = async (
  userLoginID: number,
  text: string,
  funnelGenID: number
): Promise<DropDownSearchCBVModel | HttpErrorResponseModel> => {
  console.log('userLogin',userLoginID)
  const controllerName = `AWSBilling/DropdownSearchCBV?userLoginID=${userLoginID}&text=${text}&funnelGenID=${funnelGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropDownSearchCBVModel>(DropDownSearchCBVModel, endpoint);
};

export const DropDownSearchLPR = async (
  userLoginID: number,
  text: string
): Promise<DropDownSearchLPRModel | HttpErrorResponseModel> => {
  console.log('userLogin',userLoginID)
  const controllerName = `AWSBilling/DropdownSearchLPR?userLoginID=${userLoginID}&text=${text}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropDownSearchLPRModel>(DropDownSearchLPRModel, endpoint);
};

export const DropDownPIC = async (
  userLoginID: number,
  VoucherNo: string,
): Promise<DropDownPICModel | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = `AWSBilling/DropdownPIC?VoucherNo=${VoucherNo}&userLoginID=${userLoginID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropDownPICModel>(DropDownPICModel, endpoint);
};

export const DropDownCustomerNameAWS = async (
  userLoginID: number,
  search: string,
): Promise<DropDownModel | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = `AWSBilling/DropdownCustomerNameAWS?search=${search}&userLoginID=${userLoginID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropDownModel>(DropDownModel, endpoint);
};

export const DropDownDeptAWS = async (
  userLoginID: number,
  search: string,
): Promise<DropDownModel | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = `AWSBilling/DropdownDeptAWS?search=${search}&userLoginID=${userLoginID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropDownModel>(DropDownModel, endpoint);
};

export const DropDownPicAWS = async (
  userLoginID: number,
  search: string,
): Promise<DropDownModel | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = `AWSBilling/DropdownPICAWS?search=${search}&userLoginID=${userLoginID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropDownModel>(DropDownModel, endpoint);
};

export const GetDetailVoucherAmount = async (
  VoucherNo: string,
  salesId: number
): Promise<VoucherAmountPICNameModel | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = `AWSBilling/GetDetailVoucherAmountByPICName?voucherNo=${VoucherNo}&salesId=${salesId}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<VoucherAmountPICNameModel>(VoucherAmountPICNameModel, endpoint);
};

export const requestUsageDashboard = async (
  BillingIdH: number,
  page: number,
  pageSize: number
): Promise<UsageDetailDashboardEnvelope | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = 'AWSBilling/GetListDashboardAwsBillingUsageDetail?BillingIdH=' + BillingIdH + '&page=' + page + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<UsageDetailDashboardEnvelope>(UsageDetailDashboardEnvelope, endpoint);
};

export const requestDashboardUsagePerproduct = async (
  BillingIdH: number,
): Promise<BillingDetailPerProductEnvelope | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = 'AWSBilling/GetListDashboardAwsBillingDetailPerProduct?BillingIdH=' + BillingIdH;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<BillingDetailPerProductEnvelope>(BillingDetailPerProductEnvelope, endpoint);
};

export const requestAmountUnsettleOrdering = async (
  billingPeriod: string,
  salesId: number,
  currency: string,
  createDate: string,
  customerGenID: number
): Promise<AWSAmountUnsettleModel | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = 'AWSBilling/GetAmountUnsettleOrderingByPIC?billingPeriod=' + billingPeriod + '&salesId=' + salesId + '&currency=' + currency + '&createDate=' + createDate + '&customerGenID=' + customerGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<AWSAmountUnsettleModel>(AWSAmountUnsettleModel, endpoint);
};

export const requestAmountUnsettleSelling = async (
  billingPeriod: string,
  salesId: number,
  currency: string,
  createDate: string,
  customerGenID: number
): Promise<AWSAmountUnsettleModel | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = 'AWSBilling/GetAmountUnsettleSellingByPIC?billingPeriod=' + billingPeriod + '&salesId=' + salesId + '&currency=' + currency + '&createDate=' + createDate + '&customerGenID=' + customerGenID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<AWSAmountUnsettleModel>(AWSAmountUnsettleModel, endpoint);
};

export const requestBillingPeriod = async (
  currentDate: string,
  salesId: number,
  customerGenID: number
): Promise<AWSBillingPeriodModel | HttpErrorResponseModel> => {
  // console.log('userLogin',userLoginID)
  const controllerName = `AWSBilling/GetBillingPeriodForDesc?currentDate=${currentDate}&salesId=${salesId}&customerGenID=${customerGenID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<AWSBillingPeriodModel>(AWSBillingPeriodModel, endpoint);
};


export const UpdateAccountID= async (
  data: ChangeAccountId
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'AWSBilling/SetAccountIDtoPIC';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(
      ResultActions,
      endpoint,
      data
  );
};

//Get Neccesity
export const requestNeccesity = async (ID: number): Promise<NeccessityModel | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/Necessity';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<NeccessityModel>(NeccessityModel, endpoint);
};

export const requestAWSBillingPermission = async (ID: number): Promise<AWSBillingHPermission | HttpErrorResponseModel> => {
  const controllerName = 'Udc/GetByEntryKey/AWSBillingHPermission';
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<AWSBillingHPermission>(AWSBillingHPermission, endpoint);
};

export const RequestFilterAWSBilling = async (data: FilterAWSBillingModel): Promise<AWSBillingEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'AWSBilling/FilterSearch';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<AWSBillingEnvelope>(AWSBillingEnvelope, endpoint, data);
};

export const removeResult = async (): Promise<ResultActions | HttpErrorResponseModel> => {
  const clearResult = new ResultActions({});
  return clearResult;
};


export const DropDownSearchSO = async (
  userLoginID: number,
  text: string
): Promise<DropDownSearchSOModel | HttpErrorResponseModel> => {
  console.log('userLogin',userLoginID)
  const controllerName = `AWSBilling/SearchSOCBV?userLoginID=${userLoginID}&text=${text}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropDownSearchSOModel>(DropDownSearchSOModel, endpoint);
};