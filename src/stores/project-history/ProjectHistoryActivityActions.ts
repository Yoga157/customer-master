import * as ProjectHistoryEffect from "./ProjectHistoryActivityEffects"
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import ProjectHistoryModel from "./models/ProjectHistoryModel";
import ResultActions from "models/ResultActions";
import IAction from "models/IAction";
import CustomerStoryPostModel from "./models/CustomerStoryPostModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | ProjectHistoryModel
  | ResultActions;

export const REQUEST_GET_PROJECT_HISTORY: string = "ProjectHistoryActions.REQUEST_GET_PROJECT_HISTORY";
export const REQUEST_GET_PROJECT_HISTORY_FINISHED: string = "ProjectHistoryActions.REQUEST_GET_PROJECT_HISTORY_FINISHED";

export const requestProjectHistory = (customerID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_GET_PROJECT_HISTORY,
            ProjectHistoryEffect.requestProjectHistory,
            customerID
        )
    }
}

export const POST_CUSTOMER_STORY: string = "InvoicingScheduleActions.POST_CUSTOMER_STORY";
export const POST_CUSTOMER_STORY_FISNISHED: string = "InvoicingScheduleActions.POST_CUSTOMER_STORY_FISNISHED";
  
export const postInvoicingSchedule = (data: CustomerStoryPostModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            POST_CUSTOMER_STORY,
            ProjectHistoryEffect.postCustomerStory,
            data
        )
    }
}