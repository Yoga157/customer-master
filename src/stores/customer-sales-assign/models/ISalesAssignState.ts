import SalesAssignModel from "./SalesAssignModel";
import SalesNameModel from "./SalesNameModel";
import SalesAssignPostModel from "./SalesAssignPostModel";
import SalesAssignHistoryModel from "../../customer-sales/models/SalesAssignHistoryModel";

export default interface ISalesAssignState {
  readonly data: SalesAssignModel[];
  readonly salesExistingModel: SalesNameModel[];
  readonly SalesAssignPostModel: SalesAssignPostModel;
  readonly salesHistory: SalesAssignHistoryModel[];
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
