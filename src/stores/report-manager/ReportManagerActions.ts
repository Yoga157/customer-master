import * as ReportManagerEffects from './ReportManagerEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ReportManagerModel from './models/ReportManagerModel';


type ActionUnion = undefined | HttpErrorResponseModel | ReportManagerModel[] ;

export const REQUEST_REPORT_CATEGORY: string = 'ReportManagerActions.REQUEST_REPORT_CATEGORY';
export const REQUEST_REPORT_CATEGORY_FINISHED: string = 'ReportManagerActions.REQUEST_REPORT_CATEGORY_FINISHED';

export const requestReportCategory = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ReportManagerModel[]>(dispatch, REQUEST_REPORT_CATEGORY, ReportManagerEffects.requestReportCategory);
  };
};

export const REQUEST_REPORT_ITEM: string = 'ReportManagerActions.REQUEST_REPORT_ITEM';
export const REQUEST_REPORT_ITEM_FINISHED: string = 'ReportManagerActions.REQUEST_REPORT_ITEM_FINISHED';

export const requestReportItem = (id:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ReportManagerModel[]>(dispatch, REQUEST_REPORT_ITEM, ReportManagerEffects.requestReportItem, id);
  };
};

export const REQUEST_REPORT_ITEM_BYID: string = 'ReportManagerActions.REQUEST_REPORT_ITEM_BYID';
export const REQUEST_REPORT_ITEM_BYID_FINISHED: string = 'ReportManagerActions.REQUEST_REPORT_ITEM_BYID_FINISHED';

export const requestReportItemByID = (id:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ReportManagerModel[]>(dispatch, REQUEST_REPORT_ITEM_BYID, ReportManagerEffects.requestReportItemByID, id);
  };
};