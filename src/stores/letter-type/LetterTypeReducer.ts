import ILetterTypeState from './models/ILetterTypeState';
import * as LetterTypeAction from './LetterTypeAction';
import IAction from '../../models/IAction';
import LetterTypeModel from './models/LetterTypeModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: ILetterTypeState = {
  data: [],
  error: false,
};

const letterTypeReducer: Reducer = baseReducer(initialState, {
  [LetterTypeAction.REQUEST_LETTER_TYPE_FINISHED](state: ILetterTypeState, action: IAction<LetterTypeModel[]>): ILetterTypeState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default letterTypeReducer;
