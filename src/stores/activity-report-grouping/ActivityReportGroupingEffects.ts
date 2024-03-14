import environment from 'environment';
import * as EffectUtility from '../../utilities/EffectUtility';
import HttpErrorResponseModel from 'models/HttpErrorResponseModel';
import ResultActions from 'models/ResultActions';
import DropdownARGroupingModel from './models/DropdownARGroupingModel';
import SearchByOptionsModel from './models/SearchByOptionsModel';
import SearchResultEnvelope from './models/SearchResult/SearchResultEnvelope';
import ActivityReportGroupingEnvelope from './models/ActivityReportGrouping/ActivityReportGroupingEnvelope';
import ActivityReportGroupingPostModel from './models/ActivityReportGroupingPostModel';
import ActivityReportGroupingPutModel from './models/ActivityReportGroupingPutModel';
import ActivityReportGroupingFilter from './models/ActivityReportGroupingFilter';
import ActivityReportGroupingDetailModel from './models/ActivityReportGroupingDetail/ActivityReportGroupingDetailModel';
import RoleFlagARGroupingModel from './models/RoleFlagARGroupingModel';

// ============================================================================
export const RequestActivityReportGrouping = async (page: number, pageSize: number, column: string, sorting: string, userLoginId: number): Promise<ActivityReportGroupingEnvelope | HttpErrorResponseModel> => {
  const controllerName = `ActivityReportGroup/Dashboard?userLoginId=${userLoginId}&page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}`;
 
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<ActivityReportGroupingEnvelope>(ActivityReportGroupingEnvelope, endpoint);
};
// ============================================================================
export const RequestActivityReportGroupingSearch = async (page: number, pageSize: number, column: string, sorting: string, search: string, userLoginId: number): Promise<ActivityReportGroupingEnvelope | HttpErrorResponseModel> => {
  const controllerName = `ActivityReportGroup/Search?userLoginId=${userLoginId}&page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&search=${search}`;
 
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<ActivityReportGroupingEnvelope>(ActivityReportGroupingEnvelope, endpoint);
};
// ============================================================================
export const RequestActivityReportGroupingFilter = async (data: ActivityReportGroupingFilter): Promise<ActivityReportGroupingEnvelope | HttpErrorResponseModel> => {
  const controllerName = `ActivityReportGroup/FilterSearch`;
 
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.postToModel<ActivityReportGroupingEnvelope>(ActivityReportGroupingEnvelope, endpoint, data);
};
// ============================================================================
export const requestDropdownByOptions = async (): Promise<DropdownARGroupingModel | HttpErrorResponseModel> => {
    const controllerName = 'ActivityReportGroup/DropdownSearchByOption';
   
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  
    return EffectUtility.getToModel<DropdownARGroupingModel>(DropdownARGroupingModel, endpoint);
  };
// ============================================================================
  export const RequestSearchByOptions = async (data: SearchByOptionsModel): Promise<SearchResultEnvelope | HttpErrorResponseModel> => {
    const controllerName = 'ActivityReportGroup/SearchByOption';
   ;
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
    return EffectUtility.postToModel<SearchResultEnvelope>(SearchResultEnvelope, endpoint, data);
  };
// ============================================================================
export const RequestActivityReportGroupPost = async (data: ActivityReportGroupingPostModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'ActivityReportGroup';
 ;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};
// ============================================================================
export const RequestActivityReportGroupPut = async (data: ActivityReportGroupingPutModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'ActivityReportGroup';
 ;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};
// ============================================================================
export const requestDropdownContactName = async (userLoginId: number): Promise<DropdownARGroupingModel | HttpErrorResponseModel> => {
    const controllerName = `ActivityReportGroup/DropdownContactName?userLoginId=${userLoginId}`;
   
    const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  
    return EffectUtility.getToModel<DropdownARGroupingModel>(DropdownARGroupingModel, endpoint);
  };
  // ============================================================================
export const requestDropdownCustomerName = async (userLoginId: number): Promise<DropdownARGroupingModel | HttpErrorResponseModel> => {
  const controllerName = `ActivityReportGroup/DropdownCustomerName?userLoginId=${userLoginId}`;
 
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<DropdownARGroupingModel>(DropdownARGroupingModel, endpoint);
};
// ============================================================================
export const RequestActivityReportGroupingDetail = async (userLoginId: number): Promise<ActivityReportGroupingDetailModel | HttpErrorResponseModel> => {
  const controllerName = `ActivityReportGroup/Detail?activityReportGroupGenId=${userLoginId}`;
 
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<ActivityReportGroupingDetailModel>(ActivityReportGroupingDetailModel, endpoint);
};
// ============================================================================
export const RequestActivityReportGroupingDelete = async (activityReportGroupGenId:number, userLoginId: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `ActivityReportGroup?activityReportGroupGenId=${activityReportGroupGenId}&userLoginId=${userLoginId}`;
 
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};
// ============================================================================
export const RequestActivityReportGroupingRoleFlag = async (userLoginId: number): Promise<RoleFlagARGroupingModel | HttpErrorResponseModel> => {
  const controllerName = `ActivityReportGroup/RoleFlag?userLoginId=${userLoginId}`;
 
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);

  return EffectUtility.getToModel<RoleFlagARGroupingModel>(RoleFlagARGroupingModel, endpoint);
};