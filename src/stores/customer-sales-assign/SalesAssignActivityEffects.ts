import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import SalesAssignModel from "./models/SalesAssignModel";
import SalesAssignRow from "./models/SalesAssignRow";
import ResultActions from "models/ResultActions";
import SalesNameMode from "./models/SalesNameModel";
import SalesAssignPostModel from "./models/SalesAssignPostModel";
import SalesAssignHistoryModel from "../customer-sales/models/SalesAssignHistoryModel";

//Get sales assign history by customer id
export const requestAssignSales = async (
  data: SalesAssignRow,
  customerSettingId: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName =
    "CustomerSalesAssign?customerSettingID=" + customerSettingId;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.getToModel<ResultActions>(ResultActions, endpoint, data);
};

//Get Sales By Name
export const requestSalesByName = async (
  search: string
): Promise<SalesNameMode | HttpErrorResponseModel> => {
  const controllerName = "CustomerSetting/SalesName?search=" + search;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );

  return EffectUtility.getToModel<SalesNameMode>(SalesNameMode, endpoint);
};

//Assign sales
export const postAssignedSales = async (
  data: SalesAssignPostModel,
  UserLoginID: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = "CustomerSalesAssign?" + "&UserLoginID=" + UserLoginID;
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

//Update assigned sales by customer id
export const putAssignedSales = async (
  data: SalesAssignRow,
  UserLoginID: number,
  id: number
): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName =
    "CustomerSalesAssign/" + id + "?UserLoginID=" + UserLoginID;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};