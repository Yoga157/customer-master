import IActionPlaNotesState from './models/IActionPlaNotesState';
import * as ActionPlanNotesActions from './ActionPlanNotesActions';
import IAction from '../../models/IAction';
import ActionPlanNotesModel from './models/ActionPlanNotesModel';
import ActionPlanNotesHeaderModel from './models/ActionPlanNotesHeaderModel';
import ActionPlanNotesHistoryModel from './models/ActionPlanNotesHistoryModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IActionPlaNotesState = {
  data: [],
  history: [],
  firstData: new ActionPlanNotesHeaderModel({}),
  error: false,
  refreshPage: false,
};

const actionPlanNotesReducer: Reducer = baseReducer(initialState, {
  [ActionPlanNotesActions.REQUEST_HISTORY_FINISHED](
    state: IActionPlaNotesState,
    action: IAction<ActionPlanNotesHistoryModel[]>
  ): IActionPlaNotesState {
    return {
      ...state,
      history: action.payload!,
      refreshPage: false,
    };
  },
  [ActionPlanNotesActions.REQUEST_ACTIONPLAN_FINISHED](
    state: IActionPlaNotesState,
    action: IAction<ActionPlanNotesHeaderModel>
  ): IActionPlaNotesState {
    return {
      ...state,
      firstData: action.payload!,
      refreshPage: false,
    };
  },
  [ActionPlanNotesActions.POST_ACTION_PLAN_NOTES_FINISHED](state: IActionPlaNotesState, action: IAction<ActionPlanNotesModel>): IActionPlaNotesState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
});

export default actionPlanNotesReducer;
