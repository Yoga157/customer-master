import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import SalesAssignModel from "./models/SalesAssignModel";
import SalesAssignRow from "./models/SalesAssignRow";
import ResultActions from "models/ResultActions";
import SalesNameMode from "./models/SalesNameModel";
import SalesAssignPostModel from "./models/SalesAssignPostModel";
import SalesAssignHistoryModel from "./models/SalesAssignHistoryModel";

export const requestSalesByName = async (
  search: string
): Promise<SalesNameMode | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/SalesName?&search=" + search;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<SalesNameMode>(SalesNameMode, endpoint);
};

//Claim Account
export const postClaimAccount = async (
  data: SalesAssignPostModel
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
export const postaRequestAccount = async (
  data: SalesAssignPostModel
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

export const requestSalesDropdown = async (): Promise<
  ResultActions | HttpErrorResponseModel
> => {
  const controllerName = "CustomerSetting/GetSalesData";
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<ResultActions>(ResultActions, endpoint);
};

//Assign sales
export const postAssignedSales = async (
  data: SalesAssignPostModel
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/CustomerSalesAssign";
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

export const removeResultSearch = async (): Promise<
  ResultActions | HttpErrorResponseModel
> => {
  const clearResult = new ResultActions({});
  return clearResult;
};

export const clearResult = async (): Promise<any> => {
  const clear = new ResultActions({});
  return clear;
};

export const requestSalesHistory = async (
  customerID: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName =
    "SalesHistory/GetSalesAssignHistory?customerID=" +
    customerID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<ResultActions>(
    ResultActions,
    endpoint
  );
};

export const deleteSalesAssign = async (
  id: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/CustomerSalesAssign?AssignID=" + id;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const requestAccountOwner = async (
  customerId: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName =
    "SalesHistory/GetAccountOwner?customerID=" +
    customerId;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<ResultActions>(
    ResultActions,
    endpoint
  );
};