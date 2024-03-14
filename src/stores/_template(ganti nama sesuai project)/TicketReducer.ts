import { Reducer } from "redux";

import ITicketState from "./models/ITicketState";
import * as TicketActions from "./TicketActions"
import ResultActions from "models/ResultActions";
import baseReducer from "utilities/BaseReducer";
import IAction from "models/IAction";

export const initialState: ITicketState = {
  resultActions: new ResultActions({}),
  refreshPage: false,
  activePage: 1,
  error: false,
};

const TicketReducer: Reducer = baseReducer(initialState, {

  
  [TicketActions.REMOVE_TICKET_RESULT](state: ITicketState, action: IAction<number>): ITicketState {
    return {
      ...state,
      resultActions: new ResultActions({}),
    };
  },

  [TicketActions.SET_PAGE](state: ITicketState, action: IAction<number>): ITicketState {
    return {
      ...state,
      activePage: action.payload!,   
    };
  },
});

export default TicketReducer;