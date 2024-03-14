import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import ProjectHistoryModel from "./models/ProjectHistoryModel";
import ResultActions from "models/ResultActions";
import CustomerStoryPostModel from "./models/CustomerStoryPostModel";

export const requestProjectHistory = async (CustomerID: number): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = 'CustomerSetting/GetProjectHistory?customerID=' + CustomerID;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<ResultActions>(
        ResultActions,
        endpoint
    );
}

export const postCustomerStory = async (data: CustomerStoryPostModel): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "CustomerSuccessStory";
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