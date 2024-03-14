import * as ServiceItemAction from './ServiceItemAction';
import IAction from '../../models/IAction';
import ServiceItemModel from './models/ServiceItemModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import IServiceItemState from './models/IServiceItemState';

export const initialState: IServiceItemState = {
  data: [],
  error: false,
};

const serviceItemReducer: Reducer = baseReducer(initialState, {
  [ServiceItemAction.REQUEST_SERVICE_ITEM_FINISHED](state: IServiceItemState, action: IAction<ServiceItemModel[]>): IServiceItemState {
    return {
      ...state,
      data: action.payload!,
      error: action.error!,
    };
  },
});

export default serviceItemReducer;
