import * as ActionPlanNotesEffects from './ActionPlanNotesEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ActionPlanNotesModel from './models/ActionPlanNotesModel';
import ActionPlanNotesHeaderModel from './models/ActionPlanNotesHeaderModel';
import ActionPlanNotesHistoryModel from './models/ActionPlanNotesHistoryModel';

type ActionUnion = undefined | HttpErrorResponseModel | ActionPlanNotesModel | ActionPlanNotesHistoryModel | ActionPlanNotesHeaderModel;

export const REQUEST_ACTIONPLAN: string = 'ActionPlanNotesActions.REQUEST_ACTIONPLAN';
export const REQUEST_ACTIONPLAN_FINISHED: string = 'ActionPlanNotesActions.REQUEST_ACTIONPLAN_FINISHED';

export const requestActionPlanById = (funnelGenID: number, sourceNotes: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ActionPlanNotesHeaderModel>(
      dispatch,
      REQUEST_ACTIONPLAN,
      ActionPlanNotesEffects.requestActionPlanById,
      funnelGenID,
      sourceNotes
    );
  };
};

export const REQUEST_HISTORY: string = 'ActionPlanNotesActions.REQUEST_HISTORY';
export const REQUEST_HISTORY_FINISHED: string = 'ActionPlanNotesActions.REQUEST_HISTORY_FINISHED';

export const requestHistory = (funnelGenID: number, sourceNotes: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ActionPlanNotesHistoryModel>(
      dispatch,
      REQUEST_HISTORY,
      ActionPlanNotesEffects.requestHistory,
      funnelGenID,
      sourceNotes
    );
  };
};

export const POST_ACTION_PLAN_NOTES: string = 'ActionPlanNotesActions.REQUEST_POST_ACTION_PLAN_NOTES';
export const POST_ACTION_PLAN_NOTES_FINISHED = 'ActionPlanNotesActions.REQUEST_POST_ACTION_PLAN_NOTES_FINISHED';
export const postActionPlanNotes = (data: ActionPlanNotesModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ActionPlanNotesModel>(dispatch, POST_ACTION_PLAN_NOTES, ActionPlanNotesEffects.postActionPlanNotes, data);
  };
};
