import IRelatedCustomerState from "./models/IRelatedCustomerState"
import * as RelatedCustomerActions from "./RelatedCustomerActivityActions"
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import RelatedCustomerPostModel from "./models/RelatedCustomerPostModel"
import RelatedCustomerModel from "./models/RelatedCustomerModel";
import ResultActions from "models/ResultActions";

export const initialState: IRelatedCustomerState = {
    data: new ResultActions({})
}

const RelatedCustomerReducer: Reducer = baseReducer(initialState, {
    [RelatedCustomerActions.POST_RELATED_CUSTOMER_FINISHED](state: IRelatedCustomerState, action: IAction<RelatedCustomerPostModel>): IRelatedCustomerState {
        return {
            ...state
        }
    },

    [RelatedCustomerActions.REQUEST_GET_RELATED_CUSTOMER_FINISHED](state: IRelatedCustomerState, action: IAction<ResultActions>): IRelatedCustomerState {
        return {
            ...state,
            data: action.payload!
        }
    },

    [RelatedCustomerActions.DEL_RELATED_CUSTOMER_FINISHED](state: IRelatedCustomerState, action: IAction<RelatedCustomerModel[]>): IRelatedCustomerState {
        return {
            ...state
        }
    },
})

export default RelatedCustomerReducer