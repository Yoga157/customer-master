import IModalThirdLevelState from './models/IModalThirdLevelState';
import * as ModalThirdLevelActions from './ModalThirdLevelActions';
import IAction from 'models/IAction';
import baseReducer from 'utilities/BaseReducer';
import { Reducer } from 'redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';

export const initialState: IModalThirdLevelState = {
  bOpen: false,
  content: '' as any,
  size: ModalSizeEnum.Mini,
  id: '',
};

const modalThirdLevelReducer: Reducer = baseReducer(initialState, {
  [ModalThirdLevelActions.OPEN_MODAL](state: IModalThirdLevelState, action: IAction<IModalThirdLevelState>): IModalThirdLevelState {
    return {
      ...state,
      size: action.payload!.size,
      bOpen: true,
      content: action.payload!.content,
      id: action.payload!.id,
    };
  },
  [ModalThirdLevelActions.CLOSE_MODAL](state: IModalThirdLevelState, action: IAction<boolean>): IModalThirdLevelState {
    const bOpen: boolean = action.payload!;

    return {
      ...state,
      bOpen: bOpen,
    };
  },
});

export default modalThirdLevelReducer;
