import ICoverageHourState from './models/ICoverageHourState';
import * as CoverageHourActions from './CoverageHourAction';
import IAction from '../../models/IAction';
import CoverageHourModel from './models/CoverageHourModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: ICoverageHourState = {
  data: [],
  error: false,
};

const CoverageHourReducer: Reducer = baseReducer(initialState, {
  [CoverageHourActions.REQUEST_COVERAGE_HOUR_FINISHED](state: ICoverageHourState, action: IAction<CoverageHourModel[]>): ICoverageHourState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default CoverageHourReducer;
