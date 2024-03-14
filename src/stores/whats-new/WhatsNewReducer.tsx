import IWhatsNewState from './models/IWhatsNewState';
import * as WhatsNewAction from './WhatsNewAction';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ResultActions from 'models/ResultActions';

export const initialState: IWhatsNewState = {
  resultActions: new ResultActions({}),
};

const whatsNewReducer: Reducer = baseReducer(initialState, {
  [WhatsNewAction.REQUEST_WHATS_NEW_NAVBAR_FINISHED](state: IWhatsNewState, action: IAction<ResultActions>): IWhatsNewState {
    return {
      ...state,
      resultActions: action.payload!,
    };
  },
});

export default whatsNewReducer;
