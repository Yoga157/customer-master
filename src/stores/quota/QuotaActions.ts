import QuotaBrandHardwareModelMaster from './models/QuotaBrandHardwareModelMaster';
import QuotaBrandSoftwareModelMaster from './models/QuotaBrandSoftwareModelMaster';
import ReportSummarySharedQuota from './models/ReportSummarySharedQuota.model';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import QuotaServiceModelMaster from './models/QuotaServiceModelMaster';
import PostQuotaMasterModel from './models/PostQuotaMasterModel';
import QuotaModelByEntryKey from './models/QuotaModelByEntryKey';
import EmplyeeHirarcyModel from './models/EmplyeeHirarcyModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import SummaryQuotaModel from './models/SummaryQuotaModel';
import QuotaMasterModel from './models/QuotaMasterModel';
import { ReduxDispatch } from '../../models/ReduxProps';
import ResultActions from 'models/ResultActions';
import * as QuotaEffects from './QuotaEffects';
import PostQuotaTeamModel from './models/PostQuotaTeamModel';

type ActionUnion =
  | undefined
  | boolean
  | HttpErrorResponseModel
  | ResultActions
  | QuotaBrandHardwareModelMaster
  | QuotaBrandSoftwareModelMaster
  | QuotaServiceModelMaster
  | EmplyeeHirarcyModel
  | QuotaMasterModel
  | QuotaMasterModel[]
  | PostQuotaMasterModel
  | PostQuotaTeamModel
  | SummaryQuotaModel
  | ReportSummarySharedQuota
  | QuotaModelByEntryKey[]
  | any[];

export const REQUEST_GET_QUOTA_BRAND_HARDWARE_MASTER: string = 'QuotaActions.REQUEST_GET_QUOTA_BRAND_HARDWARE_MASTER';
export const REQUEST_GET_QUOTA_BRAND_HARDWARE_MASTER_FINISHED: string = 'QuotaActions.REQUEST_GET_QUOTA_BRAND_HARDWARE_MASTER_FINISHED';

export const requestGetBrandHardwareMaster = (salesId: number, tahun: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<QuotaBrandHardwareModelMaster>(
      dispatch,
      REQUEST_GET_QUOTA_BRAND_HARDWARE_MASTER,
      QuotaEffects.requestGetBrandHardwareMaster,
      salesId,
      tahun,
    );
  };
};

export const REQUEST_GET_QUOTA_BRAND_SOFTWARE_MASTER: string = 'QuotaActions.REQUEST_GET_QUOTA_BRAND_SOFTWARE_MASTER';
export const REQUEST_GET_QUOTA_BRAND_SOFTWARE_MASTER_FINISHED: string = 'QuotaActions.REQUEST_GET_QUOTA_BRAND_SOFTWARE_MASTER_FINISHED';

export const requestGetBrandSoftwareMaster = (salesId: number, tahun: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<QuotaBrandSoftwareModelMaster>(
      dispatch,
      REQUEST_GET_QUOTA_BRAND_SOFTWARE_MASTER,
      QuotaEffects.requestGetBrandSoftwareMaster,
      salesId,
      tahun,
    );
  };
};

export const REQUEST_GET_QUOTA_SERVICE_MASTER: string = 'QuotaActions.REQUEST_GET_QUOTA_SERVICE_MASTER';
export const REQUEST_GET_QUOTA_SERVICE_MASTER_FINISHED: string = 'QuotaActions.REQUEST_GET_QUOTA_SERVICE_MASTER_FINISHED';

export const requestGetQuotaServiceMaster = (salesId: number, tahun: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<QuotaServiceModelMaster>(
      dispatch,
      REQUEST_GET_QUOTA_SERVICE_MASTER,
      QuotaEffects.requestGetQuotaServiceMaster,
      salesId,
      tahun,
    );
  };
};

export const REQUEST_GET_EMPLOYEE_HIRARCY: string = 'QuotaActions.REQUEST_GET_EMPLOYEE_HIRARCY';
export const REQUEST_GET_EMPLOYEE_HIRARCY_FINISHED: string = 'QuotaActions.REQUEST_GET_EMPLOYEE_HIRARCY_FINISHED';

export const requestGetEmplyeeHirarcy = (operationtype: string, accountname: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<EmplyeeHirarcyModel>(
      dispatch,
      REQUEST_GET_EMPLOYEE_HIRARCY,
      QuotaEffects.requestGetEmplyeeHirarcy,
      operationtype,
      accountname,
    );
  };
};


// export const REMOVE_SUBMIT_RESULT:string ='FunnelSalesAnalystActions.REMOVE_SUBMIT_RESULT';
// export const REMOVE_SUBMIT_RESULT_FINISHED = 'FunnelSalesAnalystActions.REMOVE_SUBMIT_RESULT_FINISHED';

// export const removeResult = ():any => {
//   return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
//       await ActionUtility.createThunkEffect<ResultActions>(dispatch,REMOVE_SUBMIT_RESULT, FunnelSalesAnalystEffects.removeResult );
//   }
// }

export const REQUEST_GET_QUOTA_MASTER_MYOWNQUOTA: string = 'QuotaActions.REQUEST_GET_QUOTA_MASTER_MYOWNQUOTA';
export const REQUEST_GET_QUOTA_MASTER_MYOWNQUOTA_FINISHED: string = 'QuotaActions.REQUEST_GET_QUOTA_MASTER_MYOWNQUOTA_FINISHED';

