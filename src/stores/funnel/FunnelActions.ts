import * as FunnelEffect from './FunnelEffects';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import FunnelDashboardEnvelope from './models/FunnelDashboardEnvelope';
import FunnelHistoryEnvelope from './models/FunnelHistoryEnvelope';
import FunnelModel from './models/FunnelModel';
import FunnelsModel from './models/FunnelsModel';
import FunnelViewEditStatus from './models/view-edit/FunnelViewEditStatus';
import FunnelViewEditCustomer from './models/view-edit/FunnelViewEditCustomer';
import FunnelViewEditSelling from './models/view-edit/FunnelViewEditSelling';
import FunnelViewEditCustomerPO from './models/view-edit/FunnelViewEditCustomerPO';
import FunnelViewEditAdditional from './models/view-edit/FunnelViewEditAdditional';
import { FunnelViewEditCommisionIndex, FunnelViewEditConfirmation, ServiceAreaBufferResource } from './models/view-edit';
import FunnelHeaderNameModel from './models/FunnelHeaderNameModel';
import ResultActions from 'models/ResultActions';
import FunnelViewEditCustomerDetails from './models/view-edit/FunnelViewEditCustomerDetails';
import FunnelFilter from './models/FunnelFilter';
import FunnelVerificationModelEnvelope from './models/FunnelVerificationModelEnvelope';
import IAction from 'models/IAction';
import IFunnelState from './models/IFunnelState';
import FunnelVerificationModel from './models/FunnelVerificationModel';
import FunnelDepartmentModel from './models/FunnelDepartmentModel';
import FunnelSoftware from './models/view-edit/FunnelSoftware';
import FunnelAuthorization from './models/FunnelAuthorization';
import FunnelCurrencyUdcModel from './models/FunnelCurrencyUdcModel';
import FunnelRateModel from './models/FunnelRateModel';
import IStore from 'models/IStore';
import FunnelHistoryGpm from './models/FunnelHistoryGpm';
import FunnelStatusModel from '../funnel-status/models/FunnelStatusModel';
import FunnelEntryKeyByModel from './models/FunnelEntryKeyByModel';
import FunnelViewEditCustomerByProjectId from './models/view-edit/FunnelViewEditCustomerByProjectId';
import EmployeeHierarcyModel from 'stores/employee/models/EmployeeHierarcyModel';
import FunnelDropdownConfirmation from './models/FunnelDropdownConfirmation';
import FunnelConfigColumnModel from './models/FunnelConfigColumnModel';

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | FunnelDashboardEnvelope
  | FunnelModel
  | boolean
  | FunnelViewEditStatus
  | FunnelViewEditCustomer
  | FunnelViewEditSelling
  | FunnelsModel
  | FunnelHeaderNameModel
  | FunnelViewEditCustomerPO
  | FunnelViewEditAdditional
  | ServiceAreaBufferResource
  | boolean
  | any
  | ResultActions
  | FunnelViewEditCustomerDetails
  | FunnelVerificationModelEnvelope
  | FunnelVerificationModel
  | FunnelDepartmentModel[]
  | FunnelSoftware
  | FunnelViewEditCommisionIndex
  | FunnelViewEditConfirmation
  | FunnelAuthorization
  | FunnelViewEditCustomerByProjectId
  | FunnelEntryKeyByModel[]
  | FunnelCurrencyUdcModel[]
  | FunnelHistoryEnvelope[]
  | FunnelHistoryGpm[]
  | FunnelStatusModel[]
  | EmployeeHierarcyModel[]
  | FunnelDropdownConfirmation[]
  | FunnelRateModel;

export const REQUEST_RESET_STATE: string = 'FunnelActions.REQUEST_RESET_STATE';
export const requestResetStateFunnel = (): IAction<boolean> => {
  return ActionUtility.createAction(REQUEST_RESET_STATE, true);
};

export const REMOVE_SUBMIT_RESULT: string = 'FunnelActions.REMOVE_SUBMIT_RESULT';
export const REMOVE_SUBMIT_RESULT_FINISHED = 'FunnelActions.REMOVE_SUBMIT_RESULT_FINISHED';

export const removeResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REMOVE_SUBMIT_RESULT, FunnelEffect.removeResult);
  };
};

