import IInvoicingConditionState from "./models/IInvoicingConditionState";
import * as InvoicingConditionActions from "./InvoicingConditionActivityActions"
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import InvoicingConditionModel from "./models/InvoicingConditionModel";
import ResultActions from "models/ResultActions";

export const initialState: IInvoicingConditionState = {
    data: new ResultActions({})
}

const InvoicingConditionReducer: Reducer = baseReducer(initialState, {
    [InvoicingConditionActions.POST_INVOICING_CONDITION_FINISHED](state: IInvoicingConditionState, action: IAction<InvoicingConditionModel[]>): IInvoicingConditionState {
        return {
            ...state
        }
    },

    [InvoicingConditionActions.REQUEST_GET_INVOICING_CONDITION_FINISHED](state: IInvoicingConditionState, action: IAction<ResultActions>): IInvoicingConditionState {
        return {
            ...state,
            data: action.payload!
        }
    },

    [InvoicingConditionActions.DEL_INVOICING_CONDITION_FINISHED](state: IInvoicingConditionState, action: IAction<InvoicingConditionModel[]>): IInvoicingConditionState {
        return {
            ...state
        }
    },
})

export default InvoicingConditionReducer;