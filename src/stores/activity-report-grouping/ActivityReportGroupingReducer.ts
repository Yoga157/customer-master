import * as ActivityReportGroupingActions from './ActivityReportGroupingActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import TableRowModel from '../activity-report-product/models/TableRowModel';
import ResultActions from 'models/ResultActions';
import IActivityReportGroupingState from './models/IActivityReportGroupingState';
import DropdownARGroupingModel from './models/DropdownARGroupingModel';
import SearchResultEnvelope from './models/SearchResult/SearchResultEnvelope';
import ActivityReportGroupingEnvelope from './models/ActivityReportGrouping/ActivityReportGroupingEnvelope';
import ActivityReportGroupingDetailModel from './models/ActivityReportGroupingDetail/ActivityReportGroupingDetailModel';
import RoleFlagARGroupingModel from './models/RoleFlagARGroupingModel';

export const initialState: IActivityReportGroupingState = {
    error: false,
    refreshPage: false,
    resultActions: new ResultActions({}),
    DropdownByOptions: [],
    DropdownContactName: [],
    DropdownCustomerName:[],
    SearchResults: new SearchResultEnvelope({}),
    activityReportGrouping: new ActivityReportGroupingEnvelope({}),
    activityReportGroupingDetail: new ActivityReportGroupingDetailModel({}),
    RoleFlagAR: new RoleFlagARGroupingModel({})
};

const ActivityReportGroupingReducer: Reducer = baseReducer(initialState, {
    [ActivityReportGroupingActions.REQUEST_DROPDOWN_BY_OPTION_FINISHED](state: IActivityReportGroupingState, action: IAction<DropdownARGroupingModel[]>): IActivityReportGroupingState {
        return {
          ...state,
          DropdownByOptions: action.payload!,
          error: action.error!,
          refreshPage: false,
        };
      },

    [ActivityReportGroupingActions.REQUEST_SEARCH_BY_OPTIONS_FINISHED](state: IActivityReportGroupingState, action: IAction<SearchResultEnvelope>): IActivityReportGroupingState {
    return {
        ...state,
        error: action.error!,
        refreshPage: action.error ? false : true,
        SearchResults: action.payload!,
    };
    },

    [ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_FINISHED](state: IActivityReportGroupingState, action: IAction<ActivityReportGroupingEnvelope>): IActivityReportGroupingState {
      return {
          ...state,
          error: action.error!,
          refreshPage: action.error ? false : true,
          activityReportGrouping: action.payload!,
      };
      },

    [ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_FILTER_FINISHED](state: IActivityReportGroupingState, action: IAction<ActivityReportGroupingEnvelope>): IActivityReportGroupingState {
      return {
          ...state,
          error: action.error!,
          refreshPage: action.error ? false : true,
          activityReportGrouping: action.payload!,
      };
      },

      [ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_POST_FINISHED](state: IActivityReportGroupingState, action: IAction<ResultActions>): IActivityReportGroupingState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            resultActions: action.payload!,
        };
        },

        [ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_PUT_FINISHED](state: IActivityReportGroupingState, action: IAction<ResultActions>): IActivityReportGroupingState {
          return {
              ...state,
              error: action.error!,
              refreshPage: action.error ? false : true,
              resultActions: action.payload!,
          };
          },

      [ActivityReportGroupingActions.REQUEST_DROPDOWN_CONTACT_NAME_FINISHED](state: IActivityReportGroupingState, action: IAction<DropdownARGroupingModel[]>): IActivityReportGroupingState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            DropdownContactName: action.payload!,
        };
        },
        [ActivityReportGroupingActions.REQUEST_DROPDOWN_CUSTOMER_NAME_FINISHED](state: IActivityReportGroupingState, action: IAction<DropdownARGroupingModel[]>): IActivityReportGroupingState {
          return {
              ...state,
              error: action.error!,
              refreshPage: action.error ? false : true,
              DropdownCustomerName: action.payload!,
          };
          },
      [ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_DETAIL_FINISHED](state: IActivityReportGroupingState, action: IAction<ActivityReportGroupingDetailModel>): IActivityReportGroupingState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            activityReportGroupingDetail: action.payload!,
        };
        },

      [ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_DELETE_FINISHED](state: IActivityReportGroupingState, action: IAction<ResultActions>): IActivityReportGroupingState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            resultActions: action.payload!,
        };
        },
      [ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_ROLE_FLAG_FINISHED](state: IActivityReportGroupingState, action: IAction<RoleFlagARGroupingModel>): IActivityReportGroupingState {
        return {
            ...state,
            error: action.error!,
            refreshPage: action.error ? false : true,
            RoleFlagAR: action.payload!,
        };
        },
});

export default ActivityReportGroupingReducer;