export const REQUEST_FUNNELS: string = 'FunnelActions.REQUEST_FUNNELS';
export const REQUEST_FUNNELS_FINISHED: string = 'FunnelActions.REQUEST_FUNNELS_FINISHED';

export const requestFunnel = (salesID: number, role: string, column: string, sorting: string, type: string, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelDashboardEnvelope>(
      dispatch,
      REQUEST_FUNNELS,
      FunnelEffect.requestFunnel,
      salesID,
      role,
      column,
      sorting,
      type,
      page,
      pageSize
    );
  };
};

//07 Februari 2022 Service baru untuk get data SA
export const REQUEST_SAS: string = 'FunnelActions.REQUEST_SAS';
export const REQUEST_SAS_FINISHED: string = 'FunnelActions.REQUEST_SAS_FINISHED';

export const requestSA = (salesID: number, role: string, column: string, sorting: string, page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelDashboardEnvelope>(
      dispatch,
      REQUEST_SAS,
      FunnelEffect.requestSA,
      salesID,
      role,
      column,
      sorting,
      page,
      pageSize
    );
  };
};

export const REQUEST_POST_FUNNEL: string = 'FunnelActions.REQUEST_POST_FUNNEL';
export const REQUEST_POST_FUNNEL_FINISHED = 'FunnelActions.REQUEST_POST_FUNNEL_FINISHED';
export const postFunnel = (data: FunnelsModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_FUNNEL, FunnelEffect.postFunnel, data);
  };
};

export const REQUEST_FUNNEL: string = 'FunnelActions.REQUEST_FUNNEL';
export const REQUEST_FUNNEL_FINISHED: string = 'FunnelActions.REQUEST_FUNNEL_FINISHED';

export const requestFunnelById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelModel>(dispatch, REQUEST_FUNNEL, FunnelEffect.requestFunnelById, funnelGenID);
  };
};

export const REQUEST_VIEW_FUNNEL_STATUS: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_STATUS';
export const REQUEST_VIEW_FUNNEL_STATUS_FINISHED: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_STATUS_FINISHED';

export const requestViewFunnelStatusById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditStatus>(
      dispatch,
      REQUEST_VIEW_FUNNEL_STATUS,
      FunnelEffect.requestViewFunnelStatusById,
      funnelGenID
    );
  };
};

export const REQUEST_UPDATE_FUNNEL_STATUS: string = 'FunnelActions.REQUEST_UPDATE_FUNNEL_STATUS';
export const REQUEST_UPDATE_FUNNEL_STATUS_FINISHED = 'FunnelActions.REQUEST_UPDATE_FUNNEL_STATUS_FINISHED';
export const putViewFunnelStatus = (data: FunnelViewEditStatus): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditStatus>(dispatch, REQUEST_UPDATE_FUNNEL_STATUS, FunnelEffect.putViewFunnelStatus, data);
  };
};

export const REQUEST_VIEW_FUNNEL_CUSTOMER_DETAIL: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER_DETAIL';
export const REQUEST_VIEW_FUNNEL_CUSTOMER_DETAIL_FINISHED: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER_DETAIL_FINISHED';

export const requestViewFunnelCustomerDetailById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditCustomerDetails>(
      dispatch,
      REQUEST_VIEW_FUNNEL_CUSTOMER_DETAIL,
      FunnelEffect.requestViewFunnelCustomerDetailById,
      funnelGenID
    );
  };
};

export const REQUEST_VIEW_FUNNEL_CUSTOMER: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER';
export const REQUEST_VIEW_FUNNEL_CUSTOMER_FINISHED: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER_FINISHED';

export const requestViewFunnelCustomerById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditCustomer>(
      dispatch,
      REQUEST_VIEW_FUNNEL_CUSTOMER,
      FunnelEffect.requestViewFunnelCustomerById,
      funnelGenID
    );
  };
};

export const REQUEST_SALES_SPESIALIS: string = 'FunnelActions.REQUEST_SALES_SPESIALIS';
export const REQUEST_SALES_SPESIALIS_FINISHED: string = 'FunnelActions.REQUEST_SALES_SPESIALIS_FINISHED';
export const getEmployeeBy = (operationtype: string, accountname: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<EmployeeHierarcyModel[]>(
      dispatch,
      REQUEST_SALES_SPESIALIS,
      FunnelEffect.getEmployeeBy,
      operationtype,
      accountname
    );
  };
};

