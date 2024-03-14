import * as ActionUtility from '../../utilities/ActionUtility';
import IAction from '../../models/IAction';
import ISidebarContainerState from './models/ISidebarContainerState';
import { v4 as uuidv4 } from 'uuid';

export const OPEN_SIDEBAR: string = 'SidebarContainerAction.OPEN_SIDEBAR';

export const OPEN = (content: any): IAction<ISidebarContainerState> => {
  return ActionUtility.createAction(OPEN_SIDEBAR, {
    bOpen: true,
    content,
    id: uuidv4(),
  });
};

export const CLOSE_SIDEBAR: string = 'SidebarContainerAction.CLOSE_SIDEBAR';

export const CLOSE = (): IAction<boolean> => {
  return ActionUtility.createAction(CLOSE_SIDEBAR, false);
};
