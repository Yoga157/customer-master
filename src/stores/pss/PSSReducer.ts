import { Reducer } from "redux";

import PSSFirstLastModel from "./models/PSSFirstLastModel";
import HistoryPSSModels from "./models/HistoryPSSModels";
import ResultActions from "models/ResultActions";
import PSSListModel from "./models/PSSListModel";
import baseReducer from "utilities/BaseReducer";
import IPssState from "./models/IPssState";
import PSSModels from "./models/PSSModels";
import * as PSSActions from "./PSSActions";
import IAction from "models/IAction";


export const initialState: IPssState = {
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  firstData: new PSSFirstLastModel({}),
  history: new HistoryPSSModels({}),
  PSSList: new PSSListModel({}),
  pssHeader: new PSSModels({}),
};

const PSSReducer: Reducer = baseReducer(initialState,
  {
     [PSSActions.GET_LIST_PSS_FINISHED](state:IPssState, action:IAction<PSSListModel>): IPssState{
      return {
        ...state,
        PSSList:action.payload!,
        error:false,
        refreshPage: false,
      }
    },
     [PSSActions.CREATE_PSS_FINISHED](state:IPssState, action:IAction<ResultActions>): IPssState{
      return {
        ...state,
        resultActions:action.payload!,
        error:false,
        refreshPage: action.error ? false : true,
      }
    },
     [PSSActions.PUT_PSS_FINISHED](state:IPssState, action:IAction<ResultActions>): IPssState{
      return {
        ...state,
        resultActions:action.payload!,
        error:false,
        refreshPage: action.error ? false : true,
      }
    },
     [PSSActions.PUT_PROJECT_ID_FINISHED](state:IPssState, action:IAction<ResultActions>): IPssState{
      return {
        ...state,
        resultActions:action.payload!,
        error:false,
        refreshPage: action.error ? false : true,
      }
    },
     [PSSActions.GET_PSS_LATEST_FINISHED](state:IPssState, action:IAction<PSSFirstLastModel>): IPssState{
      return {
        ...state,
        firstData:action.payload!,
        error:false,
        refreshPage:false
      }
    },
     [PSSActions.PSS_HEADER_FINISHED](state:IPssState, action:IAction<PSSModels>): IPssState{
      return {
        ...state,
        pssHeader:action.payload!,
        error:false,
        refreshPage:false
      }
    },
     [PSSActions.HISTORY_PSS_FINISHED](state:IPssState, action:IAction<HistoryPSSModels>): IPssState{
      return {
        ...state,
        history:action.payload!,
        error:false,
        refreshPage:false
      }
    },
     [PSSActions.CLEAR_RESULT](state:IPssState, action:IAction<ResultActions>): IPssState{
      return {
        ...state,
        resultActions: new ResultActions({}),
        error:false,
        refreshPage:false
      }
    }
  })

export default PSSReducer;