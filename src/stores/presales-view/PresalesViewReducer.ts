import IPresalesViewState from './models/IPresalesViewState';
import * as PresalesViewAction from './PresalesViewAction';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import PresalesViewResult from './models/PresalesViewResult';

export const initialState: IPresalesViewState = {
  data: [],
  error: false,
  refreshPage: false,
};

const presalesViewReducer: Reducer = baseReducer(initialState, {
  [PresalesViewAction.REQUEST_PRESALES_VIEW_FINISHED](state: IPresalesViewState, action: IAction<PresalesViewResult[]>): IPresalesViewState {
    return {
      ...state,
      error: action.error!,
      data: action.payload!,
      refreshPage: action.error ? false : true,
    };
  },
});

export default presalesViewReducer;
