import IServiceOwnerState from './models/IServiceOwnerState';
import * as ServiceOwnerAction from './ServiceOwnerAction';
import IAction from '../../models/IAction';
import ServiceOwnerModel from './models/ServiceOwnerModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IServiceOwnerState = {
  data: [],
  error: false,
};

const serviceOnwerReducer: Reducer = baseReducer(initialState, {
  [ServiceOwnerAction.REQUEST_SERVICE_OWNER_FINISHED](state: IServiceOwnerState, action: IAction<ServiceOwnerModel[]>): IServiceOwnerState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default serviceOnwerReducer;
