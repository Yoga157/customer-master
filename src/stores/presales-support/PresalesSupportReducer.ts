import IPresalesSupportState from './models/IPresalesSupportState';
import * as PresalesSupportActions from './PresalesSupportActions';
import IAction from '../../models/IAction';
import PresalesSupportModel from './models/PresalesSupportModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IPresalesSupportState = {
  data: [],
  error: false,
};

const presalesSupportReducer: Reducer = baseReducer(initialState, {
  [PresalesSupportActions.REQUEST_PRESALES_FINISHED](state: IPresalesSupportState, action: IAction<PresalesSupportModel[]>): IPresalesSupportState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default presalesSupportReducer;
