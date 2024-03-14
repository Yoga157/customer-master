import ResultActions from "models/ResultActions";
import DropdownARGroupingModel from "./DropdownARGroupingModel";
import SearchResultEnvelope from "./SearchResult/SearchResultEnvelope";
import ActivityReportGroupingEnvelope from "./ActivityReportGrouping/ActivityReportGroupingEnvelope";
import ActivityReportGroupingDetailModel from "./ActivityReportGroupingDetail/ActivityReportGroupingDetailModel";
import RoleFlagARGroupingModel from "./RoleFlagARGroupingModel";

export default interface IActivityReportGroupingState {
    readonly error: boolean;
    readonly refreshPage: boolean;
    readonly resultActions: ResultActions;
    readonly DropdownByOptions: DropdownARGroupingModel[];
    readonly DropdownContactName: DropdownARGroupingModel[];
    readonly DropdownCustomerName: DropdownARGroupingModel[];
    readonly SearchResults: SearchResultEnvelope;
    readonly activityReportGrouping: ActivityReportGroupingEnvelope;
    readonly activityReportGroupingDetail: ActivityReportGroupingDetailModel;
    readonly RoleFlagAR: RoleFlagARGroupingModel;
};
  