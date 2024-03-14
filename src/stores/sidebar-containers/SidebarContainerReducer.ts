import ISidebarContainerState from './models/ISidebarContainerState';
import * as SidebarContainerAction from './SidebarContainerActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: ISidebarContainerState = {
  bOpen: false,
  content: '' as any,
  id: '',
};

const sidebarContainerReducer: Reducer = baseReducer(initialState, {
  [SidebarContainerAction.OPEN_SIDEBAR](state: ISidebarContainerState, action: IAction<ISidebarContainerState>): ISidebarContainerState {
    return {
      ...state,
      bOpen: true,
      content: action.payload!.content,
      id: action.payload!.id,
    };
  },
  [SidebarContainerAction.CLOSE_SIDEBAR](state: ISidebarContainerState, action: IAction<boolean>): ISidebarContainerState {
    const bOpen: boolean = action.payload!;

    return {
      ...state,
      bOpen: bOpen,
    };
  },
});

export default sidebarContainerReducer;
