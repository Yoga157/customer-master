import * as ActivityTypeActions from './ActivityTypeActions';
import IAction from '../../models/IAction';
import ActivityTypeModel from './models/ActivityTypeModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IActivityTypeState from './models/IActivityTypeState';

export const initialState: IActivityTypeState = {
  data: [],
  dataAll: [],
  error: false,
};

const productCategoryReducer: Reducer = baseReducer(initialState, {
  [ActivityTypeActions.REQUEST_ACTIVITY_TYPE_FINISHED](state: IActivityTypeState, action: IAction<ActivityTypeModel[]>): IActivityTypeState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
  [ActivityTypeActions.REQUEST_ACTIVITY_TYPE_ALL_FINISHED](state: IActivityTypeState, action: IAction<ActivityTypeModel[]>): IActivityTypeState {
    return {
      ...state,
      dataAll: action.payload!,
      error: action.error!,
    };
  },
});

export default productCategoryReducer;
