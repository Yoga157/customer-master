import { Reducer } from 'redux';
import IAction from '../../models/IAction';
import ResultActions from "models/ResultActions";
import ActivityReportViewEditActivityInformation from "stores/activity-report/models/view-edit/ActivityReportViewEditActivityInformation";
import IActivityReportActivityInformationState from "./models/IActivityReportActivityInformationState";
import baseReducer from '../../utilities/BaseReducer';
import * as ActivityReportActivityInformationActionsActions from './ActivityReportActivityInformationActions';

export const initialState: IActivityReportActivityInformationState = {
    error: false,
    refreshPage: false,
    resultActions: new ResultActions({}),
    data: new ActivityReportViewEditActivityInformation({}),
};

const ActivityReportActivityInformationReducers: Reducer = baseReducer(initialState, {
    [ActivityReportActivityInformationActionsActions.REQUEST_VIEW_ACTIVITY_INFORMATION_FINISHED](
        state: IActivityReportActivityInformationState,
        action: IAction<ActivityReportViewEditActivityInformation>
    ): IActivityReportActivityInformationState {
        return {
            ...state,
            data: action.payload!,
            error: false,
            refreshPage: false,
        }
    },
    [ActivityReportActivityInformationActionsActions.REQUEST_UPDATE_ACTIVITY_INFORMATION_FINISHED](
        state: IActivityReportActivityInformationState,
        action: IAction<ResultActions>
    ): IActivityReportActivityInformationState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            resultActions: action.payload!,
        };
    },
});

export default ActivityReportActivityInformationReducers;