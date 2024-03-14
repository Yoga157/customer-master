import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import IAction from 'models/IAction';
import { ReduxDispatch } from 'models/ReduxProps';
import ResultActions from 'models/ResultActions';
import * as ActionUtility from './../../../utilities/ActionUtility';
import * as FunnelSalesAnalystEffects from './FunnelSalesAnalystEffects';
import CancelProjectModel from './models/CancelProjectModel';
import ReOpenProjectModel from './models/ReOpenProjectModel';
import SalesAnalystModel from './models/SalesAnalystModel';
import SalesAnalystSubmitApprovalModel from './models/SalesAnalystSubmitApprovalModel';
import SalesAnalystWorkflowModel from './models/SalesAnalystWorkflowModel';
import DropdownSalesAdminModel from './models/DropdownSalesAdminModel';
import IStore from '../../../models/IStore';
import CheckUserReopenApprovalModel from './models/CheckUserReopenApprovalModel';
import GetActivityReqReopenSAModel from './models/GetActivityReqReopenSAModel';
import GetContractOfDateSAModel from './models/GetContractOfDateSAModel';
import { AssignSalesAdminModel } from './models/AssignSalesAdminModel';

type ActionUnion =
  | undefined
  | boolean
  | HttpErrorResponseModel
  | ResultActions
  | SalesAnalystModel
  | SalesAnalystWorkflowModel
  | SalesAnalystSubmitApprovalModel
  | ReOpenProjectModel
  | CheckUserReopenApprovalModel
  | GetActivityReqReopenSAModel[]
  | DropdownSalesAdminModel[]
  | CancelProjectModel
  | AssignSalesAdminModel
  | GetContractOfDateSAModel;

export const REQUEST_DROPDOWN_SALESADMIN: string = 'FunnelSalesAnalystActions.REQUEST_DROPDOWN_SALESADMIN';
export const REQUEST_DROPDOWN_SALESADMIN_FINISHED: string = 'FunnelSalesAnalystActions.REQUEST_DROPDOWN_SALESADMIN_FINISHED';

export const requestDropdownSalesAdmin = (salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<DropdownSalesAdminModel[]>(
      dispatch,
      REQUEST_DROPDOWN_SALESADMIN,
      FunnelSalesAnalystEffects.requestDropdownSalesAdmin,
      salesID
    );
  };
};

export const REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMITAPPROVAL: string = 'FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMITAPPROVAL';
export const REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMITAPPROVAL_FINISHED: string =
  'FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMITAPPROVAL_FINISHED';

export const requestPostFunnelAnalystSubmitApproval = (data: SalesAnalystSubmitApprovalModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>) => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMITAPPROVAL,
      FunnelSalesAnalystEffects.requestPostFunnelAnalystSubmitApproval,
      data
    );
  };
};

export const REQUEST_POST_FUNNEL_REOPEN_PROJECT: string = 'FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_REOPEN_PROJECT';
export const REQUEST_POST_FUNNEL_REOPEN_PROJECT_FINISHED: string = 'FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_REOPEN_PROJECT_FINISHED';

export const requestPostFunnelReOpenProject = (data: ReOpenProjectModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>) => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_POST_FUNNEL_REOPEN_PROJECT,
      FunnelSalesAnalystEffects.requestPostFunnelReOpenProject,
      data
    );
  };
};

export const REQUEST_GET_ACTIVITY_REOPEN_SA: string = 'FunnelSalesAnalystActions.REQUEST_GET_ACTIVITY_REOPEN_SA';
export const REQUEST_GET_ACTIVITY_REOPEN_SA_FINISHED: string = 'FunnelSalesAnalystActions.REQUEST_GET_ACTIVITY_REOPEN_SA_FINISHED';

export const getActivityReqReopenSA = (FunnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>) => {
    await ActionUtility.createThunkEffect<GetActivityReqReopenSAModel[]>(
      dispatch,
      REQUEST_GET_ACTIVITY_REOPEN_SA,
      FunnelSalesAnalystEffects.getActivityReqReopenSA,
      FunnelGenID
    );
  };
};

export const REQUEST_CHECK_USER_REOPEN_APPROVAL: string = 'FunnelSalesAnalystActions.REQUEST_CHECK_USER_REOPEN_APPROVAL';
export const REQUEST_CHECK_USER_REOPEN_APPROVAL_FINISHED: string = 'FunnelSalesAnalystActions.REQUEST_CHECK_USER_REOPEN_APPROVAL_FINISHED';

export const checkUserReopenApproval = (FunnelGenID:number,userLoginID:number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>) => {
    await ActionUtility.createThunkEffect<CheckUserReopenApprovalModel>(
      dispatch,
      REQUEST_CHECK_USER_REOPEN_APPROVAL,
      FunnelSalesAnalystEffects.checkUserReopenApproval,
      FunnelGenID,
      userLoginID,
    );
  };
};

