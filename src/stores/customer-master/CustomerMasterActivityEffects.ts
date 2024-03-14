import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import CustomerMasterModel from "./models/CustomerMasterModel";
import CustomerMasterRow from "./models/CustomerMasterRow";
import ResultActions from "models/ResultActions";
import { NumberFormatState } from "react-number-format";
import { data } from "jquery";

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
