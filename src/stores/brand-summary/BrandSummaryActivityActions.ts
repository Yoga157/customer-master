import * as BrandSummaryEffect from "./BrandSummaryActivityEffects";
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import BrandSummaryModel from "./models/BrandSummaryModel";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | BrandSummaryModel
  | ResultActions;

export const REQUEST_GET_BRAND_SUMMARY: string = "CustomerNameAction.REQUEST_GET_BRAND_SUMMARY";
export const REQUEST_GET_BRAND_SUMMARY_FINISHED: string = "CustomerNameAction.REQUEST_GET_BRAND_SUMMARY_FINISHED";

export const requestBrandSummary = (customerID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_GET_BRAND_SUMMARY,
            BrandSummaryEffect.requestBrandSummary,
            customerID
        )
    }
}