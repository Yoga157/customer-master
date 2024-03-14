import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import ServiceSummaryModel from "./models/ServiceSummaryModel";
import ResultActions from "models/ResultActions";

export const requestServiceSummary = async (CustomerID: number): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'CustomerSetting/GetServiceSummary?customerID=' + CustomerID;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<ResultActions>(
        ResultActions,
        endpoint
    );
}