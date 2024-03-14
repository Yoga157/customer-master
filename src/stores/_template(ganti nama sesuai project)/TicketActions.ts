

import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import ResultActions from 'models/ResultActions';
import IAction from 'models/IAction';

type ActionUnion =
  | HttpErrorResponseModel
  | ResultActions
  | undefined
  | boolean
  | boolean
  | any


export const REMOVE_TICKET_RESULT:string ='TicketActions.REMOVE_TICKET_RESULT';
export const removeResult = (): IAction<number> => {
  return ActionUtility.createAction(REMOVE_TICKET_RESULT);
};

export const SET_PAGE: string = 'TicketActions.SET_PAGE';
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};