export const getQuotaMasterMyOwnQuota = (salesID: number, tahun: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<QuotaMasterModel>(
      dispatch,
      REQUEST_GET_QUOTA_MASTER_MYOWNQUOTA,
      QuotaEffects.getQuotaMasterMyOwnQuota,
      salesID,
      tahun,
    );
  };
};

export const REQUEST_GET_QUOTA_MASTER_MYTEAM: string = 'QuotaActions.REQUEST_GET_QUOTA_MASTER_MYTEAM';
export const REQUEST_GET_QUOTA_MASTER_MYTEAM_FINISHED: string = 'QuotaActions.REQUEST_GET_QUOTA_MASTER_MYTEAM_FINISHED';

export const getQuotaMasterMyTeamQuota = (accountName: string, tahun: string, column:string, sorting:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<QuotaMasterModel[]>(
      dispatch,
      REQUEST_GET_QUOTA_MASTER_MYTEAM,
      QuotaEffects.getQuotaMasterMyTeamQuota,
      accountName,
      tahun,
      column,
      sorting
    );
  };
};

export const REQUEST_GET_QUOTA_MASTER_MYTEAM_SEARCH: string = 'QuotaActions.REQUEST_GET_QUOTA_MASTER_MYTEAM_SEARCH';
export const REQUEST_GET_QUOTA_MASTER_MYTEAM_SEARCH_FINISHED: string = 'QuotaActions.REQUEST_GET_QUOTA_MASTER_MYTEAM_SEARCH_FINISHED';

export const getQuotaMasterMyTeamQuotaSearch = (accountName: string, column:string, sorting:string, search:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<QuotaMasterModel[]>(
      dispatch,
      REQUEST_GET_QUOTA_MASTER_MYTEAM_SEARCH,
      QuotaEffects.getQuotaMasterMyTeamQuotaSearch,
      accountName,
      column,
      sorting,
      search
    );
  };
};

export const REQUEST_REPORT_SUMMARY_SHARED_QUOTA: string = 'QuotaActions.REQUEST_REPORT_SUMMARY_SHARED_QUOTA';
export const REQUEST_REPORT_SUMMARY_SHARED_QUOTA_FINISHED: string = 'QuotaActions.REQUEST_REPORT_SUMMARY_SHARED_QUOTA_FINISHED';

export const getReportSummarySharedQuota = (accountName: string, tahun: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ReportSummarySharedQuota>(
      dispatch, 
      REQUEST_REPORT_SUMMARY_SHARED_QUOTA, 
      QuotaEffects.getReportSummarySharedQuota,
      accountName,
      tahun
    );
  };
};

export const REQUEST_SUMMARY_QUOTA: string = 'QuotaActions.REQUEST_SUMMARY_QUOTA';
export const REQUEST_SUMMARY_QUOTA_FINISHED: string = 'QuotaActions.REQUEST_SUMMARY_QUOTA_FINISHED';

export const getSummaryQuota = (salesID: number, tahun: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<SummaryQuotaModel>(
      dispatch, 
      REQUEST_SUMMARY_QUOTA, 
      QuotaEffects.getSummaryQuota,
      salesID,
      tahun
    );
  };
};

export const REQUEST_GET_QUOTA_BY_ENTRY_KEY: string = 'QuotaActions.REQUEST_GET_QUOTA_BY_ENTRY_KEY';
export const REQUEST_GET_QUOTA_BY_ENTRY_KEY_FINISHED: string = 'QuotaActions.REQUEST_GET_QUOTA_BY_ENTRY_KEY_FINISHED';

export const getQuotaByEntryKey = (type:string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<QuotaModelByEntryKey[]>(
      dispatch, 
      REQUEST_GET_QUOTA_BY_ENTRY_KEY, 
      QuotaEffects.getQuotaByEntryKey,
      type
    );
  };
};

export const REQUEST_POST_QUOTA_MASTER: string = 'QuotaActions.REQUEST_POST_QUOTA_MASTER';
export const REQUEST_POST_QUOTA_MASTER_FINISHED: string = 'QuotaActions.REQUEST_POST_QUOTA_MASTER_FINISHED';

export const postQuotaMaster = (data: PostQuotaMasterModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_POST_QUOTA_MASTER,
      QuotaEffects.postQuotaMaster,
      data
    );
  };
};

export const REQUEST_POST_QUOTA_MYTEAM: string = 'QuotaActions.REQUEST_POST_QUOTA_MYTEAM';
export const REQUEST_POST_QUOTA_MYTEAM_FINISHED: string = 'QuotaActions.REQUEST_POST_QUOTA_MYTEAM_FINISHED';

export const postQuotaMyTeam = (data: PostQuotaTeamModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_POST_QUOTA_MYTEAM,
      QuotaEffects.postQuotaMyTeam,
      data
    );
  };
};


export const REMOVE_SUBMIT_RESULT:string ='QuotaActions.REMOVE_SUBMIT_RESULT';
export const REMOVE_SUBMIT_RESULT_FINISHED = 'QuotaActions.REMOVE_SUBMIT_RESULT_FINISHED';

export const removeResult = ():any => {
  return async(dispatch:ReduxDispatch<ActionUnion>) : Promise<void> => {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch,REMOVE_SUBMIT_RESULT, QuotaEffects.removeResult );
  }
}
