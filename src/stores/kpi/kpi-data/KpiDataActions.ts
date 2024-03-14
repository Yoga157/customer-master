import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import IStore from 'models/IStore';
import { ReduxDispatch } from 'models/ReduxProps';
import ResultActions from 'models/ResultActions';
import * as ActionUtility from 'utilities/ActionUtility';
import KpiDataDashboardModel from '../kpi-data/models/KpiDataDashboardModel';
import KpiDataDetailPointModel from '../kpi-data/models/KpiDataDetailPointModel';
import * as KpiDataEffects from './KpiDataEffects';
import KpiDataDashboardEnvelope from './models/KpiDataDashboardEnvelope';
import KpiDataDashboardDeptEnvelope from './models/KpiDataDashboardDeptEnvelope';
import KpiDataDetailPointEnvelope from './models/KpiDataDetailPointEnvelope';
import KpiDataRemarkEnvelope from './models/KpiDataRemarkEnvelope';
import KpiDataDropdownModel from './models/KpiDataDropdownModel';
import KpiDataConditionModel from './models/KpiDataConditionModel';
import PeriodeQuartalModel from './models/PeriodeQuartalModel';
import KpiDataFilter from './models/KpiDataFilter';
import KpiDataCreatorSummaryEnvelope from './models/KpiDataCreatorSummaryEnvelope';
import IAction from 'models/IAction';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | KpiDataDashboardEnvelope
  | KpiDataDashboardDeptEnvelope
  | ResultActions
  | KpiDataDashboardModel
  | KpiDataDetailPointEnvelope
  | KpiDataCreatorSummaryEnvelope
  | KpiDataDropdownModel
  | KpiDataConditionModel
  | KpiDataDetailPointModel
  | PeriodeQuartalModel
  | KpiDataFilter
  | KpiDataRemarkEnvelope;

export const REQUEST_KPI_DATAS: string = 'KpiDataActions.REQUEST_KPI_DATAS';
export const REQUEST_KPI_DATAS_FINISHED: string = 'KpiDataActions.REQUEST_KPI_DATAS_FINISHED';

