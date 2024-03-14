import IModalSecondLevelState from './models/IModalSecondLevelState';
import * as ModalSecondLevelAction from './ModalSecondLevelActions';
import IAction from 'models/IAction';
import baseReducer from 'utilities/BaseReducer';
import { Reducer } from 'redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';

export const initialState: IModalSecondLevelState = {
  bOpen: false,
  content: '' as any,
  size: ModalSizeEnum.Mini,
  id: '',
};

const modalSecondLevelReducer: Reducer = baseReducer(initialState, {
  [ModalSecondLevelAction.OPEN_MODAL](state: IModalSecondLevelState, action: IAction<IModalSecondLevelState>): IModalSecondLevelState {
    return {
      ...state,
      bOpen: true,
      size: action.payload!.size,
      content: action.payload!.content,
      id: action.payload!.id,
    };
  },

  [ModalSecondLevelAction.CLOSE_MODAL](state: IModalSecondLevelState, action: IAction<boolean>): IModalSecondLevelState {
    const bOpen: boolean = action.payload!;

    return {
      ...state,
      bOpen: bOpen,
    };
  },
});

export default modalSecondLevelReducer;
