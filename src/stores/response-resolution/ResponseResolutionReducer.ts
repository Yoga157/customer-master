import IResponseResolutionState from './models/IResponseResolutionState';
import * as ResponseResolutionAction from './ResponseResolutionAction';
import IAction from '../../models/IAction';
import ResponseResolutionModel from './models/ResponseResolutionModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IResponseResolutionState = {
  data: [],
  error: false,
};

const ResponseResolutionReducer: Reducer = baseReducer(initialState, {
  [ResponseResolutionAction.REQUEST_RESPONSE_RESOLUTION_FINISHED](
    state: IResponseResolutionState,
    action: IAction<ResponseResolutionModel[]>
  ): IResponseResolutionState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default ResponseResolutionReducer;
