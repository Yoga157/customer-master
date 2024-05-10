import ResultActions from "models/ResultActions";
import CustomerMasterModel from "./CustomerMasterModel";
import CustomerMasterPostModel from "./CustomerMasterPostModel";

export default interface ICustomerMasterState {
  readonly data: CustomerMasterModel;
  readonly activePage: number;
  readonly activeTabs: number;
  readonly customerNewByGenId: ResultActions;
  readonly customerMoreDetails: ResultActions;
  readonly industryClass: ResultActions;
  isSuccess: boolean;
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
