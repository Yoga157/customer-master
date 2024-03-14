import baseReducer from '../../utilities/BaseReducer';
import ResultActions from 'models/ResultActions';
import IAction from '../../models/IAction';
import { Reducer } from 'redux';
import IDelegationState from './models/IDelegationState';

import * as DelegationActions from './DelegationActions'
import ListDelegationModel from './models/ListDelegationModel';
import ListAplicationModel from './models/ListAplicationModel';
import DelegationModel from './models/DelegationModel';

export const initialState: IDelegationState = {
  listData: new ListDelegationModel({}),
  resultActions: new ResultActions({}),
  firstData: new DelegationModel({}),
  refreshPage: false,
  application: [],
  error: false,
};

const DelegationReducer: Reducer = baseReducer(initialState, {
 [DelegationActions.REQUEST_DELEGATION_FINISHED](state: IDelegationState, action: IAction<ListDelegationModel>): IDelegationState {
    return {
      ...state,
      listData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  
  [DelegationActions.REQUEST_POST_DELEGATION_FINISHED](
    state: IDelegationState,
    action: IAction<ResultActions>
    ): IDelegationState {
      return {
        ...state,
        resultActions: action.payload!,
        refreshPage: action.error ? false : true,
        error: action.error!,
      };
    },
  
  [DelegationActions.REQUEST_PUT_DELEGATION_FINISHED](
    state: IDelegationState,
    action: IAction<ResultActions>
    ): IDelegationState {
      return {
        ...state,
        resultActions: action.payload!,
        refreshPage: action.error ? false : true,
        error: action.error!,
      };
    },
  
  [DelegationActions.REQUEST_DELEGATION_BY_ID_FINISHED](
    state: IDelegationState,
    action: IAction<DelegationModel>
    ): IDelegationState {
      return {
        ...state,
        firstData: action.payload!,
        error: action.error!,
      };
    },

  [DelegationActions.REQUEST_DELETE_DELEGATIONBY_ID_FINISHED](
    state: IDelegationState,
    action: IAction<ResultActions>
    ): IDelegationState {
      return {
        ...state,
        resultActions: action.payload!,
        refreshPage: action.error ? false : true,
        error: action.error!,
      };
    },
    
    
    [DelegationActions.REQUEST_APPLICATION_FINISHED](state: IDelegationState, action: IAction<ListAplicationModel[]>): IDelegationState {
       return {
         ...state,
         application: action.payload!,
         error: false,
         refreshPage: false,
       };
     },

      [DelegationActions.REMOVE_ATTACHMENT_RESULT_FINISHED](state:IDelegationState,
      action:IAction<ResultActions>):IDelegationState{
      return {
        ...state,
        resultActions: action.payload!,
        error:action.error!,
        refreshPage:(action.error) ? false : true    
      }
    },
});

export default DelegationReducer;