import * as ActionUtility from "utilities/ActionUtility";
import IAction from 'models/IAction';

export const OPEN_WORKFLOW: string = 'ButtonToggleActions.OPEN_WORKFLOW'

export const OPEN = (): IAction<boolean> => {
  return ActionUtility.createAction(OPEN_WORKFLOW, true);
};


export const CLOSE_WORKFLOW: string = 'ButtonToggleActions.CLOSE_WORKFLOW';

export const CLOSE = (): IAction<boolean> => {
  return ActionUtility.createAction(CLOSE_WORKFLOW, false);
};