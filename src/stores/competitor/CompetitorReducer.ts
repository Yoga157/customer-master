import ICompetitorState from './models/ICompetitorState';
import * as CompetitorActions from './CompetitorActions';
import IAction from '../../models/IAction';
import CompetitorModel from './models/CompetitorModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: ICompetitorState = {
  data: [],
  error: false,
};

const CompetitorReducer: Reducer = baseReducer(initialState, {
  [CompetitorActions.REQUEST_COMPETITOR_FINISHED](state: ICompetitorState, action: IAction<CompetitorModel[]>): ICompetitorState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default CompetitorReducer;