export const requestKpiDatas = (tahun: number, userlogin: string, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDashboardEnvelope>(
      dispatch,
      REQUEST_KPI_DATAS,
      KpiDataEffects.requestKpiDatas,
      tahun,
      userlogin,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_SEARCH_KPI_DATA: string = 'KpiDataActions.REQUEST_SEARCH_KPI_DATA';
export const REQUEST_SEARCH_KPI_DATA_FINISHED: string = 'KpiDataActions.REQUEST_SEARCH_KPI_DATA_FINISHED';

export const reqSearchKpiData = (page: number, pageSize: number, userlogin: string, text: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDashboardEnvelope>(
      dispatch,
      REQUEST_SEARCH_KPI_DATA,
      KpiDataEffects.reqSearchKpiData,
      page,
      pageSize,
      userlogin,
      text
    );
  };
};

export const REQUEST_KPI_DASHBOARD_DATAS: string = 'KpiDataActions.REQUEST_KPI_DASHBOARD_DATAS';
export const REQUEST_KPI_DASHBOARD_DATAS_FINISHED: string = 'KpiDataActions.REQUEST_KPI_DASHBOARD_DATAS_FINISHED';

export const requestKpiDashboardDatas = (tahun: number, userlogin: string, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDashboardEnvelope>(
      dispatch,
      REQUEST_KPI_DASHBOARD_DATAS,
      KpiDataEffects.requestKpiDashboardDatas,
      tahun,
      userlogin,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_KPI_DASHBOARD_DATA_SEARCH: string = 'KpiDataActions.REQUEST_KPI_DASHBOARD_DATA_SEARCH';
export const REQUEST_KPI_DASHBOARD_DATA_SEARCH_FINISHED: string = 'KpiDataActions.REQUEST_KPI_DASHBOARD_DATA_SEARCH_FINISHED';

export const requestKpiDashboardSearch = (text: string, userlogin: string, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDashboardEnvelope>(
      dispatch,
      REQUEST_KPI_DASHBOARD_DATA_SEARCH,
      KpiDataEffects.requestKpiDashboardSearch,
      text,
      userlogin,
      page,
      pageSize
    );
  };
};

export const REQUEST_KPI_DASHBOARD_DEPT_DATAS: string = 'KpiDataActions.REQUEST_KPI_DASHBOARD_DEPT_DATAS';
export const REQUEST_KPI_DASHBOARD_DEPT_DATAS_FINISHED: string = 'KpiDataActions.REQUEST_KPI_DASHBOARD_DEPT_DATAS_FINISHED';

export const requestKpiDashboardDeptDatas = (tahun: number, userlogin: string, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDashboardDeptEnvelope>(
      dispatch,
      REQUEST_KPI_DASHBOARD_DEPT_DATAS,
      KpiDataEffects.requestKpiDashboardDeptDatas,
      tahun,
      userlogin,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_KPI_DASHBOARD_DEPT_SEARCH: string = 'KpiDataActions.REQUEST_KPI_DASHBOARD_DEPT_SEARCH';
export const REQUEST_KPI_DASHBOARD_DEPT_SEARCH_FINISHED: string = 'KpiDataActions.REQUEST_KPI_DASHBOARD_DEPT_SEARCH_FINISHED';

export const requestKpiDashboardDeptSearch = (text: string, userlogin: string, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDashboardDeptEnvelope>(
      dispatch,
      REQUEST_KPI_DASHBOARD_DEPT_SEARCH,
      KpiDataEffects.requestKpiDashboardDeptSearch,
      text,
      userlogin,
      page,
      pageSize
    );
  };
};

export const REQUEST_KPI_DETAIL_POINTS: string = 'KpiDataActions.REQUEST_KPI_DETAIL_POINTS';
export const REQUEST_KPI_DETAIL_POINTS_FINISHED: string = 'KpiDataActions.REQUEST_KPI_DETAIL_POINTS_FINISHED';

export const requestKpiDetailPoints = (
  udcid: number,
  emplid: number,
  quarter: string,
  tahun: number,
  creator: string,
  activePage: number,
  pageSize: number,
  sorting: string,
  column: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDetailPointEnvelope>(
      dispatch,
      REQUEST_KPI_DETAIL_POINTS,
      KpiDataEffects.requestKpiDetailPoints,
      udcid,
      emplid,
      quarter,
      tahun,
      creator,
      activePage,
      pageSize,
      sorting,
      column
    );
  };
};

export const REQUEST_KPI_CREATOR_SUMMARYS: string = 'KpiDataActions.REQUEST_KPI_CREATOR_SUMMARYS';
export const REQUEST_KPI_CREATOR_SUMMARYS_FINISHED: string = 'KpiDataActions.REQUEST_KPI_CREATOR_SUMMARYS_FINISHED';

export const requestKpiCreatorSummarys = (
  udcid: number,
  emplid: number,
  quarter: string,
  tahun: number,
  activePage: number,
  pageSize: number
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataCreatorSummaryEnvelope>(
      dispatch,
      REQUEST_KPI_CREATOR_SUMMARYS,
      KpiDataEffects.requestKpiCreatorSummarys,
      udcid,
      emplid,
      quarter,
      tahun,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_KPI_REMARKS: string = 'KpiDataActions.REQUEST_KPI_REMARKS';
export const REQUEST_KPI_REMARKS_FINISHED: string = 'KpiDataActions.REQUEST_KPI_REMARKS_FINISHED';

export const requestKpiRemarks = (udcid: number, emplid: number, tahun: number, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataRemarkEnvelope>(
      dispatch,
      REQUEST_KPI_REMARKS,
      KpiDataEffects.requestKpiRemarks,
      udcid,
      emplid,
      tahun,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_KPI_DETAIL_REMARKS: string = 'KpiDataActions.REQUEST_KPI_DETAIL_REMARKS';
export const REQUEST_KPI_DETAIL_REMARKS_FINISHED: string = 'KpiDataActions.REQUEST_KPI_DETAIL_REMARKS_FINISHED';

export const requestKpiDetailRemarks = (udcid: number, emplid: number, docNo: string, docType: string, activePage: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataRemarkEnvelope>(
      dispatch,
      REQUEST_KPI_DETAIL_REMARKS,
      KpiDataEffects.requestKpiDetailRemarks,
      udcid,
      emplid,
      docNo,
      docType,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_KPI_CREATOR_REMARKS: string = 'KpiDataActions.REQUEST_KPI_CREATOR_REMARKS';
export const REQUEST_KPI_CREATOR_REMARKS_FINISHED: string = 'KpiDataActions.REQUEST_KPI_CREATOR_REMARKS_FINISHED';

export const requestKpiCreatorRemarks = (
  udcid: number,
  emplid: number,
  quarter: string,
  creator: string,
  activePage: number,
  pageSize: number
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataRemarkEnvelope>(
      dispatch,
      REQUEST_KPI_CREATOR_REMARKS,
      KpiDataEffects.requestKpiCreatorRemarks,
      udcid,
      emplid,
      quarter,
      creator,
      activePage,
      pageSize
    );
  };
};

export const REQUEST_DROPDOWN_PIC: string = 'KpiDataActions.REQUEST_DROPDOWN_PIC';
export const REQUEST_DROPDOWN_PIC_FINISHED: string = 'KpiDataActions.REQUEST_DROPDOWN_PIC_FINISHED';

export const requestDropdownPic = (userLogin: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDropdownModel>(dispatch, REQUEST_DROPDOWN_PIC, KpiDataEffects.requestDropdownPic, userLogin);
  };
};

export const REQUEST_DROPDOWN_YEAR: string = 'KpiDataActions.REQUEST_DROPDOWN_YEAR';
export const REQUEST_DROPDOWN_YEAR_FINISHED: string = 'KpiDataActions.REQUEST_DROPDOWN_YEAR_FINISHED';

export const requestDropdownYear = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDropdownModel>(dispatch, REQUEST_DROPDOWN_YEAR, KpiDataEffects.requestDropdownYear);
  };
};

export const REQUEST_KPI_CONDITION: string = 'KpiDataActions.REQUEST_KPI_CONDITION';
export const REQUEST_KPI_CONDITION_FINISHED: string = 'KpiDataActions.REQUEST_KPI_CONDITION_FINISHED';

export const requestKpiCondition = (udcid: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataConditionModel>(dispatch, REQUEST_KPI_CONDITION, KpiDataEffects.requestKpiCondition, udcid);
  };
};

export const REQUEST_KPI_PDF: string = 'KpiDataActions.REQUEST_KPI_PDF';
export const REQUEST_KPI_PDF_FINISHED: string = 'KpiDataActions.REQUEST_KPI_PDF_FINISHED';

export const requestKpiPdf = (tahun: number, userlogin: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDashboardModel>(dispatch, REQUEST_KPI_PDF, KpiDataEffects.requestKpiPdf, tahun, userlogin);
  };
};

export const REQUEST_POST_UPDATE_REMARK: string = 'KpiDataActions.REQUEST_POST_UPDATE_REMARK';
export const REQUEST_POST_UPDATE_REMARK_FINISHED = 'KpiDataActions.REQUEST_POST_UPDATE_REMARK_FINISHED';
export const postUpdateRemark = (data: KpiDataDashboardModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDashboardModel>(dispatch, REQUEST_POST_UPDATE_REMARK, KpiDataEffects.postUpdateRemark, data);
  };
};

export const REQUEST_POST_UPDATE_REMARK_POINT: string = 'KpiDataActions.REQUEST_POST_UPDATE_REMARK_POINT';
export const REQUEST_POST_UPDATE_REMARK_POINT_FINISHED = 'KpiDataActions.REQUEST_POST_UPDATE_REMARK_POINT_FINISHED';
export const postUpdateRemarkPoint = (data: KpiDataDetailPointModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDetailPointModel>(
      dispatch,
      REQUEST_POST_UPDATE_REMARK_POINT,
      KpiDataEffects.postUpdateRemarkPoint,
      data
    );
  };
};

