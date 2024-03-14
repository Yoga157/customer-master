import PSSFirstLastModel from "./PSSFirstLastModel";
import HistoryPSSModels from "./HistoryPSSModels";
import PSSListModel from "./PSSListModel";
import PSSModels from "./PSSModels";

export default interface IPssState {
  error: boolean,
  refreshPage: boolean,
  resultActions: any,
  pssHeader: PSSModels,
  PSSList: PSSListModel,
  firstData: PSSFirstLastModel,
  history: HistoryPSSModels,

}