import * as InvoicingScheduleEffect from "./InvoicingScheduleActivityEffects"
import HttpErrorResponseModel from "../../models/HttpErrorResponseModel";
import * as ActionUtility from "../../utilities/ActionUtility";
import { ReduxDispatch } from "../../models/ReduxProps";
import ResultActions from "models/ResultActions";
import IStore from "../../models/IStore";
import InvoicingScheduleModel from "./models/InvoicingScheduleModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | InvoicingScheduleModel
  | ResultActions;

export const POST_INVOICING_SCHEDULE: string = "InvoicingScheduleActions.POST_INVOICING_SCHEDULE";
export const POST_INVOICING_SCHEDULE_FISNISHED: string = "InvoicingScheduleActions.POST_INVOICING_SCHEDULE_FISNISHED";
  
export const postInvoicingSchedule = (data: InvoicingScheduleModel): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            POST_INVOICING_SCHEDULE,
            InvoicingScheduleEffect.postInvoicingSchedule,
            data
        )
    }
}

export const REQUEST_GET_INVOICING_SCHEDULE: string = "InvoicingScheduleActions.REQUEST_GET_INVOICING_SCHEDULE";
export const REQUEST_GET_INVOICING_SCHEDULE_FINISHED: string = "InvoicingScheduleActions.REQUEST_GET_INVOICING_SCHEDULE_FINISHED";

export const requestInvoicingSchedule = (customerID: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            REQUEST_GET_INVOICING_SCHEDULE,
            InvoicingScheduleEffect.requestInvoicingSchedule,
            customerID
        )
    }
}

export const PUT_INVOICING_SCHEDULE: string = "InvoicingScheduleActions.PUT_INVOICING_SCHEDULE";
export const PUT_INVOICING_SCHEDULE_FINISHED: string = "InvoicingScheduleActions.PUT_INVOICING_SCHEDULE_FINISHED";

export const putInvoicingSchedule = (data: InvoicingScheduleModel, id: number): any => {
    return async (dispatch: ReduxDispatch<ActionUnion>): Promise <void> => {
        await ActionUtility.createThunkEffect<ResultActions>(
            dispatch,
            PUT_INVOICING_SCHEDULE,
            InvoicingScheduleEffect.putInvoicingSchedule,
            data,
            id
        )
    }
}