import { Reducer } from 'redux';
import IAction from '../../models/IAction';
import ResultActions from "models/ResultActions";
import ActivityReportViewEditTotalCustomerExperience from "stores/activity-report/models/view-edit/ActivityReportViewEditTotalCustomerExperience";
import IActivityReportTotalCustomerExperienceState from "./models/IActivityReportTotalCustomerExperienceState";
import baseReducer from '../../utilities/BaseReducer';
import * as ActivityReportTotalCustomerExperienceActions from './ActivityReportTotalCustomerExperienceActions';

export const initialState: IActivityReportTotalCustomerExperienceState = {
    error: false,
    refreshPage: false,
    resultActions: new ResultActions({}),
    data: new ActivityReportViewEditTotalCustomerExperience({}),
};

const ActivityReportTotalCustomerExperienceReducers: Reducer = baseReducer(initialState, {
    [ActivityReportTotalCustomerExperienceActions.REQUEST_VIEW_TOTAL_CUSTOMER_EXPERIENCE_FINISHED](
        state: IActivityReportTotalCustomerExperienceState,
        action: IAction<ActivityReportViewEditTotalCustomerExperience>
    ): IActivityReportTotalCustomerExperienceState {
        return {
            ...state,
            data: action.payload!,
            error: false,
            refreshPage: false,
        };
    },
    [ActivityReportTotalCustomerExperienceActions.REQUEST_UPDATE_TOTAL_CUSTOMER_EXPERIENCE_FINISHED](
        state: IActivityReportTotalCustomerExperienceState,
        action: IAction<ResultActions>
    ): IActivityReportTotalCustomerExperienceState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            resultActions: action.payload!,
        };
    },
});

export default ActivityReportTotalCustomerExperienceReducers;