export const REQUEST_UPDATE_FUNNEL_CUSTOMER: string = 'FunnelActions.REQUEST_UPDATE_FUNNEL_CUSTOMER';
export const REQUEST_UPDATE_FUNNEL_CUSTOMER_FINISHED = 'FunnelActions.REQUEST_UPDATE_FUNNEL_CUSTOMER_FINISHED';
export const putViewFunnelCustomer = (data: FunnelViewEditCustomer): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditCustomer>(dispatch, REQUEST_UPDATE_FUNNEL_CUSTOMER, FunnelEffect.putViewFunnelCustomer, data);
  };
};

export const VIEW_CUSTOMER_BY_PROJECTID: string = 'FunnelActions.REQUEST_VIEW_CUSTOMER_BY_PROJECTID';
export const VIEW_CUSTOMER_BY_PROJECTID_FINISHED: string = 'FunnelActions.REQUEST_VIEW_CUSTOMER_BY_PROJECTID_FINISHED';
export const reqPMOPCustomerBy = (projectId: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditCustomerByProjectId>(
      dispatch,
      VIEW_CUSTOMER_BY_PROJECTID,
      FunnelEffect.reqPMOPCustomerBy,
      projectId
    );
  };
};

export const UPDATE_FUNNEL_CUSTOMER_ESTIMATION_BY_PMO: string = 'FunnelActions.REQUEST_UPDATE_FUNNEL_CUSTOMER_ESTIMATION_BY_PMO';
export const UPDATE_FUNNEL_CUSTOMER_ESTIMATION_BY_PMO_FINISHED = 'FunnelActions.REQUEST_UPDATE_FUNNEL_CUSTOMER_ESTIMATION_BY_PMO_FINISHED';
export const putEstimationByPmo = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, UPDATE_FUNNEL_CUSTOMER_ESTIMATION_BY_PMO, FunnelEffect.putEstimationByPmo, data);
  };
};

export const REQUEST_UPDATE_PROJECT_ALIAS: string = 'FunnelActions.REQUEST_UPDATE_PROJECT_ALIAS';
export const REQUEST_UPDATE_PROJECT_ALIAS_FINISHED = 'FunnelActions.REQUEST_UPDATE_PROJECT_ALIAS_FINISHED';
export const updateProjectAlias = (ProjectAlias: string, UserLoginID: number, FunnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_UPDATE_PROJECT_ALIAS,
      FunnelEffect.updateProjectAlias,
      ProjectAlias,
      UserLoginID,
      FunnelGenID
    );
  };
};

export const REQUEST_VIEW_FUNNEL_SELLING: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_SELLING';
export const REQUEST_VIEW_FUNNEL_SELLING_FINISHED: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_SELLING_FINISHED';

export const requestViewFunnelSellingById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditSelling>(
      dispatch,
      REQUEST_VIEW_FUNNEL_SELLING,
      FunnelEffect.requestViewFunnelSellingById,
      funnelGenID
    );
  };
};

export const REQUEST_UPDATE_FUNNEL_SELLING: string = 'FunnelActions.REQUEST_UPDATE_FUNNEL_SELLING';
export const REQUEST_UPDATE_FUNNEL_SELLING_FINISHED = 'FunnelActions.REQUEST_UPDATE_FUNNEL_SELLING_FINISHED';
export const putViewFunnelSelling = (data: FunnelViewEditSelling): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditSelling>(dispatch, REQUEST_UPDATE_FUNNEL_SELLING, FunnelEffect.putViewFunnelSelling, data);
  };
};

export const REQUEST_VIEW_FUNNEL_CUSTOMER_PO: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER_PO';
export const REQUEST_VIEW_FUNNEL_CUSTOMER_PO_FINISHED: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER_PO_FINISHED';

export const requestViewFunnelCustomerPOById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditCustomerPO>(
      dispatch,
      REQUEST_VIEW_FUNNEL_CUSTOMER_PO,
      FunnelEffect.requestViewFunnelCustomerPOById,
      funnelGenID
    );
  };
};

