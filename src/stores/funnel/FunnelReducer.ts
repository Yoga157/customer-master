import IFunnelState from './models/IFunnelState';
import * as FunnelActions from './FunnelActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import FunnelDashboardEnvelope from './models/FunnelDashboardEnvelope';
import FunnelModel from './models/FunnelModel';
import FunnelViewEditStatus from './models/view-edit/FunnelViewEditStatus';
import FunnelViewEditCustomer from './models/view-edit/FunnelViewEditCustomer';
import FunnelViewEditSelling from './models/view-edit/FunnelViewEditSelling';
import FunnelViewEditCustomerPO from './models/view-edit/FunnelViewEditCustomerPO';
import FunnelViewEditAdditional from './models/view-edit/FunnelViewEditAdditional';
import FunnelHeaderNameModel from './models/FunnelHeaderNameModel';
import FunnelSoftware from './models/view-edit/FunnelSoftware';
import { FunnelViewEditConfirmation, ServiceAreaBufferResource } from './models/view-edit';
import ResultActions from 'models/ResultActions';
import FunnelViewEditCustomerDetails from './models/view-edit/FunnelViewEditCustomerDetails';
import FunnelVerificationModelEnvelope from './models/FunnelVerificationModelEnvelope';
import FunnelVerificationModel from './models/FunnelVerificationModel';
import FunnelDepartmentModel from './models/FunnelDepartmentModel';
import FunnelViewEditCommisionIndex from './models/view-edit/FunnelViewEditCommisionIndex';
import FunnelAuthorization from './models/FunnelAuthorization';
import FunnelCurrencyUdcModel from './models/FunnelCurrencyUdcModel';
import FunnelStatusModel from '../funnel-status/models/FunnelStatusModel';
import FunnelHistoryEnvelope from './models/FunnelHistoryEnvelope';
import FunnelRateModel from './models/FunnelRateModel';
import FunnelHistoryGpm from './models/FunnelHistoryGpm';
import FunnelEntryKeyByModel from './models/FunnelEntryKeyByModel';
import FunnelViewEditCustomerByProjectId from './models/view-edit/FunnelViewEditCustomerByProjectId';
import EmployeeHierarcyModel from 'stores/employee/models/EmployeeHierarcyModel';
import FunnelDropdownConfirmation from './models/FunnelDropdownConfirmation';
import ConfigTableColumn from 'views/funnel-page/components/search/ConfigTableColumn';
import FunnelConfigColumnModel from './models/FunnelConfigColumnModel';

export const initialState: IFunnelState = {
  data: new FunnelDashboardEnvelope({}),
  firstData: new FunnelModel({}),
  funnelViewEditStatus: new FunnelViewEditStatus({}),
  funnelViewEditCustomer: new FunnelViewEditCustomer({}),
  funnelViewEditSelling: new FunnelViewEditSelling({}),
  funnelViewEditCustomerPO: new FunnelViewEditCustomerPO({}),
  funnelViewEditAdditional: new FunnelViewEditAdditional({}),
  funnelServiceAreaBufferResource: new ServiceAreaBufferResource({}),
  funnelViewEditCustomerDetails: new FunnelViewEditCustomerDetails({}),
  funnelViewEditCommissionIndex: new FunnelViewEditCommisionIndex({}),
  funnelViewEditStatusProjectId: new FunnelViewEditCustomerByProjectId({}),
  columns: new FunnelConfigColumnModel({}),
  error: false,
  refreshPage: false,
  funnelHeader: new FunnelHeaderNameModel({}),
  resultActions: new ResultActions({}),
  funnelVerification: new FunnelVerificationModelEnvelope({}),
  funnelVerificationStatus: new FunnelVerificationModel({}),
  funnelDepartment: [],
  funnelAuthorization: new FunnelAuthorization({}),
  isFunnelStatusActive: false,
  isResetOneLevel: false,
  isShowIcNoEditGpm: false,
  isExportExl: false,
  dataCurrency: [],
  dataPMOProjectStatus: [],
  dataPMOWarrantyStatus: [],
  dataProjectCategorySA: [],
  complexity: [],
  employee: [],
  funnelHistory: [],
  funnelHistoryGpm: new FunnelHistoryGpm({}),
  funnelCommissionHistory: [],
  rate: new FunnelRateModel({}),
  funnelConfirmation: new FunnelViewEditConfirmation({}),
  funnelDropdownCustomerConfirmation: [],
  funnelDropdownUserConfirmation: [],
  isMyApproval: false,
  activePage: 1,
};

