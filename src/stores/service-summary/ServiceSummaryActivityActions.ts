import * as ServiceSummaryEffect from "./ServiceSummaryActivityEffects"
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import ServiceSummaryModel from "./models/ServiceSummaryModel";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | ServiceSummaryModel
  | ResultActions;

export const REQUEST_GET_SERVICE_SUMMARY: string = "CustomerNameAction.REQUEST_GET_SERVICE_SUMMARY";
export const REQUEST_GET_SERVICE_SUMMARY_FINISHED: string = "CustomerNameAction.REQUEST_GET_SERVICE_SUMMARY_FINISHED";

export const requestServiceSummary = (customerID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_GET_SERVICE_SUMMARY,
            ServiceSummaryEffect.requestServiceSummary,
            customerID
        )
    }
}