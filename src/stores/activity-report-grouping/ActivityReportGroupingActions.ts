import * as ActivityReportGroupingEffects from "./ActivityReportGroupingEffects";
import HttpErrorResponseModel from "models/HttpErrorResponseModel";
import * as ActionUtility from "utilities/ActionUtility";
import { ReduxDispatch } from "models/ReduxProps";
import IStore from "models/IStore";
import ResultActions from "models/ResultActions";
import DropdownARGroupingModel from "./models/DropdownARGroupingModel";
import SearchByOptionsModel from "./models/SearchByOptionsModel";
import SearchResultEnvelope from "./models/SearchResult/SearchResultEnvelope";
import ActivityReportGroupingEnvelope from "./models/ActivityReportGrouping/ActivityReportGroupingEnvelope";
import ActivityReportGroupingPostModel from "./models/ActivityReportGroupingPostModel";
import ActivityReportGroupingPutModel from "./models/ActivityReportGroupingPutModel";
import ActivityReportGroupingFilter from "./models/ActivityReportGroupingFilter";
import ActivityReportGroupingDetailModel from "./models/ActivityReportGroupingDetail/ActivityReportGroupingDetailModel";
import RoleFlagARGroupingModel from "./models/RoleFlagARGroupingModel";

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | ResultActions
  | DropdownARGroupingModel
  | SearchByOptionsModel
  | SearchResultEnvelope
  | ActivityReportGroupingEnvelope
  | ActivityReportGroupingPostModel
  | ActivityReportGroupingPutModel
  | ActivityReportGroupingFilter
  | ActivityReportGroupingDetailModel
  | RoleFlagARGroupingModel;

// ============================================================================
export const REQUEST_ACITIVITY_REPORT_GROUPING: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING";
export const REQUEST_ACITIVITY_REPORT_GROUPING_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_FINISHED";

export const RequestActivityReportGrouping = (
  page: number,
  pageSize: number,
  column: string,
  sorting: string,
  userLoginId: number
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ActivityReportGroupingEnvelope>(
      dispatch,
      REQUEST_ACITIVITY_REPORT_GROUPING,
      ActivityReportGroupingEffects.RequestActivityReportGrouping,
      page,
      pageSize,
      column,
      sorting,
      userLoginId
    );
  };
};

// ============================================================================
export const REQUEST_ACITIVITY_REPORT_GROUPING_SEARCH: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_SEARCH";
export const REQUEST_ACITIVITY_REPORT_GROUPING_SEARCH_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_SEARCH_FINISHED";

export const RequestActivityReportGroupingSearch = (
  page: number,
  pageSize: number,
  column: string,
  sorting: string,
  search: string,
  userLoginId: number
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ActivityReportGroupingEnvelope>(
      dispatch,
      REQUEST_ACITIVITY_REPORT_GROUPING,
      ActivityReportGroupingEffects.RequestActivityReportGroupingSearch,
      page,
      pageSize,
      column,
      sorting,
      search,
      userLoginId
    );
  };
};
// ============================================================================
export const REQUEST_ACITIVITY_REPORT_GROUPING_FILTER: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_FILTER";
export const REQUEST_ACITIVITY_REPORT_GROUPING_FILTER_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_FILTER_FINISHED";

export const RequestActivityReportGroupingFilter = (
  data: ActivityReportGroupingFilter
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ActivityReportGroupingEnvelope>(
      dispatch,
      REQUEST_ACITIVITY_REPORT_GROUPING,
      ActivityReportGroupingEffects.RequestActivityReportGroupingFilter,
      data
    );
  };
};
// ============================================================================
export const REQUEST_DROPDOWN_BY_OPTION: string =
  "ActivityReportGroupingActions.REQUEST_DROPDOWN_BY_OPTION";
export const REQUEST_DROPDOWN_BY_OPTION_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_DROPDOWN_BY_OPTION_FINISHED";

export const requestDropdownByOptions = (): any => {
  return async (
    dispatch: ReduxDispatch<ActionUnion>,
    getState: () => IStore
  ): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownARGroupingModel>(
      dispatch,
      REQUEST_DROPDOWN_BY_OPTION,
      ActivityReportGroupingEffects.requestDropdownByOptions
    );
  };
};
// ============================================================================
export const REQUEST_SEARCH_BY_OPTIONS: string =
  "ActivityReportGroupingActions.REQUEST_SEARCH_BY_OPTIONS";
export const REQUEST_SEARCH_BY_OPTIONS_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_SEARCH_BY_OPTIONS_FINISHED";