export const REQUEST_UPDATE_FUNNEL_CUSTOMER_PO: string = 'FunnelActions.REQUEST_UPDATE_FUNNEL_CUSTOMER_PO';
export const REQUEST_UPDATE_FUNNEL_CUSTOMER_PO_FINISHED = 'FunnelActions.REQUEST_UPDATE_FUNNEL_CUSTOMER_PO_FINISHED';
export const putViewFunnelCustomerPO = (data: FunnelViewEditCustomerPO): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_UPDATE_FUNNEL_CUSTOMER_PO,
      FunnelEffect.putViewFunnelCustomerPO,
      data
    );
  };
};

export const REQUEST_VIEW_FUNNEL_ADDITIONAL: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_ADDITIONAL';
export const REQUEST_VIEW_FUNNEL_ADDITIONAL_FINISHED: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_ADDITIONAL_FINISHED';
export const requestViewFunnelAdditionalById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditAdditional>(
      dispatch,
      REQUEST_VIEW_FUNNEL_ADDITIONAL,
      FunnelEffect.requestViewFunnelAdditionalById,
      funnelGenID
    );
  };
};

export const REQUEST_UPDATE_FUNNEL_ADDITIONAL: string = 'FunnelActions.REQUEST_UPDATE_FUNNEL_ADDITIONAL';
export const REQUEST_UPDATE_FUNNEL_ADDITIONAL_FINISHED = 'FunnelActions.REQUEST_UPDATE_FUNNEL_ADDITIONAL_FINISHED';
export const putViewFunnelAdditional = (data: FunnelViewEditAdditional): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditAdditional>(
      dispatch,
      REQUEST_UPDATE_FUNNEL_ADDITIONAL,
      FunnelEffect.putViewFunnelAdditional,
      data
    );
  };
};

export const REQUEST_SERVICE_AREA_BUFFER_RESOURCE: string = 'FunnelActions.REQUEST_SERVICE_AREA_BUFFER_RESOURCE';
export const REQUEST_SERVICE_AREA_BUFFER_RESOURCE_FINISHED: string = 'FunnelActions.REQUEST_SERVICE_AREA_BUFFER_RESOURCE_FINISHED';
export const requestServiceAreaBufferResourceById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceAreaBufferResource>(
      dispatch,
      REQUEST_SERVICE_AREA_BUFFER_RESOURCE,
      FunnelEffect.requestServiceAreaBufferResourceById,
      funnelGenID
    );
  };
};

export const REQUEST_UPDATE_SERVICE_AREA_BUFFER_RESOURCE: string = 'FunnelActions.REQUEST_UPDATE_SERVICE_AREA_BUFFER_RESOURCE';
export const REQUEST_UPDATE_SERVICE_AREA_BUFFER_RESOURCE_FINISHED = 'FunnelActions.REQUEST_UPDATE_SERVICE_AREA_BUFFER_RESOURCE_FINISHED';
export const putServiceAreaBufferResource = (data: ServiceAreaBufferResource): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ServiceAreaBufferResource>(
      dispatch,
      REQUEST_UPDATE_SERVICE_AREA_BUFFER_RESOURCE,
      FunnelEffect.putServiceAreaBufferResource,
      data
    );
  };
};

export const REQUEST_POST_FUNNEL_HEADER_LOCAL: string = 'FunnelActions.REQUEST_POST_FUNNEL_HEADER_LOCAL';
export const REQUEST_POST_FUNNEL_HEADER_LOCAL_FINISHED: string = 'FunnelActions.REQUEST_POST_FUNNEL_HEADER_LOCAL_FINISHED';

export const postFunnelHeaderLocal = (data: FunnelHeaderNameModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelHeaderNameModel>(
      dispatch,
      REQUEST_POST_FUNNEL_HEADER_LOCAL,
      FunnelEffect.postFunnelHeaderLocal,
      data
    );
  };
};

export const REQUEST_FUNNEL_HEADER_LOCAL: string = 'FunnelActions.REQUEST_FUNNEL_HEADER_LOCAL';
export const REQUEST_FUNNEL_HEADER_LOCAL_FINISHED: string = 'FunnelActions.REQUEST_FUNNEL_HEADER_LOCAL_FINISHED';

export const requestFunnelHeaderLocal = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelHeaderNameModel>(dispatch, REQUEST_FUNNEL_HEADER_LOCAL, FunnelEffect.requestFunnelHeaderLocal);
  };
};

