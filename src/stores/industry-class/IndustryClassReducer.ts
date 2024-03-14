import IIndustryClassState from './models/IIndustryClassState';
import * as IndustryClassAction from './IndustryClassActions';
import IAction from '../../models/IAction';
import IndustryClassModel from './models/IndustryClassModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IIndustryClassState = {
  data: [],
  error: false,
};

const industryClassReducer: Reducer = baseReducer(initialState, {
  [IndustryClassAction.REQUEST_INDUSTRY_FINISHED](state: IIndustryClassState, action: IAction<IndustryClassModel[]>): IIndustryClassState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default industryClassReducer;
