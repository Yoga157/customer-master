import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import ResultActions from 'models/ResultActions';
import environment from 'environment';
import ListDelegationModel from './models/ListDelegationModel';
import DelegationModel from './models/DelegationModel';
import ListAplicationModel from './models/ListAplicationModel';


export const requestDelegation = async (
  userLoginID: number,
  page: number,
  pageSize: number,
  searchText?: string
): Promise<ListDelegationModel | HttpErrorResponseModel> => {
  let controllerName:string
  if(searchText){
    controllerName=`FunnelDelegasi/GetListDashboardByUserID?page=${page}&pageSize=${pageSize}&userLoginID=${userLoginID}&SearchText=${searchText}`
  }else{
    controllerName=`FunnelDelegasi/GetListDashboardByUserID?page=${page}&pageSize=${pageSize}&userLoginID=${userLoginID}`
  }

  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<ListDelegationModel>(ListDelegationModel, endpoint);
};

export const postDelegation = async (data: DelegationModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FunnelDelegasi';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const putDelegation = async (data: DelegationModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'FunnelDelegasi/Update';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const deleteDelegation = async (id: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `FunnelDelegasi/DeleteByDelegasiID?DelegasiID=${id}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const requestDelegationById = async (DelegationByID: number): Promise<DelegationModel | HttpErrorResponseModel> => {
  const controllerName = `FunnelDelegasi/GetViewEditByDelegasiID?DelegasiID=${DelegationByID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<DelegationModel>(DelegationModel, endpoint);
};

export const requestApplication = async (): Promise<ListAplicationModel[] | HttpErrorResponseModel> => {
  const controllerName = `Udc/GetByEntryKey/DelegasiApplication`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<ListAplicationModel[]>(ListAplicationModel, endpoint);
};

export const removeResult= async():Promise<ResultActions | HttpErrorResponseModel > => {
 let clearResult = new ResultActions({})

  return clearResult
};