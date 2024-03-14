import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import InvoicingConditionModel from "./models/InvoicingConditionModel";
import ResultActions from "models/ResultActions";

export const requestInvoicingCondition = async (customerId: number): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "InvoicingCondition/GetInvoicingConditionByCustomerID?customerID=" + customerId;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<ResultActions>(ResultActions, endpoint);
}

export const postInvoicingCondition = async (data: InvoicingConditionModel): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "InvoicingCondition";
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.postToModel<ResultActions>(
        ResultActions,
        endpoint,
        data
    );
}

export const deleteInvoicingCondition = async (id: number): Promise<InvoicingConditionModel | HttpErrorResponseModel> => {
    const controllerName = "InvoicingCondition/" + id;
  const endpoint: string = environment.api.customer.replace(
    ":controller",
    controllerName
  );
  return EffectUtility.delToModel<InvoicingConditionModel>(
    InvoicingConditionModel,
    endpoint
  );
}