import { Reducer } from 'redux';
import IAction from '../../models/IAction';
import ResultActions from "models/ResultActions";
import ActivityReportViewEditTicketInformation from "stores/activity-report/models/view-edit/ActivityReportViewEditTicketInformation";
import IActivityReportTicketInformationState from "./models/IActivityReportTicketInformationState";
import baseReducer from '../../utilities/BaseReducer';
import * as ActivityReportTicketInformationActions from './ActivityReportTicketInformationActions';

export const initialState: IActivityReportTicketInformationState = {
    error: false,
    refreshPage: false,
    resultActions: new ResultActions({}),
    data: new ActivityReportViewEditTicketInformation({}),
};

const ActivityReportTicketInformationReducers: Reducer = baseReducer(initialState, {
    [ActivityReportTicketInformationActions.REQUEST_VIEW_TICKET_INFORMATION_FINISHED](
        state: IActivityReportTicketInformationState,
        action: IAction<ActivityReportViewEditTicketInformation>
    ): IActivityReportTicketInformationState {
        return {
            ...state, 
            data: action.payload!,
            error: false,
            refreshPage: false
        };
    },
    [ActivityReportTicketInformationActions.REQUEST_UPDATE_TICKET_INFORMATION_FINISHED](
        state: IActivityReportTicketInformationState,
        action: IAction<ResultActions>
    ): IActivityReportTicketInformationState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            resultActions: action.payload!,
        };
    },
});

export default ActivityReportTicketInformationReducers;