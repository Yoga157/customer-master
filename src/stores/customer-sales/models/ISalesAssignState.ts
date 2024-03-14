import SalesAssignModel from "./SalesAssignModel";
import SalesNameModel from "./SalesNameModel";
import SalesAssignPostModel from "./SalesAssignPostModel";
import SalesAssignHistoryModel from "./SalesAssignHistoryModel";
import ResultActions from "models/ResultActions";

export default interface ISalesAssignState {
  readonly sales: ResultActions;
  readonly data: SalesAssignModel;
  readonly salesExstingModel: SalesNameModel;
  readonly SalesAssignPostModel: SalesAssignPostModel;
  readonly salesHistory: ResultActions;
  readonly accountOwner: ResultActions;
  error: boolean;
  refreshPage: boolean;
  resultActions: any;
}
