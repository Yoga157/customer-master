import ICompetitorState from './models/ICompetitorProductState';
import * as CompetitorProductActions from './CompetitorProductActions';
import IAction from '../../models/IAction';
import CompetitorProductModel from './models/CompetitorProductModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: ICompetitorState = {
  data: [],
  dataService: [],
  error: false,
};

const CompetitorProductReducer: Reducer = baseReducer(initialState, {
  [CompetitorProductActions.REQUEST_COMPETITOR_PRODUCT_FINISHED](
    state: ICompetitorState,
    action: IAction<CompetitorProductModel[]>
  ): ICompetitorState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },

  [CompetitorProductActions.REQUEST_COMPETITOR_SERVICE_FINISHED](
    state: ICompetitorState,
    action: IAction<CompetitorProductModel[]>
  ): ICompetitorState {
    return {
      ...state,
      dataService: action.payload!,
      error: action.error!,
    };
  },
});

export default CompetitorProductReducer;
