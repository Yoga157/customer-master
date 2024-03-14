import IKpiDataState from './models/IKpiDataState';
import { Reducer } from 'redux';
import baseReducer from '../../../utilities/BaseReducer';
import * as KpiDataActions from './KpiDataActions';
import KpiDataDashboardEnvelope from './models/KpiDataDashboardEnvelope';
import KpiDataDashboardDeptEnvelope from './models/KpiDataDashboardDeptEnvelope';
import KpiDataDetailPointEnvelope from './models/KpiDataDetailPointEnvelope';
import KpiDataCreatorSummaryEnvelope from './models/KpiDataCreatorSummaryEnvelope';
import KpiDataRemarkEnvelope from './models/KpiDataRemarkEnvelope';
import IAction from 'models/IAction';
import KpiDataDropdownModel from './models/KpiDataDropdownModel';
import KpiDataConditionModel from './models/KpiDataConditionModel';
import KpiDataDashboardModel from './models/KpiDataDashboardModel';
import PeriodeQuartalModel from './models/PeriodeQuartalModel';
import ResultActions from 'models/ResultActions';

export const initialState: IKpiDataState = {
  data: new KpiDataDashboardEnvelope({}),
  dataDashboard: new KpiDataDashboardEnvelope({}),
  dataDashboardDept: new KpiDataDashboardDeptEnvelope({}),
  detailPoint: new KpiDataDetailPointEnvelope({}),
  summaryCreator: new KpiDataCreatorSummaryEnvelope({}),
  dataRemark: new KpiDataRemarkEnvelope({}),
  periodeQuartal: new PeriodeQuartalModel({}),
  dropdownPIC: [],
  dropdownYear: [],
  kpiCondition: [],
  kpiPdf: [],
  error: false,
  refreshPage: false,
  activePage: 1,
  activePageDept: 1,
  activeYear: new Date().getFullYear(),
};

const kpiDataReducer: Reducer = baseReducer(initialState, {
  [KpiDataActions.REQUEST_KPI_DATAS_FINISHED](state: IKpiDataState, action: IAction<KpiDataDashboardEnvelope>): IKpiDataState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_SEARCH_KPI_DATA_FINISHED](state: IKpiDataState, action: IAction<KpiDataDashboardEnvelope>): IKpiDataState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_DASHBOARD_DATAS_FINISHED](state: IKpiDataState, action: IAction<KpiDataDashboardEnvelope>): IKpiDataState {
    return {
      ...state,
      dataDashboard: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_DASHBOARD_DATA_SEARCH_FINISHED](state: IKpiDataState, action: IAction<KpiDataDashboardEnvelope>): IKpiDataState {
    return {
      ...state,
      dataDashboard: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_DASHBOARD_DEPT_DATAS_FINISHED](state: IKpiDataState, action: IAction<KpiDataDashboardDeptEnvelope>): IKpiDataState {
    return {
      ...state,
      dataDashboardDept: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_DASHBOARD_DEPT_SEARCH_FINISHED](state: IKpiDataState, action: IAction<KpiDataDashboardDeptEnvelope>): IKpiDataState {
    return {
      ...state,
      dataDashboardDept: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_DETAIL_POINTS_FINISHED](state: IKpiDataState, action: IAction<KpiDataDetailPointEnvelope>): IKpiDataState {
    return {
      ...state,
      detailPoint: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_CREATOR_SUMMARYS_FINISHED](state: IKpiDataState, action: IAction<KpiDataCreatorSummaryEnvelope>): IKpiDataState {
    return {
      ...state,
      summaryCreator: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_REMARKS_FINISHED](state: IKpiDataState, action: IAction<KpiDataRemarkEnvelope>): IKpiDataState {
    return {
      ...state,
      dataRemark: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_DETAIL_REMARKS_FINISHED](state: IKpiDataState, action: IAction<KpiDataRemarkEnvelope>): IKpiDataState {
    return {
      ...state,
      dataRemark: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_CREATOR_REMARKS_FINISHED](state: IKpiDataState, action: IAction<KpiDataRemarkEnvelope>): IKpiDataState {
    return {
      ...state,
      dataRemark: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_DROPDOWN_PIC_FINISHED](state: IKpiDataState, action: IAction<KpiDataDropdownModel[]>): IKpiDataState {
    return {
      ...state,
      dropdownPIC: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_DROPDOWN_YEAR_FINISHED](state: IKpiDataState, action: IAction<KpiDataDropdownModel[]>): IKpiDataState {
    return {
      ...state,
      dropdownYear: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_CONDITION_FINISHED](state: IKpiDataState, action: IAction<KpiDataConditionModel[]>): IKpiDataState {
    return {
      ...state,
      kpiCondition: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_KPI_PDF_FINISHED](state: IKpiDataState, action: IAction<KpiDataDashboardModel[]>): IKpiDataState {
    return {
      ...state,
      kpiPdf: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [KpiDataActions.REQUEST_POST_UPDATE_REMARK_FINISHED](state: IKpiDataState, action: IAction<ResultActions>): IKpiDataState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [KpiDataActions.REQUEST_POST_UPDATE_REMARK_POINT_FINISHED](state: IKpiDataState, action: IAction<ResultActions>): IKpiDataState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [KpiDataActions.REQUEST_POST_UPDATE_REMARK_CREATOR_FINISHED](state: IKpiDataState, action: IAction<ResultActions>): IKpiDataState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [KpiDataActions.REQUEST_POST_UPDATE_POINT_SUMMARY_FINISHED](state: IKpiDataState, action: IAction<ResultActions>): IKpiDataState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },
  [KpiDataActions.REQUEST_PERIODE_QUARTAL_FINISHED](state: IKpiDataState, action: IAction<PeriodeQuartalModel>): IKpiDataState {
    return {
      ...state,
      periodeQuartal: action.payload!,
      error: action.error!,
    };
  },

  [KpiDataActions.REQUEST_POST_KPI_FILTER_FINISHED](state: IKpiDataState, action: IAction<KpiDataDashboardEnvelope>): IKpiDataState {
    return {
      ...state,
      error: action.error!,
      refreshPage: false,
      data: action.payload!,
    };
  },
  [KpiDataActions.SET_PAGE](state: IKpiDataState, action: IAction<number>): IKpiDataState {
    return {
      ...state,
      activePage: action.payload!,
    };
  },
  [KpiDataActions.SET_PAGE_DEPT](state: IKpiDataState, action: IAction<number>): IKpiDataState {
    return {
      ...state,
      activePageDept: action.payload!,
    };
  },
  [KpiDataActions.SET_YEAR](state: IKpiDataState, action: IAction<number>): IKpiDataState {
    return {
      ...state,
      activeYear: action.payload!,
    };
  },
});

export default kpiDataReducer;
