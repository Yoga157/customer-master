import IServiceSummaryState from "./models/IServiceSummaryState";
import * as ServiceSummaryAction from "./ServiceSummaryActivityActions"
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import ServiceSummaryModel from "./models/ServiceSummaryModel";
import ResultActions from "models/ResultActions";

export const initialState: IServiceSummaryState = {
    data: new ResultActions({}),
};

const ServiceSummaryReducer: Reducer = baseReducer(initialState, {
    [ServiceSummaryAction.REQUEST_GET_SERVICE_SUMMARY_FINISHED](state: IServiceSummaryState, action: IAction<ResultActions>): IServiceSummaryState {
        return {
            ...state,
            data: action.payload!
        }
    }
})

export default ServiceSummaryReducer