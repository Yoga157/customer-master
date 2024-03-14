import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import CustomerSettingModel from "./models/CustomerSettingModel";
import CustomerSettingPostModel from "./models/CustomerSettingPostModel";
import ResultAccounts from "./models/ReleaseAccounts";
import ApproveShareableAccounts from "./models/ApproveShareableccounts";
import CustomerSettingById from "./models/CustomerSettingById";
import CustomerID from "./models/ReleaseAccounts";
import ResultActions from "models/ResultActions";
import { NumberFormatState } from "react-number-format";
import { data } from "jquery";
import CustomerClaimAccount from "./models/CustomerClaimAccount";
import CustomerSettingPutModel from "./models/CustomerSettingPutModel";

export const requestNoNameAcc = async (
  page?: number,
  pageSize?: number,
  column?: string,
  sorting?: string
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerSettingNoNamedAccount?${
    page ? `page=${page}` : ``
  }${pageSize ? `&pageSize=${pageSize}` : ``}${
    column ? `&column=${column}` : ``
  }${sorting ? `&sorting=${sorting}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestNamedAcc = async (
  page?: number,
  pageSize?: number,
  column?: string,
  sorting?: string
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerSettingNamedAccount?${
    page ? `page=${page}` : ``
  }${pageSize ? `&pageSize=${pageSize}` : ``}${
    column ? `&column=${column}` : ``
  }${sorting ? `&sorting=${sorting}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestShareabledAcc = async (
  page?: number,
  pageSize?: number,
  column?: string | null,
  sorting?: string
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerSettingShareableAccount?${
    page ? `page=${page}` : ``
  }${pageSize ? `&pageSize=${pageSize}` : ``}${
    column ? `&column=${column}` : ``
  }${sorting ? `&sorting=${sorting}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestAllAcc = async (
  page?: number,
  pageSize?: number,
  column?: string,
  sorting?: string
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerSettingAllAccount?${
    page ? `page=${page}` : ``
  }${pageSize ? `&pageSize=${pageSize}` : ``}${
    column ? `&column=${column}` : ``
  }${sorting ? `&sorting=${sorting}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestCustomerSett = async (
  page?: number,
  pageSize?: number,
  column?: string,
  sorting?: string
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetListCustomerSetting?${
    page ? `page=${page}` : ``
  }${pageSize ? `&pageSize=${pageSize}` : ``}${
    column ? `&column=${column}` : ``
  }${sorting ? `&sorting=${sorting}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestSearchNoNameAcc = async (
  page: number,
  pageSize: number,
  column: string | null,
  search: string | null,
  sorting?: string | null,
  pmo_customer?: boolean | null,
  holdshipment?: boolean | null,
  blacklist?: boolean | null
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerSettingNoNamedAccount?page=${page}&pageSize=${pageSize}&column=${column}${
    search || search != null ? `&search=${search}` : ``
  }${sorting || sorting != null ? `&sorting=${sorting}` : ``}${
    pmo_customer || pmo_customer != null ? `&pmoCustomer=${pmo_customer}` : ``
  }${
    holdshipment || holdshipment != null ? `&holdshipment=${holdshipment}` : ``
  }${blacklist || blacklist != null ? `&blacklist=${blacklist}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestSearchNamedAcc = async (
  page: number,
  pageSize: number,
  column: string | null,
  search: string | null,
  sorting?: string | null,
  salesID?: string | null,
  myAccount?: number | null,
  pmo_customer?: boolean | null,
  holdshipment?: boolean | null,
  blacklist?: boolean | null
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerSettingNamedAccount?page=${page}&pageSize=${pageSize}&column=${column}${
    search || search != null ? `&search=${search}` : ``
  }${sorting || sorting != null ? `&sorting=${sorting}` : ``}${
    salesID || salesID != null ? `&salesID=${salesID}` : ``
  }${myAccount || myAccount != null ? `&myAccount=${myAccount}` : ``}${
    pmo_customer || pmo_customer != null ? `&pmoCustomer=${pmo_customer}` : ``
  }${
    holdshipment || holdshipment != null ? `&holdshipment=${holdshipment}` : ``
  }${blacklist || blacklist != null ? `&blacklist=${blacklist}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestSearchShareabelAcc = async (
  page: number,
  pageSize: number,
  column: string | null,
  search: string | null,
  sorting?: string | null,
  salesID?: string | null,
  pmo_customer?: boolean | null,
  blacklist?: boolean | null,
  holdshipment?: boolean | null
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerSettingShareableAccount?page=${page}&pageSize=${pageSize}&column=${column}${
    search || search != null ? `&search=${search}` : ``
  }${sorting || sorting != null ? `&sorting=${sorting}` : ``}${
    pmo_customer || pmo_customer != null ? `&pmoCustomer=${pmo_customer}` : ``
  }${salesID || salesID != null ? `&salesID=${salesID}` : ``}${
    blacklist || blacklist != null ? `&blacklist=${blacklist}` : ``
  }${
    holdshipment || holdshipment != null ? `&holdshipment=${holdshipment}` : ``
  }`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestSearchAllAcc = async (
  page: number,
  pageSize: number,
  column: string | null,
  search: string | null,
  sorting?: string | null,
  salesID?: string | null,
  myAccount?: number | null,
  pmo_customer?: boolean | null,
  blacklist?: boolean | null,
  holdshipment?: boolean | null,
  showNoName?: boolean | null,
  showNamed?: boolean | null,
  showShareable?: boolean | null
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerSettingAllAccount?page=${page}&pageSize=${pageSize}&column=${column}${
    search || search != null ? `&search=${search}` : ``
  }${sorting || sorting != null ? `&sorting=${sorting}` : ``}${
    pmo_customer || pmo_customer != null ? `&pmoCustomer=${pmo_customer}` : ``
  }${salesID || salesID != null ? `&salesID=${salesID}` : ``}${
    myAccount || myAccount != null ? `&myAccount=${myAccount}` : ``
  }${blacklist || blacklist != null ? `&blacklist=${blacklist}` : ``}${
    holdshipment || holdshipment != null ? `&holdshipment=${holdshipment}` : ``
  }${showNoName || showNoName != null ? `&showNoName=${showNoName}` : ``}${
    showNamed || showNamed != null ? `&showNamed=${showNamed}` : ``
  }${
    showShareable || showShareable != null
      ? `&showShareable=${showShareable}`
      : ``
  }`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestSearchCustomerSett = async (
  page: number,
  pageSize: number,
  column: string | null,
  search: string | null,
  sorting?: string | null,
  salesAssign?: string | null,
  shareable?: boolean | null,
  pmo_customer?: boolean | null,
  holdshipment?: boolean | null,
  blacklist?: boolean | null
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetListCustomerSettingBySearch?page=${page}&pageSize=${pageSize}&column=${column}${
    search || search != null ? `&search=${search}` : ``
  }${sorting || sorting != null ? `&sorting=${sorting}` : ``}${
    salesAssign || salesAssign != null ? `&salesAssign=${salesAssign}` : ``
  }${shareable || shareable != null ? `&shareable=${shareable}` : ``}${
    pmo_customer || pmo_customer != null ? `&pmoCustomer=${pmo_customer}` : ``
  }${
    holdshipment || holdshipment != null ? `&holdshipment=${holdshipment}` : ``
  }${blacklist || blacklist != null ? `&blacklist=${blacklist}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

//Claim Account
export const postClaimAccount = async (
  data: CustomerSettingPostModel
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting";
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.postToModel<ResultActions>(
    ResultActions,
    endpoint,
    data
  );
};

//Request Share Account
export const postRequestAccount = async (
  data: CustomerSettingPostModel
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting";
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.postToModel<ResultActions>(
    ResultActions,
    endpoint,
    data
  );
};

export const deleteCustomerSett = async (
  customerSettingID: number
): Promise<CustomerSettingModel | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/" + customerSettingID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.delToModel<CustomerSettingModel>(
    CustomerSettingModel,
    endpoint
  );
};

export const requestCustomerSettingByCustomerId = async (
  customerSettingID: number
): Promise<CustomerSettingById | HttpErrorResponseModel> => {
  const controllerName =
    "CustomerSetting/GetCustomerSettingByCustomerGenID?customerGenID=" +
    customerSettingID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<CustomerSettingById>(
    CustomerSettingById,
    endpoint
  );
};

export const requestCustomerSettingById = async (
  customerSettingID: number
): Promise<CustomerSettingById | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/" + customerSettingID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<CustomerSettingById>(
    CustomerSettingById,
    endpoint
  );
};

export const postCustomerSetting = async (
  data: CustomerSettingById
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting";
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.postToModel<ResultActions>(
    ResultActions,
    endpoint,
    data
  );
};

export const putCustomerSetting = async (
  data: CustomerID,
  id: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/" + id;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const putReleaseAccount = async (
  customerID: number,
  salesID: number,
  modifyUserID: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName =
    "CustomerSetting/ReleaseAccount?customerID=" +
    customerID +
    "&salesID=" +
    salesID +
    "&modifyUserID=" +
    modifyUserID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint);
};

export const putApproveCustomerSetting = async (
  data: ApproveShareableAccounts,
  customerID: number,
  salesID: number,
  isApprove: boolean,
  modifyUserID: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName =
    "CustomerSetting/ApproveCustomerSetting?customerID=" +
    customerID +
    "&salesID=" +
    salesID +
    "&isApprove=" +
    isApprove +
    "&modifyUserID=" +
    modifyUserID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const clearResult = async (): Promise<any> => {
  const clear = new ResultActions({});
  return clear;
};

export const claimAccount = async (
  data: CustomerClaimAccount
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting";
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.postToModel<ResultActions>(
    ResultActions,
    endpoint,
    data
  );
};

export const releaseAccount = async (
  customerID: number,
  salesID: number,
  modifyUserID: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName =
    "CustomerSetting/ReleaseAccount?customerID=" +
    customerID +
    "&salesID=" +
    salesID +
    "&modifyUserID=" +
    modifyUserID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint);
};

export const acceptRequestShareableAccount = async (
  customerID: number, salesID: number, isApprove: boolean, modifyUserID: number, description?: string
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/ApproveCustomerSetting?customerID=" + customerID + "&salesID=" + salesID + "&isApprove=" + isApprove + "&modifyUserID=" + modifyUserID + `${description != null ? "&description=" + description : ""}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint);
};

// get customer data by customer id
export const requestCustomerDataById = async (
  customerID: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName =
    "CustomerSetting/GetCustomerData?customerID=" + customerID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  
  return EffectUtility.getToModel<ResultActions>(
    ResultActions,
    endpoint
  );
};

// get customer by name
export const requestCustomerDataByName = async (
  customerName: string
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/GetCustomerByName?customerName=" + customerName;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<ResultActions>(
    ResultActions,
    endpoint
  );
};

export const putCustomerSettingCategoryPmo = async (
  data: CustomerSettingPutModel,
  customerID: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting?customerID=" + customerID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.putToModel<ResultActions>(
    ResultActions,
    endpoint,
    data
  );
};
