import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import BrandSummaryModel from "./models/BrandSummaryModel";
import ResultActions from "models/ResultActions";

export const requestBrandSummary = async (CustomerID: number): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'CustomerSetting/GetBrandSummary?customerID=' + CustomerID;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<ResultActions>(
        ResultActions,
        endpoint
    );
}