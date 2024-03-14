import { Reducer } from 'redux';
import IAction from '../../models/IAction';
import ResultActions from "models/ResultActions";
import IActivityReportCustomerSignatureState from "./models/IActivityReportCustomerSignatureState";
import baseReducer from '../../utilities/BaseReducer';
import * as ActivityReportCustomerSignatureActions from './ActivityReportCustomerSignatureActions';
import ActivityReportViewCustomerSignature from 'stores/activity-report/models/view-edit/ActivityReportViewCustomerSignature';

export const initialState: IActivityReportCustomerSignatureState = {
    error: false,
    refreshPage: false,
    resultActions: new ResultActions({}),
    data: new ActivityReportViewCustomerSignature({}),
};

const ActivityReportCustomerSignatureReducers: Reducer = baseReducer(initialState, {
    [ActivityReportCustomerSignatureActions.REQUEST_VIEW_CUSTOMER_SIGNATURE_FINISHED](
        state: IActivityReportCustomerSignatureState,
        action: IAction<ActivityReportViewCustomerSignature>
    ): IActivityReportCustomerSignatureState {
        return {
            ...state,
            data: action.payload!,
            error: false,
            refreshPage: false,
        };
    },
});

export default ActivityReportCustomerSignatureReducers;