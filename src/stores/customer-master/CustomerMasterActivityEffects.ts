import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import CustomerMasterModel from "./models/CustomerMasterModel";
import CustomerMasterRow from "./models/CustomerMasterRow";
import ResultActions from "models/ResultActions";
import CustomerMasterPostModel from "./models/CustomerMasterPostModel";
import { NumberFormatState } from "react-number-format";
import { data } from "jquery";
import PostStatusNewCustomerModel from "./models/PostStatusNewCustomerModel";
import CustomerOfficeNumberModel from "./models/CustomerOficeNumberModel";

export const requestSearchCustomerMaster = async (
  page: number,
  pageSize: number,
  column: string | null,
  sorting?: string | null,
  titleCustomer?: string | null,
  customerName?: string | null,
  picName?: string | null
): Promise<CustomerMasterModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerSearchRequest?page=${page}&pageSize=${pageSize}&column=${column}${
    titleCustomer || titleCustomer != null
      ? `&titleCustomer=${titleCustomer}`
      : ``
  }${sorting || sorting != null ? `&sorting=${sorting}` : ``}${
    customerName || customerName != null ? `&customerName=${customerName}` : ``
  }${picName || picName != null ? `&picName=${picName}` : ``}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<CustomerMasterModel>(
    CustomerMasterModel,
    endpoint
  );
};

export const clearResult = async (): Promise<any> => {
  const clear = new CustomerMasterModel({});
  return clear;
};

export const postNewCustomerMaster = async (
  data: CustomerMasterPostModel
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/InsertRequestNewCustomer";
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

export const requestNewCustomerDetailByGenId = async (
  genId: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetRequestNewCustomerByGenID?customerGenID=${genId}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<ResultActions>(ResultActions, endpoint);
};

export const updateStatusNewCustomer = async (
  data: PostStatusNewCustomerModel
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/UpdateApprovalStatusNewCustomer";
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestApprovedCustomerByGenId = async (
  genId: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerDetailsByGenID?customerGenID=${genId}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<ResultActions>(ResultActions, endpoint);
};

export const requestCustomerMoreDetailsByCustId = async (
  custId: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `CustomerSetting/GetCustomerDetailsByCustID?customerID=${custId}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<ResultActions>(ResultActions, endpoint);
};

export const postCustomerOfficeNumber = async (
  data: CustomerOfficeNumberModel
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "AddressOfficeNumber";
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

export const updateCustomerOfficeNumber = async (
  data: CustomerOfficeNumberModel,
  id: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `AddressOfficeNumber/${id}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const deleteCustomerOfficeNumber = async (
  id: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `AddressOfficeNumber/${id}`;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};
