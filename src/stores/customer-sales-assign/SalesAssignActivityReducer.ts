import ISalesAssignState from "./models/ISalesAssignState";
import * as SalesActions from "./SalesAssignActivityActions";
import IAction from "models/IAction";
import baseReducer from "../../utilities/BaseReducer";
import { Reducer } from "redux";
import SalesAssignModel from "./models/SalesAssignModel";
import SalesAssignRow from "./models/SalesAssignRow";
import ResultActions from "models/ResultActions";
import SalesNameMode from "./models/SalesNameModel";
import SalesAssignPostModel from "./models/SalesAssignPostModel";
import SalesAssignHistoryModel from "../customer-sales/models/SalesAssignHistoryModel";

export const initialState: ISalesAssignState = {
  data: [new SalesAssignModel({})],
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  salesExistingModel: [new SalesNameMode({})],
  SalesAssignPostModel: new SalesAssignPostModel({}),
  salesHistory: [],
};

const SalesAssignReducer: Reducer = baseReducer(initialState, {
  [SalesActions.REQUEST_SALES_ASSIGN_FISNISHED](
    state: ISalesAssignState,
    action: IAction<SalesAssignModel>
  ): ISalesAssignState {
    return {
      ...state,
      data: [action.payload!],
      error: false,
      refreshPage: false,
    };
  },

  [SalesActions.REQUEST_SALES_BY_NAME_FINISHED](
    state: ISalesAssignState,
    action: IAction<SalesNameMode>
  ): ISalesAssignState {
    return {
      ...state,
      salesExistingModel: [action.payload!],
      error: false,
      refreshPage: false,
    };
  },

  [SalesActions.POST_ASSIGN_SALES_FISNISHED](
    state: ISalesAssignState,
    action: IAction<SalesAssignPostModel>
  ): ISalesAssignState {
    return {
      ...state,
      SalesAssignPostModel: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [SalesActions.PUT_ASSIGN_SALES_FISNISHED](
    state: ISalesAssignState,
    action: IAction<SalesAssignModel>
  ): ISalesAssignState {
    return {
      ...state,
      data: [action.payload!],
      error: false,
      refreshPage: false,
    };
  },
});

export default SalesAssignReducer;