export const REQUEST_FUNNELS_SEARCH: string = 'FunnelActions.REQUEST_FUNNELS_SEARCH';
export const REQUEST_FUNNELS_SEARCH_FINISHED: string = 'FunnelActions.REQUEST_FUNNELS_SEARCH_FINISHED';

export const requestSearchFunnel = (
  salesID: number,
  searchText: string,
  page: number,
  pageSize: number,
  type: string,
  column: string,
  sorting: string
): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelDashboardEnvelope>(
      dispatch,
      REQUEST_FUNNELS_SEARCH,
      FunnelEffect.requestSearchFunnel,
      salesID,
      searchText,
      page,
      pageSize,
      type,
      column,
      sorting
    );
  };
};

export const REQUEST_SA_SEARCH: string = 'FunnelActions.REQUEST_SA_SEARCH';
export const REQUEST_SA_SEARCH_FINISHED: string = 'FunnelActions.REQUEST_SA_SEARCH_FINISHED';

export const requestSearchSA = (salesID: number, searchText: string, page: number, pageSize: number, column: string, sorting: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelDashboardEnvelope>(
      dispatch,
      REQUEST_SA_SEARCH,
      FunnelEffect.requestSearchSA,
      salesID,
      searchText,
      page,
      pageSize,
      column,
      sorting
    );
  };
};

export const REQUEST_POST_FUNNEL_FILTER: string = 'FunnelActions.REQUEST_POST_FUNNEL_FILTER';
export const REQUEST_POST_FUNNEL_FILTER_FINISHED: string = 'FunnelActions.REQUEST_POST_FUNNEL_FILTER_FINISHED';

export const postFunnelFilter = (data: FunnelFilter): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelDashboardEnvelope>(dispatch, REQUEST_POST_FUNNEL_FILTER, FunnelEffect.postFunnelFilter, data);
  };
};

export const REQUEST_POST_FUNNELSA_FILTER: string = 'FunnelActions.REQUEST_POST_FUNNELSA_FILTER';
export const REQUEST_POST_FUNNELSA_FILTER_FINISHED: string = 'FunnelActions.REQUEST_POST_FUNNELSA_FILTER_FINISHED';

export const postSAFilter = (data: FunnelFilter): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelDashboardEnvelope>(dispatch, REQUEST_POST_FUNNELSA_FILTER, FunnelEffect.postSAFilter, data);
  };
};

export const REQUEST_VERIFICATION_FUNNEL: string = 'FunnelActions.REQUEST_VERIFICATION_FUNNEL';
export const REQUEST_VERIFICATION_FUNNEL_FINISHED: string = 'FunnelActions.REQUEST_VERIFICATION_FUNNEL_FINISHED';

export const requestVerificationFunnel = (funnelGenID: number, status: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelVerificationModelEnvelope>(
      dispatch,
      REQUEST_VERIFICATION_FUNNEL,
      FunnelEffect.requestVerificationFunnel,
      funnelGenID,
      status
    );
  };
};

export const REQUEST_DEL_FUNNEL: string = 'FunnelActions.REQUEST_DEL_FUNNEL';
export const REQUEST_DEL_FUNNEL_FINISHED: string = 'FunnelActions.REQUEST_DEL_FUNNEL_FINISHED';

export const delFunnel = (funnelGenID: number, userLogin: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_DEL_FUNNEL, FunnelEffect.delFunnel, funnelGenID, userLogin);
  };
};

export const REQUEST_VERIFICATION_FUNNEL_STATUS: string = 'FunnelActions.REQUEST_VERIFICATION_FUNNEL_STATUS';
export const REQUEST_VERIFICATION_FUNNEL_STATUS_FINISHED: string = 'FunnelActions.REQUEST_VERIFICATION_FUNNEL_STATUS_FINISHED';

export const requestVerificationFunnelStatus = (funnelGenID: number, statusID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelVerificationModel>(
      dispatch,
      REQUEST_VERIFICATION_FUNNEL_STATUS,
      FunnelEffect.requestVerificationFunnelStatus,
      funnelGenID,
      statusID
    );
  };
};

export const REQUEST_FUNNEL_DEPARTMENT: string = 'FunnelActions.REQUEST_FUNNEL_DEPARTMENT';
export const REQUEST_FUNNEL_DEPARTMENT_FINISHED: string = 'FunnelActions.REQUEST_FUNNEL_DEPARTMENT_FINISHED';

