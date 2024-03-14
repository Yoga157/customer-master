import ListWorkAttachmentModel from "./ListWorkAttachmentModel";
import WorkActivityReportModel from "./WorkActivityReportModel";
import ActivityReportViewModel from "./ActivityReportViewModel";
import DropdownTextValueModel from "./DropdownTextValueModel";
import ActivityCategoryModel from "./ActivityCategoryModel";
import WorklistHistoryModel from "./WorklistHistoryModel";
import WorkListDetailModel from "./WorkListDetailModel";
import ProductListModel from "./ProductListModel";
import ResultActions from "models/ResultActions";
import WorkListModel from "./WorkListModel";

export default interface IWorkListState {
  readonly listWorkAttachmentAll: ListWorkAttachmentModel;
  readonly drpActivityCategory: ActivityCategoryModel[];
  readonly workActivityReport: WorkActivityReportModel;
  readonly listWorkAttachment: ListWorkAttachmentModel;
  readonly activityReportView: ActivityReportViewModel;
  readonly subBranchByFunnel: DropdownTextValueModel[];
  readonly drpTaskStatus: DropdownTextValueModel[];
  readonly branchByFunnel: DropdownTextValueModel[];
  readonly drpWorkType: DropdownTextValueModel[];
  readonly drpCustomer: DropdownTextValueModel[];
  readonly drpEmployee: DropdownTextValueModel[];
  readonly drpProject: DropdownTextValueModel[];
  readonly productListState: ProductListModel[];
  readonly detailWorkList: WorkListDetailModel;
  readonly productList: ProductListModel[] ;
  readonly history: WorklistHistoryModel[] ;
  readonly resultActions: ResultActions;
  readonly workList: WorkListModel;
  readonly refreshPage: boolean;
  readonly activePage: number;
  readonly isExport: boolean;
  readonly error: boolean;
}
