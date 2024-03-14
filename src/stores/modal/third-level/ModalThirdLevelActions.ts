import * as ActionUtility from 'utilities/ActionUtility';
import IAction from 'models/IAction';
import ModalSizeEnum from 'constants/ModalSizeEnum';
import IModalThirdLevelState from './models/IModalThirdLevelState';
import { v4 as uuidv4 } from 'uuid';

export const OPEN_MODAL: string = 'ModalThirdLevelActions.OPEN_MODAL';

export const OPEN = (content: any, size: ModalSizeEnum): IAction<IModalThirdLevelState> => {
  return ActionUtility.createAction(OPEN_MODAL, {
    bOpen: true,
    content,
    size,
    id: uuidv4(),
  });
};

export const CLOSE_MODAL: string = 'ModalThirdLevelActions.CLOSE_MODAL';

export const CLOSE = (): IAction<boolean> => {
  return ActionUtility.createAction(CLOSE_MODAL, false);
};