export const requestFunnelDepartment = (salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelDepartmentModel[]>(
      dispatch,
      REQUEST_FUNNEL_DEPARTMENT,
      FunnelEffect.requestFunnelDepartment,
      salesID
    );
  };
};

export const REQUEST_UPDATE_SOFTWARE: string = 'FunnelActions.REQUEST_UPDATE_SOFTWARE';
export const REQUEST_UPDATE_SOFTWARE_FINISHED = 'FunnelActions.REQUEST_UPDATE_SOFTWARE_FINISHED';
export const putSoftware = (data: FunnelSoftware): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelSoftware>(dispatch, REQUEST_UPDATE_SOFTWARE, FunnelEffect.putSoftware, data);
  };
};

export const REQUEST_VIEW_FUNNEL_COMMISSION_INDEX: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_COMMISSION_INDEX';
export const REQUEST_VIEW_FUNNEL_COMMISSION_INDEX_FINISHED: string = 'FunnelActions.REQUEST_VIEW_FUNNEL_COMMISSION_INDEX_FINISHED';
export const requestViewFunneCommissionIndex = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditCommisionIndex>(
      dispatch,
      REQUEST_VIEW_FUNNEL_COMMISSION_INDEX,
      FunnelEffect.requestViewFunneCommissionIndex,
      funnelGenID
    );
  };
};

export const REQUEST_UPDATE_FUNNEL_COMMISSION_INDEX: string = 'FunnelActions.REQUEST_UPDATE_FUNNEL_COMMISSION_INDEX';
export const REQUEST_UPDATE_FUNNEL_COMMISSION_INDEX_FINISHED = 'FunnelActions.REQUEST_UPDATE_FUNNEL_COMMISSION_INDEX_FINISHED';
export const putViewFunnelCommissionIndex = (data: FunnelViewEditCommisionIndex): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditCommisionIndex>(
      dispatch,
      REQUEST_UPDATE_FUNNEL_COMMISSION_INDEX,
      FunnelEffect.putViewFunnelCommissionIndex,
      data
    );
  };
};

export const REQUEST_FUNNEL_COMMISSION_HISTORY: string = 'FunnelActions.REQUEST_FUNNEL_COMMISSION_HISTORY';
export const REQUEST_FUNNEL_COMMISSION_HISTORY_FINISHED: string = 'FunnelActions.REQUEST_FUNNEL_COMMISSION_HISTORY_FINISHED';

export const requestFunnelCommissionHistory = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelHistoryEnvelope[]>(
      dispatch,
      REQUEST_FUNNEL_COMMISSION_HISTORY,
      FunnelEffect.requestFunnelCommissionHistory,
      funnelGenID
    );
  };
};

export const REQUEST_FUNNEL_AUTHORIZATION: string = 'FunnelActions.REQUEST_FUNNEL_AUTHORIZATION';
export const REQUEST_FUNNEL_AUTHORIZATION_FINISHED: string = 'FunnelActions.REQUEST_FUNNEL_AUTHORIZATION_FINISHED';
export const requestFunnelAuthorization = (funnelGenID: number, userloginID: number, flagOwner: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelAuthorization>(
      dispatch,
      REQUEST_FUNNEL_AUTHORIZATION,
      FunnelEffect.requestFunnelAuthorization,
      funnelGenID,
      userloginID,
      flagOwner
    );
  };
};

export const STATUS_FUNNEL_ACTIVE: string = 'FunnelActions.STATUS_FUNNEL_ACTIVE';
export const funnelStatusActive = (status: boolean): IAction<boolean> => {
  return ActionUtility.createAction(STATUS_FUNNEL_ACTIVE, status);
};

export const RESET_ONE_LEVEL: string = 'FunnelActions.RESET_ONE_LEVEL';
export const resetOneLevel = (reset: boolean): IAction<boolean> => {
  return ActionUtility.createAction(RESET_ONE_LEVEL, reset);
};

export const SHOW_IC_EDIT_NOEDIT_GPM: string = 'FunnelActions.SHOW_IC_EDIT_NOEDIT_GPM';
export const showIcNoEditGpm = (showIc: boolean): IAction<boolean> => {
  return ActionUtility.createAction(SHOW_IC_EDIT_NOEDIT_GPM, showIc);
};

