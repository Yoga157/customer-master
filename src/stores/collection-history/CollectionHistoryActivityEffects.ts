import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import CollectionHistoryModel from "./models/CollectionHistoryModel";
import ResultActions from "models/ResultActions";

export const requestCollectionHistory = async (customerId: number): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "CustomerSetting/GetCollectionHistory?customerID=" + customerId;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<ResultActions>(ResultActions, endpoint);
}