import * as ActionUtility from 'utilities/ActionUtility';
import IAction from 'models/IAction';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import IModalNoPaddingState from './models/IModalNoPaddingState';
import { v4 as uuidv4 } from 'uuid';

export const OPEN_MODAL: string = 'ModalNoPaddingActions.OPEN_MODAL';

export const OPEN = (content: any, size: ModalSizeEnum, closeOnDimmerClick? : boolean): IAction<IModalNoPaddingState> => {
  return ActionUtility.createAction(OPEN_MODAL, {
    bOpen: true,
    content,
    size,
    closeOnDimmerClick,
    id: uuidv4(),
    url: ''
  });
};

export const CLOSE_MODAL: string = 'ModalNoPaddingActions.CLOSE_MODAL';

export const CLOSE = (): IAction<boolean> => {
  return ActionUtility.createAction(CLOSE_MODAL, false);
};

export const OPEN_ACTION: string = 'ModalNoPaddingActions.OPEN_ACTION';

export const OPENACTION = (content: any, size: ModalSizeEnum, url: any, closeOnDimmerClick?: boolean): IAction<IModalNoPaddingState> => {
  return ActionUtility.createAction(OPEN_ACTION, {
    bOpen: true,
    content: content,
    size,
    closeOnDimmerClick,
    id: uuidv4(),
    url: url
  });
};