export const REQUEST_ENTRY_PROJECT_STATUS: string = 'FunnelActions.REQUEST_ENTRY_PROJECT_STATUS';
export const REQUEST_ENTRY_PROJECT_STATUS_FINISHED: string = 'FunnelActions.REQUEST_ENTRY_PROJECT_STATUS_FINISHED';

export const REQUEST_ENTRY_WARRANTY_STATUS: string = 'FunnelActions.REQUEST_ENTRY_WARRANTY_STATUS';
export const REQUEST_ENTRY_WARRANTY_STATUS_FINISHED: string = 'FunnelActions.REQUEST_ENTRY_WARRANTY_STATUS_FINISHED';

export const reqDataEntyKeyBy = (by:string, sorting=''): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelEntryKeyByModel[]>(dispatch, by === "ProjectStatus" ? REQUEST_ENTRY_PROJECT_STATUS:REQUEST_ENTRY_WARRANTY_STATUS, FunnelEffect.reqDataEntyKeyBy, by, sorting);
  };
};

export const REQUEST_CURRENCY: string = 'FunnelActions.REQUEST_CURRENCY';
export const REQUEST_CURRENCY_FINISHED: string = 'FunnelActions.REQUEST_CURRENCY_FINISHED';
export const requestCurrency = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelCurrencyUdcModel[]>(dispatch, REQUEST_CURRENCY, FunnelEffect.requestCurrency);
  };
};

export const REQUEST_FUNNEL_HISTORY: string = 'FunnelActions.REQUEST_FUNNEL_HISTORY';
export const REQUEST_FUNNEL_HISTORY_FINISHED: string = 'FunnelActions.REQUEST_FUNNEL_HISTORY_FINISHED';

export const requestFunnelHistoryById = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelHistoryEnvelope[]>(
      dispatch,
      REQUEST_FUNNEL_HISTORY,
      FunnelEffect.requestFunnelHistoryById,
      funnelGenID
    );
  };
};

export const REQUEST_GET_RATE: string = 'FunnelActions.REQUEST_GET_RATE';
export const REQUEST_GET_RATE_FINISHED: string = 'FunnelActions.REQUEST_GET_RATE_FINISHED';
export const requestRate = (currency: string, date: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelRateModel>(dispatch, REQUEST_GET_RATE, FunnelEffect.requestRate, currency, date);
  };
};

//Hendz 07/03/2022
export const REQUEST_PROJECT_CATEGORY_SA: string = 'FunnelActions.REQUEST_PROJECT_CATEGORY_SA';
export const REQUEST_PROJECT_CATEGORY_SA_FINISHED: string = 'FunnelActions.REQUEST_PROJECT_CATEGORY_SA_FINISHED';
export const requestProjectTypeSA = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelCurrencyUdcModel[]>(dispatch, REQUEST_PROJECT_CATEGORY_SA, FunnelEffect.requestProjectCategorySA);
  };
};

//Hendz 27/06/2022
export const REQUEST_COMPLEXITY: string = 'FunnelActions.REQUEST_COMPLEXITY';
export const REQUEST_COMPLEXITY_FINISHED: string = 'FunnelActions.REQUEST_COMPLEXITY_FINISHED';
export const requestComplexity = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelStatusModel[]>(dispatch, REQUEST_COMPLEXITY, FunnelEffect.requestComplexity);
  };
};

export const REQUEST_UPDATE_COMPLEXITY: string = 'FunnelActions.REQUEST_UPDATE_COMPLEXITY';
export const REQUEST_UPDATE_COMPLEXITY_FINISHED = 'FunnelActions.REQUEST_UPDATE_COMPLEXITY_FINISHED';
export const updateComplexity = (Complexity: number, UserLoginID: number, FunnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_UPDATE_COMPLEXITY,
      FunnelEffect.updateComplexity,
      Complexity,
      UserLoginID,
      FunnelGenID
    );
  };
};

export const REQUEST_HITORY_GPM: string = 'FunnelActions.REQUEST_HITORY_GPM';
export const REQUEST_HITORY_GPM_FINISHED: string = 'FunnelActions.REQUEST_HITORY_GPM_FINISHED';

