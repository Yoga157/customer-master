import { Reducer } from 'redux';

import QuotaBrandHardwareModelMaster from './models/QuotaBrandHardwareModelMaster';
import QuotaBrandSoftwareModelMaster from './models/QuotaBrandSoftwareModelMaster';
import ReportSummarySharedQuota from './models/ReportSummarySharedQuota.model';
import QuotaServiceModelMaster from './models/QuotaServiceModelMaster';
import EmplyeeHirarcyModel from './models/EmplyeeHirarcyModel';
import SummaryQuotaModel from './models/SummaryQuotaModel';
import QuotaMasterModel from './models/QuotaMasterModel';
import baseReducer from '../../utilities/BaseReducer';
import ResultActions from 'models/ResultActions';
import IQuotaState from './models/IQuotaState';
import * as QuotaActions from './QuotaActions';
import IAction from '../../models/IAction';
import QuotaModelByEntryKey from './models/QuotaModelByEntryKey';

export const initialState: IQuotaState = {
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
  summaryQuota: new SummaryQuotaModel({}),
  quotaHeader: [],
  quotaMaster: new QuotaMasterModel({}),
  summarySharedQuota: new ReportSummarySharedQuota({}),
  quotaMasterMyTeam:[],
  quotaBrandHardwareMaster: [],
  quotaBrandSoftwareMaster: [],
  quotaServiceMaster: [],
  emplyeeHirarcy: []
};

const QuotaReducer: Reducer = baseReducer(initialState,
  {
    [QuotaActions.REQUEST_GET_QUOTA_BRAND_HARDWARE_MASTER_FINISHED](state:IQuotaState, action:IAction<QuotaBrandHardwareModelMaster[]>): IQuotaState{
      return {
        ...state,
        quotaBrandHardwareMaster:action.payload!,
        error:false,
        refreshPage:false
      }
    },
    [QuotaActions.REQUEST_GET_QUOTA_BRAND_SOFTWARE_MASTER_FINISHED](state:IQuotaState, action:IAction<QuotaBrandSoftwareModelMaster[]>): IQuotaState{
      return {
        ...state,
        quotaBrandSoftwareMaster:action.payload!,
        error:false,
        refreshPage:false
      }
    },
    [QuotaActions.REQUEST_GET_QUOTA_SERVICE_MASTER_FINISHED](state:IQuotaState, action:IAction<QuotaServiceModelMaster[]>): IQuotaState{
      return {
        ...state,
        quotaServiceMaster:action.payload!,
        error:false,
        refreshPage:false
      }
    },
    [QuotaActions.REQUEST_GET_EMPLOYEE_HIRARCY_FINISHED](state:IQuotaState, action:IAction<EmplyeeHirarcyModel[]>): IQuotaState{
      return {
        ...state,
        emplyeeHirarcy:action.payload!,
        error:false,
        refreshPage:false
      }
    },
    [QuotaActions.REQUEST_GET_QUOTA_MASTER_MYOWNQUOTA_FINISHED](state:IQuotaState, action:IAction<QuotaMasterModel>): IQuotaState{
      return {
        ...state,
        quotaMaster:action.payload!,
        error:false,
        refreshPage:false
      }
    },
    [QuotaActions.REQUEST_GET_QUOTA_MASTER_MYTEAM_FINISHED](state:IQuotaState, action:IAction<QuotaMasterModel[]>): IQuotaState{
      return {
        ...state,
        quotaMasterMyTeam:action.payload!,
        error:false,
        refreshPage:false
      }
    },
    [QuotaActions.REQUEST_GET_QUOTA_MASTER_MYTEAM_SEARCH_FINISHED](state:IQuotaState, action:IAction<QuotaMasterModel[]>): IQuotaState{
      return {
        ...state,
        quotaMasterMyTeam:action.payload!,
        error:false,
        refreshPage:false
      }
    },
    [QuotaActions.REQUEST_REPORT_SUMMARY_SHARED_QUOTA_FINISHED](state:IQuotaState, action:IAction<ReportSummarySharedQuota>): IQuotaState{
      return {
        ...state,
        summarySharedQuota:action.payload!,
        error:false,
        refreshPage:false
      }
    },
    [QuotaActions.REQUEST_SUMMARY_QUOTA_FINISHED](state:IQuotaState, action:IAction<SummaryQuotaModel>): IQuotaState{
      return {
        ...state,
        summaryQuota:action.payload!,
        error:false,
        refreshPage:false
      }
    },
    [QuotaActions.REQUEST_GET_QUOTA_BY_ENTRY_KEY_FINISHED](state:IQuotaState, action:IAction<QuotaModelByEntryKey[]>): IQuotaState{
      return {
        ...state,
        quotaHeader:action.payload!,
        error:false,
        refreshPage:false
      }
    },
     [QuotaActions.REQUEST_POST_QUOTA_MASTER_FINISHED](state: IQuotaState, action: IAction<ResultActions>): IQuotaState {
      return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
      };
    },
     [QuotaActions.REQUEST_POST_QUOTA_MYTEAM_FINISHED](state: IQuotaState, action: IAction<ResultActions>): IQuotaState {
      return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
      };
    },
     [QuotaActions.REMOVE_SUBMIT_RESULT_FINISHED](state: IQuotaState, action: IAction<ResultActions>): IQuotaState {
      const clearResult = new ResultActions({})
      return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: clearResult!,
      };
    },
  }
);

export default QuotaReducer;
