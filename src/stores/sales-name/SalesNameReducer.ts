import IAction from "../../models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import ResultActions from "models/ResultActions";
import ISalesNameState from './models/ISalesNameState';
import SalesNameModel from './models/SalesNameModel';
import * as SalesNameAction from './SalesNameActions';

export const initialState: ISalesNameState = {
    data: [new SalesNameModel({})],
};

const salesNameReducer: Reducer = baseReducer(initialState, {
    [SalesNameAction.REQUEST_SEARCH_SALES_NAME_FINISHED](
        state: ISalesNameState,
        action: IAction<SalesNameModel>
    ): ISalesNameState {
        return {
            ...state,
            data: [action.payload!]
        }
    }
})

export default salesNameReducer;

// const funnelReducer: Reducer = baseReducer(initialState, {
//     [FunnelActions.REQUEST_FUNNELS_OPPORTUNITY_FINISHED](
//       state: IFunnelState,
//       action: IAction<FunnelOpportunityModel>
//     ): IFunnelState {
//       return {
//         ...state,
//         data: action.payload!,
//         error: false,
//         refreshPage: false,
//       };
//     },