export const getHistoryGPM = (funnelGenID: number,page:number,pageSize:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelHistoryGpm>(dispatch, REQUEST_HITORY_GPM, FunnelEffect.getHistoryGPM, funnelGenID, page, pageSize);
  };
};

export const RESET_FUNNEL_CUSOTMER_BY_ID: string = 'FunnelActions.RESET_FUNNEL_CUSOTMER_BY_ID';
export const resetFunnelCustomerById = (): IAction<boolean> => {
  return ActionUtility.createAction(RESET_FUNNEL_CUSOTMER_BY_ID);
};

export const IS_MY_APPROVAL: string = 'FunnelActions.IS_MY_APPROVAL';
export const myApproval = (myApproval: boolean): IAction<boolean> => {
  return ActionUtility.createAction(IS_MY_APPROVAL, myApproval);
};

export const SET_PAGE: string = 'FunnelActions.SET_PAGE';
export const setActivePage = (activePage: number): IAction<number> => {
  return ActionUtility.createAction(SET_PAGE, activePage);
};

export const REQUEST_UPDATE_FUNNEL_CONFIRMATION: string = 'FunnelActions.REQUEST_UPDATE_FUNNEL_CONFIRMATION';
export const REQUEST_UPDATE_FUNNEL_CONFIRMATION_FINISHED = 'FunnelActions.REQUEST_UPDATE_FUNNEL_CONFIRMATION_FINISHED';
export const putViewFunnelConfirmation = (data: FunnelViewEditConfirmation): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_UPDATE_FUNNEL_CONFIRMATION,
      FunnelEffect.putViewFunnelConfirmation,
      data
    );
  };
};


export const REQUEST_GET_FUNNEL_CONFIRMATION: string = 'FunnelActions.REQUEST_GET_FUNNEL_CONFIRMATION';
export const REQUEST_GET_FUNNEL_CONFIRMATION_FINISHED: string = 'FunnelActions.REQUEST_GET_FUNNEL_CONFIRMATION_FINISHED';

export const requestViewFunnelConfimation = (funnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelViewEditConfirmation>(
      dispatch,
      REQUEST_GET_FUNNEL_CONFIRMATION,
      FunnelEffect.requestViewFunnelConfimation,
      funnelGenID
    );
  };
};

export const REQUEST_FUNNEL_DROPDOWN_CUSTOMER_CONFIRMATION: string = 'FunnelActions.REQUEST_FUNNEL_DROPDOWN_CUSTOMER_CONFIRMATION';
export const REQUEST_FUNNEL_DROPDOWN_CUSTOMER_CONFIRMATION_FINISHED: string = 'FunnelActions.REQUEST_FUNNEL_DROPDOWN_CUSTOMER_CONFIRMATION_FINISHED';

export const requestViewFunnelDropdownCustomerConfimation = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelDropdownConfirmation[]>(
      dispatch,
      REQUEST_FUNNEL_DROPDOWN_CUSTOMER_CONFIRMATION,
      FunnelEffect.requestViewFunnelDropdownCustomerConfimation,
    );
  };
};

export const REQUEST_FUNNEL_DROPDOWN_USER_CONFIRMATION: string = 'FunnelActions.REQUEST_FUNNEL_DROPDOWN_USER_CONFIRMATION';
export const REQUEST_FUNNEL_DROPDOWN_USER_CONFIRMATION_FINISHED: string = 'FunnelActions.REQUEST_FUNNEL_DROPDOWN_USER_CONFIRMATION_FINISHED';

export const requestViewFunnelDropdownUserConfimation = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<FunnelDropdownConfirmation[]>(
      dispatch,
      REQUEST_FUNNEL_DROPDOWN_USER_CONFIRMATION,
      FunnelEffect.requestViewFunnelDropdownUserConfimation,
    );
  };
};

export const SET_IS_EXPORT_EXCEL: string = 'FunnelActions.SET_IS_EXPORT_EXCEL';
export const setExportExcel = (isExport: boolean): IAction<boolean> => {
  return ActionUtility.createAction(SET_IS_EXPORT_EXCEL, isExport);
};

export const CONFIG_COLUMNS: string = 'FunnelActions.CONFIG_COLUMNS';
export const setColumns = (columns: FunnelConfigColumnModel): IAction<FunnelConfigColumnModel> => {
  return ActionUtility.createAction(CONFIG_COLUMNS, columns);
};