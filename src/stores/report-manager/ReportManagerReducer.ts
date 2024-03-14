import IReportManagerState from './models/IReportManagerState';
import * as ReportManagerActions from './ReportManagerActions';
import IAction from '../../models/IAction';
import ReportManagerModel from './models/ReportManagerModel';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';

export const initialState: IReportManagerState = {
    data: [],
    dataItem: [],
    firstData: new ReportManagerModel({}),
    error:false
};

const reportManagerReducer: Reducer = baseReducer(initialState,
  {
    [ReportManagerActions.REQUEST_REPORT_CATEGORY_FINISHED](state:IReportManagerState, action:IAction<ReportManagerModel[]>): IReportManagerState{
      return {
        ...state,
        data:action.payload!,
        error:action.error!
      }
    },
    [ReportManagerActions.REQUEST_REPORT_ITEM_FINISHED](state:IReportManagerState, action:IAction<ReportManagerModel[]>): IReportManagerState{
      return {
        ...state,
        dataItem:action.payload!,
        error:action.error!
      }
    },
    [ReportManagerActions.REQUEST_REPORT_ITEM_BYID_FINISHED](state:IReportManagerState, action:IAction<ReportManagerModel>): IReportManagerState{
      return {
        ...state,
        firstData:action.payload!,
        error:action.error!
      }
    }
  }
);

export default reportManagerReducer;
