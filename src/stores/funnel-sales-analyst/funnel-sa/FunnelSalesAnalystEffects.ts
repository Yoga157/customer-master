import environment from 'environment';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import * as EffectUtility from './../../../utilities/EffectUtility';
import SalesAnalystWorkflowModel from './models/SalesAnalystWorkflowModel';
import DropdownSalesAdminModel from './models/DropdownSalesAdminModel';

import ResultActions from 'models/ResultActions';
import CheckUserReopenApprovalModel from './models/CheckUserReopenApprovalModel';
import GetActivityReqReopenSAModel from './models/GetActivityReqReopenSAModel';
import GetContractOfDateSAModel from './models/GetContractOfDateSAModel';
import { AssignSalesAdminModel } from './models/AssignSalesAdminModel';

export const requestDropdownSalesAdmin = async (salesID: number): Promise<DropdownSalesAdminModel[] | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSalesAnalyst/DropdownSalesAdmin?SalesID=' + salesID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownSalesAdminModel[]>(DropdownSalesAdminModel, endpoint);
};

export const requestPostFunnelAnalystSubmitApproval = async (data: any): Promise<ResultActions | HttpErrorResponseModel | ResultActions> => {
  const controllerName = 'FunnelSalesAnalyst/SubmitApproval';
  const endpoint = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestPostFunnelReOpenProject = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSalesAnalyst/ReopenProject';
  const endpoint = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const getActivityReqReopenSA = async (FunnelGenID: number): Promise<GetActivityReqReopenSAModel[] | HttpErrorResponseModel> => {
  const controllerName = `FunnelActivity/GetActivityReqReopenSA?FunnelGenID=${FunnelGenID}`;
  const endpoint = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<GetActivityReqReopenSAModel[]>(GetActivityReqReopenSAModel, endpoint);
};

export const checkUserReopenApproval = async (FunnelGenID:number,userLoginID:number): Promise<CheckUserReopenApprovalModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelSalesAnalyst/CheckUserReopenApproval?FunnelGenID=${FunnelGenID}&userLoginID=${userLoginID}`;
  const endpoint = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<CheckUserReopenApprovalModel>(CheckUserReopenApprovalModel, endpoint);
};

export const requestPostFunnelCancelProject = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSalesAnalyst/Cancel';
  const endpoint = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const postFunnelSalestAnalistSubmit = async (data: ResultActions): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSalesAnalyst/Submit';
  const endpoint = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestPutFunnelAnalystReSubmit = async (data: ResultActions): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSalesAnalyst/Resubmit';
  const endpoint = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const removeResult = async (): Promise<ResultActions | HttpErrorResponseModel> => {
  const clearResult = new ResultActions({});
  return clearResult;
};

export const requestGetFunnelAnalystWorkflow = async (FunnelGenID: number): Promise<SalesAnalystWorkflowModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelSalesAnalyst/GetWorkflowByHeader?FunnelGenID=${FunnelGenID}`;
  const endpoint = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<SalesAnalystWorkflowModel>(SalesAnalystWorkflowModel, endpoint);
};

export const requestGetContractOfDateSA = async (FunnelGenID: number): Promise<GetContractOfDateSAModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelSalesAnalyst/GetContractOfDateSA?FunnelGenID=${FunnelGenID}`;
  const endpoint = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<GetContractOfDateSAModel>(GetContractOfDateSAModel, endpoint);
};

export const postAssignSalesAdmin = async (data: AssignSalesAdminModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FunnelSalesAnalyst/AssignSalesAdmin';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};