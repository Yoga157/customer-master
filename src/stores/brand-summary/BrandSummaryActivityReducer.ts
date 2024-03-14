import IBrandSummaryState from "./models/IBrandSummaryState";
import * as BrandSummaryAction from "./BrandSummaryActivityActions";
import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import BrandSummaryModel from "./models/BrandSummaryModel";
import ResultActions from "models/ResultActions";

export const initialState: IBrandSummaryState = {
    data: new ResultActions({}),
};

const BrandSummaryReducer: Reducer = baseReducer(initialState, {
    [BrandSummaryAction.REQUEST_GET_BRAND_SUMMARY_FINISHED](state: IBrandSummaryState, action: IAction<ResultActions>): IBrandSummaryState {
        return {
            ...state,
            data: action.payload!
        }
    }
})

export default BrandSummaryReducer