import IPreventiveScheduleState from './models/IPreventiveScheduleState';
import * as PreventiveScheduleAction from './PreventiveScheduleAction';
import IAction from '../../models/IAction';
import PreventiveScheduleModel from './models/PreventiveScheduleModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IPreventiveScheduleState = {
  data: [],
  error: false,
};

const PreventiveScheduleReducer: Reducer = baseReducer(initialState, {
  [PreventiveScheduleAction.REQUEST_PREVENTIVE_SCHEDULE_FINISHED](
    state: IPreventiveScheduleState,
    action: IAction<PreventiveScheduleModel[]>
  ): IPreventiveScheduleState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default PreventiveScheduleReducer;