export const REQUEST_POST_UPDATE_REMARK_CREATOR: string = 'KpiDataActions.REQUEST_POST_UPDATE_REMARK_CREATOR';
export const REQUEST_POST_UPDATE_REMARK_CREATOR_FINISHED = 'KpiDataActions.REQUEST_POST_UPDATE_REMARK_CREATOR_FINISHED';
export const postUpdateRemarkCreator = (data: KpiDataDetailPointModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDetailPointModel>(
      dispatch,
      REQUEST_POST_UPDATE_REMARK_CREATOR,
      KpiDataEffects.postUpdateRemarkCreator,
      data
    );
  };
};

export const REQUEST_POST_UPDATE_POINT_SUMMARY: string = 'KpiDataActions.REQUEST_POST_UPDATE_POINT_SUMMARY';
export const REQUEST_POST_UPDATE_POINT_SUMMARY_FINISHED = 'KpiDataActions.REQUEST_POST_UPDATE_POINT_SUMMARY_FINISHED';
export const postUpdatePointManual = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<any>(dispatch, REQUEST_POST_UPDATE_POINT_SUMMARY, KpiDataEffects.postUpdatePointManual, data);
  };
};

export const REQUEST_PERIODE_QUARTAL: string = 'KpiDataActions.REQUEST_PERIODE_QUARTAL';
export const REQUEST_PERIODE_QUARTAL_FINISHED: string = 'KpiDataActions.REQUEST_PERIODE_QUARTAL_FINISHED';

export const requestPeriodeQuartal = (quartal: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<PeriodeQuartalModel>(dispatch, REQUEST_PERIODE_QUARTAL, KpiDataEffects.requestPeriodeQuartal, quartal);
  };
};

export const REQUEST_POST_KPI_FILTER: string = 'KpiDataActions.REQUEST_POST_KPI_FILTER';
export const REQUEST_POST_KPI_FILTER_FINISHED: string = 'KpiDataActions.REQUEST_POST_KPI_FILTER_FINISHED';

export const postKPIFilter = (data: KpiDataFilter): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<KpiDataDashboardEnvelope>(dispatch, REQUEST_POST_KPI_FILTER, KpiDataEffects.postKPIFilter, data);
  };
};

export const SET_PAGE: string = 'KpiDataActions.SET_PAGE';
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};

export const SET_PAGE_DEPT: string = 'KpiDataActions.SET_PAGE_DEPT';
export const setActivePageDept = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE_DEPT, activePage);
};

export const SET_YEAR: string = 'KpiDataActions.SET_YEAR';
export const setActiveYear = (activeYear: number): IAction<number> => {
  return ActionUtility.createAction(SET_YEAR, activeYear);
};
