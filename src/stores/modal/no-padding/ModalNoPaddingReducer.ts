import IModalNoPaddingState from './models/IModalNoPaddingState';
import * as ModalNoPaddingActions from './ModalNoPaddingActions';
import IAction from 'models/IAction';
import baseReducer from 'utilities/BaseReducer';
import { Reducer } from 'redux';
import ModalSizeEnum from 'constants/ModalSizeEnum';

export const initialState: IModalNoPaddingState = {
  bOpen: false,
  content: '' as any,
  size: ModalSizeEnum.Mini,
  closeOnDimmerClick:false,
  id: '',
  url: '',
};

const ModalNoPaddingReducer: Reducer = baseReducer(initialState, {
  [ModalNoPaddingActions.OPEN_MODAL](state: IModalNoPaddingState, action: IAction<IModalNoPaddingState>): IModalNoPaddingState {
    return {
      ...state,
      size: action.payload!.size,
      closeOnDimmerClick: action.payload!.closeOnDimmerClick,
      bOpen: true,
      content: action.payload!.content,
      id: action.payload!.id,
    };
  },
  [ModalNoPaddingActions.CLOSE_MODAL](state: IModalNoPaddingState, action: IAction<boolean>): IModalNoPaddingState {
    const bOpen: boolean = action.payload!;

    return {
      ...state,
      bOpen: bOpen,
    };
  },
  [ModalNoPaddingActions.OPEN_ACTION](state: IModalNoPaddingState, action: IAction<IModalNoPaddingState>): IModalNoPaddingState {
    return {
      ...state,
      size: action.payload!.size,
      closeOnDimmerClick: action.payload!.closeOnDimmerClick,
      bOpen: true,
      content: action.payload!.content,
      id: action.payload!.id,
      url: action.payload!.url,
    };
  },
});

export default ModalNoPaddingReducer;