export const RequestSearchByOptions = (data: SearchByOptionsModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SearchResultEnvelope>(
      dispatch,
      REQUEST_SEARCH_BY_OPTIONS,
      ActivityReportGroupingEffects.RequestSearchByOptions,
      data
    );
  };
};
// ============================================================================
export const REQUEST_ACITIVITY_REPORT_GROUPING_POST: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_POST";
export const REQUEST_ACITIVITY_REPORT_GROUPING_POST_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_POST_FINISHED";

export const RequestActivityReportGroupPost = (
  data: ActivityReportGroupingPostModel
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_ACITIVITY_REPORT_GROUPING_POST,
      ActivityReportGroupingEffects.RequestActivityReportGroupPost,
      data
    );
  };
};
// ============================================================================
export const REQUEST_ACITIVITY_REPORT_GROUPING_PUT: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_PUT";
export const REQUEST_ACITIVITY_REPORT_GROUPING_PUT_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_PUT_FINISHED";

export const RequestActivityReportGroupPut = (
  data: ActivityReportGroupingPutModel
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_ACITIVITY_REPORT_GROUPING_PUT,
      ActivityReportGroupingEffects.RequestActivityReportGroupPut,
      data
    );
  };
};
// ============================================================================
export const REQUEST_DROPDOWN_CONTACT_NAME: string =
  "ActivityReportGroupingActions.REQUEST_DROPDOWN_CONTACT_NAME";
export const REQUEST_DROPDOWN_CONTACT_NAME_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_DROPDOWN_CONTACT_NAME_FINISHED";

export const requestDropdownContactName = (userLoginId: number): any => {
  return async (
    dispatch: ReduxDispatch<ActionUnion>,
    getState: () => IStore
  ): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownARGroupingModel>(
      dispatch,
      REQUEST_DROPDOWN_CONTACT_NAME,
      ActivityReportGroupingEffects.requestDropdownContactName,
      userLoginId
    );
  };
};
// ============================================================================
export const REQUEST_DROPDOWN_CUSTOMER_NAME: string =
  "ActivityReportGroupingActions.REQUEST_DROPDOWN_CUSTOMER_NAME";
export const REQUEST_DROPDOWN_CUSTOMER_NAME_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_DROPDOWN_CUSTOMER_NAME_FINISHED";

export const requestDropdownCustomerName = (userLoginId: number): any => {
  return async (
    dispatch: ReduxDispatch<ActionUnion>,
    getState: () => IStore
  ): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownARGroupingModel>(
      dispatch,
      REQUEST_DROPDOWN_CUSTOMER_NAME,
      ActivityReportGroupingEffects.requestDropdownCustomerName,
      userLoginId
    );
  };
};
// ============================================================================
export const REQUEST_ACITIVITY_REPORT_GROUPING_DETAIL: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_DETAIL";
export const REQUEST_ACITIVITY_REPORT_GROUPING_DETAIL_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_DETAIL_FINISHED";

export const RequestActivityReportGroupingDetail = (
  activityReportGroupGenId: number
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ActivityReportGroupingDetailModel>(
      dispatch,
      REQUEST_ACITIVITY_REPORT_GROUPING_DETAIL,
      ActivityReportGroupingEffects.RequestActivityReportGroupingDetail,
      activityReportGroupGenId
    );
  };
};
// ============================================================================
export const REQUEST_ACITIVITY_REPORT_GROUPING_DELETE: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_DELETE";
export const REQUEST_ACITIVITY_REPORT_GROUPING_DELETE_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_DELETE_FINISHED";

export const RequestActivityReportGroupingDelete = (
  activityReportGroupGenId: number,
  userLoginId: number
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_ACITIVITY_REPORT_GROUPING_DELETE,
      ActivityReportGroupingEffects.RequestActivityReportGroupingDelete,
      activityReportGroupGenId,
      userLoginId
    );
  };
};
// ============================================================================
export const REQUEST_ACITIVITY_REPORT_GROUPING_ROLE_FLAG: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_ROLE_FLAG";
export const REQUEST_ACITIVITY_REPORT_GROUPING_ROLE_FLAG_FINISHED: string =
  "ActivityReportGroupingActions.REQUEST_ACITIVITY_REPORT_GROUPING_ROLE_FLAG_FINISHED";

export const RequestActivityReportGroupingRoleFlag = (
  userLoginId: number
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<RoleFlagARGroupingModel>(
      dispatch,
      REQUEST_ACITIVITY_REPORT_GROUPING_ROLE_FLAG,
      ActivityReportGroupingEffects.RequestActivityReportGroupingRoleFlag,
      userLoginId
    );
  };
};
