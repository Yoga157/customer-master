import ResultActions from "models/ResultActions";
import CustomerMasterModel from "./CustomerMasterModel";

export default interface ICustomerMasterState {
  readonly data: CustomerMasterModel;
  readonly activePage: number;
  readonly activeTabs: number;
  isSuccess: boolean;
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
