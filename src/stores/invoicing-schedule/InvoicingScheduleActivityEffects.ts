import environment from "environment";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as EffectUtility from "../../utilities/EffectUtility";
import InvoicingScheduleModel from "./models/InvoicingScheduleModel";
import ResultActions from "models/ResultActions";

export const postInvoicingSchedule = async (data: InvoicingScheduleModel): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "InvoicingSchedule";
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

export const requestInvoicingSchedule = async (customerID: number): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "InvoicingSchedule/GetInvoicingScheduleByCustomerID?customerID=" + customerID;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.getToModel<ResultActions>(
        ResultActions,
        endpoint,
    );
}

export const putInvoicingSchedule = async (data: InvoicingScheduleModel, id: number): Promise<ResultActions | HttpErrorResponseModel> => {
    const controllerName = "InvoicingSchedule/" + id;
    const endpoint: string = environment.api.customer.replace(
        ":controller",
        controllerName
    );

    return EffectUtility.putToModel<ResultActions>(
        ResultActions,
        endpoint,
        data
    );
}