export const REQUEST_POST_FUNNEL_CANCEL_PROJECT: string = 'FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_CANCEL_PROJECT';
export const REQUEST_POST_FUNNEL_CANCEL_PROJECT_FINISHED: string = 'FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_CANCEL_PROJECT_FINISHED';

export const requestPostFunnelCancelProject = (data: CancelProjectModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>) => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_POST_FUNNEL_CANCEL_PROJECT,
      FunnelSalesAnalystEffects.requestPostFunnelCancelProject,
      data
    );
  };
};

export const REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMIT: string = 'FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMIT';
export const REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMIT_FINISHED: string =
  'FunnelSalesAnalystActions.REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMIT_FINISHED';

export const requestPostFunnelAnalystSubmit = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>) => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_POST_FUNNEL_SALES_ANALYST_SUBMIT,
      FunnelSalesAnalystEffects.postFunnelSalestAnalistSubmit,
      data
    );
  };
};

export const REQUEST_PUT_FUNNEL_SALES_ANALYST_RESUBMIT: string = 'FunnelSalesAnalystActions.REQUEST_PUT_FUNNEL_SALES_ANALYST_RESUBMIT';
export const REQUEST_PUT_FUNNEL_SALES_ANALYST_RESUBMIT_FINISHED: string =
  'FunnelSalesAnalystActions.REQUEST_PUT_FUNNEL_SALES_ANALYST_RESUBMIT_FINISHED';

export const requestPutFunnelAnalystReSubmit = (data: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>) => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      REQUEST_PUT_FUNNEL_SALES_ANALYST_RESUBMIT,
      FunnelSalesAnalystEffects.requestPutFunnelAnalystReSubmit,
      data
    );
  };
};

export const REMOVE_SUBMIT_RESULT: string = 'FunnelSalesAnalystActions.REMOVE_SUBMIT_RESULT';
export const REMOVE_SUBMIT_RESULT_FINISHED = 'FunnelSalesAnalystActions.REMOVE_SUBMIT_RESULT_FINISHED';

export const removeResult = (): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REMOVE_SUBMIT_RESULT, FunnelSalesAnalystEffects.removeResult);
  };
};

export const REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW: string = 'FunnelSalesAnalystActions.REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW';
export const REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW_FINISHED: string =
  'FunnelSalesAnalystActions.REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW_FINISHED';

export const requestGetFunnelAnalystWorkflow = (FunnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>) => {
    await ActionUtility.createThunkEffect<SalesAnalystWorkflowModel>(
      dispatch,
      REQUEST_GET_FUNNEL_SALES_ANALYST_WORKFLOW,
      FunnelSalesAnalystEffects.requestGetFunnelAnalystWorkflow,
      FunnelGenID
    );
  };
};

export const REQUEST_GET_CONTRACT_Of_DATE_SA: string = 'FunnelSalesAnalystActions.REQUEST_GET_CONTRACT_Of_DATE_SA';
export const REQUEST_GET_CONTRACT_Of_DATE_SA_FINISHED: string =
  'FunnelSalesAnalystActions.REQUEST_GET_CONTRACT_Of_DATE_SA_FINISHED';

export const requestGetContractOfDateSA = (FunnelGenID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>) => {
    await ActionUtility.createThunkEffect<GetContractOfDateSAModel>(
      dispatch,
      REQUEST_GET_CONTRACT_Of_DATE_SA,
      FunnelSalesAnalystEffects.requestGetContractOfDateSA,
      FunnelGenID
    );
  };
};

export const REQUEST_POST_ASSIGN_SALES_ADMIN: string = 'FunnelSalesAnalystActions.REQUEST_POST_ASSIGN_SALES_ADMIN';
export const REQUEST_POST_ASSIGN_SALES_ADMIN_FINISHED = 'FunnelSalesAnalystActions.REQUEST_POST_ASSIGN_SALES_ADMIN_FINISHED';
export const postAssignSalesAdmin = (data: AssignSalesAdminModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    try {
      await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_ASSIGN_SALES_ADMIN, FunnelSalesAnalystEffects.postAssignSalesAdmin, data);
    } catch (error) {
      console.log('Error', error);
    }
  };
};

export const IS_PRESALES_WORKFLOW: string = 'FunnelSalesAnalystActions.IS_PRESALES_WORKFLOW';
export const presalesWorkflow = (status: boolean): IAction<boolean> => {
  return ActionUtility.createAction(IS_PRESALES_WORKFLOW, status);
};

export const SHOW_IC_EDIT: string = 'FunnelSalesAnalystActions.SHOW_IC_EDIT';
export const showICEdit = (status: boolean): IAction<boolean> => {
  return ActionUtility.createAction(SHOW_IC_EDIT, status);
};
