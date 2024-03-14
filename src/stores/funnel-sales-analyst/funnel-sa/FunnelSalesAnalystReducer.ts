import { Reducer } from 'redux';
import IAction from 'models/IAction';
import baseReducer from 'utilities/BaseReducer';
import * as FunnelSalesAnalystActions from './FunnelSalesAnalystActions';
import IFunnelSalesAnalystState from './models/IFunnelSalesAnalystState';
import SalesAnalystWorkflowModel from './models/SalesAnalystWorkflowModel';
import DropdownSalesAdminModel from './models/DropdownSalesAdminModel';
import CheckUserReopenApprovalModel from './models/CheckUserReopenApprovalModel';
import ResultActions from 'models/ResultActions';
import GetContractOfDateSAModel from './models/GetContractOfDateSAModel';

export const initialState: IFunnelSalesAnalystState = {
  contractOfDate: new GetContractOfDateSAModel({}),
  isApproval: new CheckUserReopenApprovalModel({}),
  listWorkFlow: new SalesAnalystWorkflowModel({}),
  resultActions: new ResultActions({}),
  activityReopenList: [],
  refreshPage: false,
  dataDropdownSA: [],
  isPresalesWorkflow: false,
  isIcEdit: false,
  error: false,
};

const FunnelSalesAnalystReducer: Reducer = baseReducer(initialState, {
  [FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMITAPPROVAL_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<any>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      error: false,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelSalesAnalystActions.REQUEST_DROPDOWN_SALESADMIN_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<DropdownSalesAdminModel[]>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      dataDropdownSA: action.payload!,
    };
  },

  [FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_REOPEN_PROJECT_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<any>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      error: false,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelSalesAnalystActions.REQUEST_GET_ACTIVITY_REOPEN_SA_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<any>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      error: false,
      refreshPage: action.error ? false : true,
      activityReopenList: action.payload!,
    };
  },

  [FunnelSalesAnalystActions.REQUEST_CHECK_USER_REOPEN_APPROVAL_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<any>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      error: false,
      refreshPage: action.error ? false : true,
      isApproval: action.payload!,
    };
  },

  [FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_CANCEL_PROJECT_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<any>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      error: false,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMIT_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<any>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelSalesAnalystActions.REQUEST_PUT_FUNNEL_SALES_ANALYST_RESUBMIT_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<any>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelSalesAnalystActions.REMOVE_SUBMIT_RESULT](state: IFunnelSalesAnalystState, action: IAction<ResultActions>): IFunnelSalesAnalystState {
    return {
      ...state,
      resultActions: action.payload!,
      error: action.error!,
      refreshPage: action.error ? false : true,
    };
  },

  [FunnelSalesAnalystActions.REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<SalesAnalystWorkflowModel>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      listWorkFlow: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelSalesAnalystActions.REQUEST_GET_CONTRACT_Of_DATE_SA_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<GetContractOfDateSAModel>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      contractOfDate: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  
  [FunnelSalesAnalystActions.REQUEST_POST_ASSIGN_SALES_ADMIN_FINISHED](
    state: IFunnelSalesAnalystState,
    action: IAction<any>
  ): IFunnelSalesAnalystState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [FunnelSalesAnalystActions.IS_PRESALES_WORKFLOW](state: IFunnelSalesAnalystState, action: IAction<boolean>): IFunnelSalesAnalystState {
    return {
      ...state,
      isPresalesWorkflow: action.payload!,
      error: false,
      refreshPage: false,
    };
  },

  [FunnelSalesAnalystActions.SHOW_IC_EDIT](state: IFunnelSalesAnalystState, action: IAction<boolean>): IFunnelSalesAnalystState {
    return {
      ...state,
      isIcEdit: action.payload!,
      error: false,
      refreshPage: false,
    };
  },
});

export default FunnelSalesAnalystReducer;
