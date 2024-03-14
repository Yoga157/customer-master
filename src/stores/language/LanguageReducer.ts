import ILanguageState from './models/ILanguageState';
import * as LanguageAction from './LanguageAction';
import IAction from '../../models/IAction';
import LanguageModel from './models/LanguageModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: ILanguageState = {
  data: [],
  error: false,
};

const languageReducer: Reducer = baseReducer(initialState, {
  [LanguageAction.REQUEST_LANGUAGE_FINISHED](state: ILanguageState, action: IAction<LanguageModel[]>): ILanguageState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default languageReducer;