const funnelReducer: Reducer = baseReducer(initialState, {
  [FunnelActions.REQUEST_RESET_STATE](state: IFunnelState, action: IAction<boolean>): IFunnelState {
    return initialState;
  },

  [FunnelActions.REMOVE_SUBMIT_RESULT_FINISHED](state: IFunnelState, action: IAction<ResultActions>): IFunnelState {
    
    return {
      ...state,
      resultActions: new ResultActions({}),
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_FUNNELS_FINISHED](state: IFunnelState, action: IAction<FunnelDashboardEnvelope>): IFunnelState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_SAS_FINISHED](state: IFunnelState, action: IAction<FunnelDashboardEnvelope>): IFunnelState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_FUNNELS_SEARCH_FINISHED](state: IFunnelState, action: IAction<FunnelDashboardEnvelope>): IFunnelState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_SA_SEARCH_FINISHED](state: IFunnelState, action: IAction<FunnelDashboardEnvelope>): IFunnelState {
    return {
      ...state,
      data: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_FUNNEL_FINISHED](state: IFunnelState, action: IAction<FunnelModel>): IFunnelState {
    return {
      ...state,
      firstData: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_VIEW_FUNNEL_STATUS_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditStatus>): IFunnelState {
    return {
      ...state,
      funnelViewEditStatus: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_UPDATE_FUNNEL_STATUS_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditStatus>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActions.REQUEST_UPDATE_FUNNEL_CUSTOMER_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditCustomer>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActions.VIEW_CUSTOMER_BY_PROJECTID_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditCustomerByProjectId>): IFunnelState {
    return {
      ...state,
      funnelViewEditStatusProjectId: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActions.UPDATE_FUNNEL_CUSTOMER_ESTIMATION_BY_PMO_FINISHED](state: IFunnelState, action: IAction<ResultActions>): IFunnelState {
    return {
      ...state,
      resultActions: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActions.REQUEST_UPDATE_PROJECT_ALIAS_FINISHED](state: IFunnelState, action: IAction<any>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      // refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER_DETAIL_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditCustomerDetails>): IFunnelState {
    return {
      ...state,
      funnelViewEditCustomerDetails: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditCustomer>): IFunnelState {
    return {
      ...state,
      funnelViewEditCustomer: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_SALES_SPESIALIS_FINISHED](state: IFunnelState, action: IAction<EmployeeHierarcyModel[]>): IFunnelState {
    return {
      ...state,
      employee: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_VIEW_FUNNEL_SELLING_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditSelling>): IFunnelState {
    return {
      ...state,
      funnelViewEditSelling: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_UPDATE_FUNNEL_SELLING_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditSelling>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActions.REQUEST_UPDATE_SOFTWARE_FINISHED](state: IFunnelState, action: IAction<FunnelSoftware>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActions.REQUEST_UPDATE_FUNNEL_CUSTOMER_PO_FINISHED]
  (state: IFunnelState, action: IAction<any>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelActions.REQUEST_VIEW_FUNNEL_CUSTOMER_PO_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditCustomerPO>): IFunnelState {
    return {
      ...state,
      funnelViewEditCustomerPO: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_VIEW_FUNNEL_ADDITIONAL_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditAdditional>): IFunnelState {
    return {
      ...state,
      funnelViewEditAdditional: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_VERIFICATION_FUNNEL_FINISHED](state: IFunnelState, action: IAction<FunnelVerificationModelEnvelope>): IFunnelState {
    return {
      ...state,
      funnelVerification: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_VERIFICATION_FUNNEL_STATUS_FINISHED](state: IFunnelState, action: IAction<FunnelVerificationModel>): IFunnelState {
    return {
      ...state,
      funnelVerificationStatus: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_FUNNEL_DEPARTMENT_FINISHED](state: IFunnelState, action: IAction<FunnelDepartmentModel[]>): IFunnelState {
    return {
      ...state,
      funnelDepartment: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_UPDATE_SERVICE_AREA_BUFFER_RESOURCE_FINISHED](
    state: IFunnelState,
    action: IAction<ServiceAreaBufferResource>
  ): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActions.REQUEST_SERVICE_AREA_BUFFER_RESOURCE_FINISHED](state: IFunnelState, action: IAction<ServiceAreaBufferResource>): IFunnelState {
    return {
      ...state,
      funnelServiceAreaBufferResource: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
  [FunnelActions.REQUEST_FUNNEL_HEADER_LOCAL_FINISHED](state: IFunnelState, action: IAction<FunnelHeaderNameModel>): IFunnelState {
    return {
      ...state,
      funnelHeader: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_POST_FUNNEL_FINISHED](state: IFunnelState, action: IAction<ResultActions>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelActions.REQUEST_POST_FUNNEL_FILTER_FINISHED](state: IFunnelState, action: IAction<FunnelDashboardEnvelope>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: false,
      data: action.payload!,
    };
  },

  [FunnelActions.REQUEST_POST_FUNNELSA_FILTER_FINISHED](state: IFunnelState, action: IAction<FunnelDashboardEnvelope>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: false,
      data: action.payload!,
    };
  },

  [FunnelActions.REQUEST_DEL_FUNNEL_FINISHED](state: IFunnelState, action: IAction<ResultActions>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelActions.REQUEST_UPDATE_FUNNEL_COMMISSION_INDEX_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditCommisionIndex>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActions.REQUEST_FUNNEL_COMMISSION_HISTORY_FINISHED](state: IFunnelState, action: IAction<FunnelHistoryEnvelope[]>): IFunnelState {
    return {
      ...state,
      funnelCommissionHistory: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActions.REQUEST_VIEW_FUNNEL_COMMISSION_INDEX_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditCommisionIndex>): IFunnelState {
    return {
      ...state,
      funnelViewEditCommissionIndex: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_FUNNEL_AUTHORIZATION_FINISHED](state: IFunnelState, action: IAction<FunnelAuthorization>): IFunnelState {
    return {
      ...state,
      funnelAuthorization: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.STATUS_FUNNEL_ACTIVE](state: IFunnelState, action: IAction<boolean>): IFunnelState {
    return {
      ...state,
      isFunnelStatusActive: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.RESET_ONE_LEVEL](state: IFunnelState, action: IAction<boolean>): IFunnelState {
    return {
      ...state,
      isResetOneLevel: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.SHOW_IC_EDIT_NOEDIT_GPM](state: IFunnelState, action: IAction<boolean>): IFunnelState {
    return {
      ...state,
      isShowIcNoEditGpm: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelActions.REQUEST_ENTRY_PROJECT_STATUS_FINISHED](state: IFunnelState, action: IAction<FunnelEntryKeyByModel[]>): IFunnelState {
    return {
      ...state,
      dataPMOProjectStatus: action.payload!,
    };
  },

  [FunnelActions.REQUEST_ENTRY_WARRANTY_STATUS_FINISHED](state: IFunnelState, action: IAction<FunnelEntryKeyByModel[]>): IFunnelState {
    return {
      ...state,
      dataPMOWarrantyStatus: action.payload!,
    };
  },

  [FunnelActions.REQUEST_CURRENCY_FINISHED](state: IFunnelState, action: IAction<FunnelCurrencyUdcModel[]>): IFunnelState {
    return {
      ...state,
      dataCurrency: action.payload!,
    };
  },

  //Hendz 07/03/2022
  [FunnelActions.REQUEST_PROJECT_CATEGORY_SA_FINISHED](state: IFunnelState, action: IAction<FunnelCurrencyUdcModel[]>): IFunnelState {
    return {
      ...state,
      dataProjectCategorySA: action.payload!,
    };
  },

  //Hendz 27/06/2022
  [FunnelActions.REQUEST_COMPLEXITY_FINISHED](state: IFunnelState, action: IAction<FunnelStatusModel[]>): IFunnelState {
    return {
      ...state,
      complexity: action.payload!,
    };
  },

  [FunnelActions.REQUEST_UPDATE_COMPLEXITY_FINISHED](state: IFunnelState, action: IAction<any>): IFunnelState {
    return {
      ...state,
      error: action.error!,
      // refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelActions.REQUEST_FUNNEL_HISTORY_FINISHED](state: IFunnelState, action: IAction<FunnelHistoryEnvelope[]>): IFunnelState {
    return {
      ...state,
      funnelHistory: action.payload!,
    };
  },

  [FunnelActions.REQUEST_GET_RATE_FINISHED](state: IFunnelState, action: IAction<FunnelRateModel>): IFunnelState {
    return {
      ...state,
      rate: action.payload!,
    };
  },

  [FunnelActions.REQUEST_HITORY_GPM_FINISHED](state: IFunnelState, action: IAction<FunnelHistoryGpm>): IFunnelState {
    return {
      ...state,
      funnelHistoryGpm: action.payload!,
    };
  },

  [FunnelActions.RESET_FUNNEL_CUSOTMER_BY_ID](state: IFunnelState, action: IAction<boolean>): IFunnelState {
    return {
      ...state,
      funnelViewEditCustomer: new FunnelViewEditCustomer({}),
    };
  },

  [FunnelActions.IS_MY_APPROVAL](state: IFunnelState, action: IAction<boolean>): IFunnelState {
    return {
      ...state,
      isMyApproval: action.payload!,   
    };
  },

  [FunnelActions.SET_PAGE](state: IFunnelState, action: IAction<number>): IFunnelState {
    return {
      ...state,
      activePage: action.payload!,   
    };
  },

  [FunnelActions.REQUEST_UPDATE_FUNNEL_CONFIRMATION_FINISHED](state: IFunnelState, action: IAction<ResultActions>): IFunnelState {
    return {
      ...state,
      resultActions: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelActions.REQUEST_GET_FUNNEL_CONFIRMATION_FINISHED](state: IFunnelState, action: IAction<FunnelViewEditConfirmation>): IFunnelState {
    return {
      ...state,
      funnelConfirmation: action.payload!,
    };
  },

  [FunnelActions.REQUEST_FUNNEL_DROPDOWN_CUSTOMER_CONFIRMATION_FINISHED](state: IFunnelState, action: IAction<FunnelDropdownConfirmation[]>): IFunnelState {
    return {
      ...state,
      funnelDropdownCustomerConfirmation: action.payload!,
    };
  },

  [FunnelActions.REQUEST_FUNNEL_DROPDOWN_USER_CONFIRMATION_FINISHED](state: IFunnelState, action: IAction<FunnelDropdownConfirmation[]>): IFunnelState {
    return {
      ...state,
      funnelDropdownUserConfirmation: action.payload!,
    };
  },

  [FunnelActions.SET_IS_EXPORT_EXCEL](state: IFunnelState, action: IAction<boolean>): IFunnelState {
    return {
      ...state,
      isExportExl: action.payload!,   
    };
  },

  [FunnelActions.CONFIG_COLUMNS](state: IFunnelState, action: IAction<FunnelConfigColumnModel>): IFunnelState {
    return {
      ...state,
      columns: action.payload!,   
    };
  },

});

export default funnelReducer;
