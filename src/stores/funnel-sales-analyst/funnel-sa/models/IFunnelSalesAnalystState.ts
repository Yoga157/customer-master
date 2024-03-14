import ResultActions from 'models/ResultActions';
import SalesAnalystWorkflowModel from './SalesAnalystWorkflowModel';
import DropdownSalesAdminModel from './DropdownSalesAdminModel';
import CheckUserReopenApprovalModel from './CheckUserReopenApprovalModel';
import GetActivityReqReopenSAModel from './GetActivityReqReopenSAModel';
import GetContractOfDateSAModel from './GetContractOfDateSAModel';

export default interface IFunnelSalesAnalystState {
  readonly dataDropdownSA: DropdownSalesAdminModel[];
  readonly listWorkFlow: SalesAnalystWorkflowModel;
  readonly error: boolean;
  readonly refreshPage: boolean;
  readonly isPresalesWorkflow: boolean;
  readonly isIcEdit: boolean;
  readonly resultActions: ResultActions;
  readonly isApproval: CheckUserReopenApprovalModel;
  readonly contractOfDate: GetContractOfDateSAModel;
  readonly activityReopenList: GetActivityReqReopenSAModel[];
}
