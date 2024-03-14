import IInvoicingScheduleState from "./models/IInvoicingScheduleState";
import * as InvoicingScheduleActions from "./InvoicingScheduleActivityActions"
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import InvoicingScheduleModel from "./models/InvoicingScheduleModel";
import ResultActions from "models/ResultActions";

export const initialState: IInvoicingScheduleState = {
    data: new InvoicingScheduleModel({}),
    resultActions: new ResultActions({})
}

const InvoicingScheduleReducer: Reducer = baseReducer(initialState, {
    [InvoicingScheduleActions.POST_INVOICING_SCHEDULE_FISNISHED](state: IInvoicingScheduleState, action: IAction<ResultActions>): IInvoicingScheduleState {
        return {
            ...state,
            resultActions: action.payload!
        }
    },

    [InvoicingScheduleActions.REQUEST_GET_INVOICING_SCHEDULE_FINISHED](state: IInvoicingScheduleState, action: IAction<ResultActions>): IInvoicingScheduleState {
        return {
            ...state,
            resultActions: action.payload!
        }
    },

    [InvoicingScheduleActions.PUT_INVOICING_SCHEDULE_FINISHED](state: IInvoicingScheduleState, action: IAction<ResultActions>): IInvoicingScheduleState {
        console.log(action)
        return {
            ...state,
            resultActions: action.payload!
        }
    },
})

export default InvoicingScheduleReducer;