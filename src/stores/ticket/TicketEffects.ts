import TicketDropdownTextValueModel from './models/TicketDropdownTextValueModel';
import TicketDropdownSearchByModel from './models/TicketDropdownSearchByModel';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import TicketValueEndDateModel from './models/TicketValueEndDateModel';
import TicketProjSummaryModel from './models/TicketProjSummaryModel';
import TicketValueEmailModel from './models/TicketValueEmailModel';
import ReAssignTicketModel from './models/ReAssignTicketModel';
import TicketEntrykeyModel from './models/TicketEntrykeyModel';
import * as EffectUtility from '../../utilities/EffectUtility';
import TicketHeaderModel from './models/TicketHeaderModel';
import TicketDetailModel from './models/TicketDetailModel';
import TicketListModel from './models/TicketListModel';
import TicketPutModel from './models/TicketPutModel';
import ResultActions from 'models/ResultActions';
import environment from 'environment';


  export const getTiketList = async (page: number, pageSize: number, column: string, sorting: string, userLogin: string, userLoginId: number ): Promise<TicketListModel | HttpErrorResponseModel> => {  
  const controllerName = `Ticket/Dashboard?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&userLogin=${userLogin}&userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketListModel>(TicketListModel, endpoint);
};

  export const getTiketListByIdProject = async (page: number, pageSize: number, column: string, sorting: string, projectId: number ): Promise<TicketListModel | HttpErrorResponseModel> => {  
  const controllerName = `Ticket/DashboardParameters?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&projectId=${projectId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketListModel>(TicketListModel, endpoint);
};

  export const getTicketlistSearch = async (page: number, pageSize: number, column: string, sorting: string, search: string, userLogin: string, userLoginId: number ): Promise<TicketListModel | HttpErrorResponseModel> => {  
  const controllerName = `Ticket/Search?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&search=${search.replace('#', '%23')}&userLogin=${userLogin}&userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketListModel>(TicketListModel, endpoint);
};

  export const getTiketListSearchByIdProject = async (page: number, pageSize: number, column: string, sorting: string, search: string, projectId: number): Promise<TicketListModel | HttpErrorResponseModel> => {  
  const controllerName = `Ticket/SearchParameters?page=${page}&pageSize=${pageSize}&column=${column}&sorting=${sorting}&search=${search}&projectId=${projectId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketListModel>(TicketListModel, endpoint);
};

  export const getTicketlistFilter = async (data: any): Promise<TicketListModel | HttpErrorResponseModel> => {  
  const controllerName = `Ticket/FilterSearch`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<TicketListModel>(TicketListModel, endpoint, data);
};

  export const getTicketlistFilterByIdProject = async (data: any): Promise<TicketListModel | HttpErrorResponseModel> => {  
  const controllerName = `Ticket/FilterSearchParameters`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<TicketListModel>(TicketListModel, endpoint, data);
};

  export const postTicket = async (data: any): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `Ticket`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const putTicket = async (data: TicketPutModel): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `Ticket`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const getTicketDetail = async (ticketId: number): Promise<TicketDetailModel | HttpErrorResponseModel> => {  
  const controllerName = `Ticket/Detail?ticketId=${ticketId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketDetailModel>(TicketDetailModel, endpoint);
};

  export const reqReAssignTicket = async (data: ReAssignTicketModel): Promise<ResultActions | HttpErrorResponseModel> => {  
  const controllerName = `Ticket/ReassignWork`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

  export const getTicketHeader = async (projectId: number, funnelGenId: number): Promise<TicketHeaderModel | HttpErrorResponseModel> => {  
  const controllerName = `Ticket/Header?projectId=${projectId}&funnelGenId=${funnelGenId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketHeaderModel>(TicketHeaderModel, endpoint);
};

  export const getSummaryBy = async (by: string, val: string|number, funnelGenId?: number, so?: string ): Promise<TicketProjSummaryModel | HttpErrorResponseModel> => {  
  const controllerName = 
  by === "projectId" ? `Ticket/GetProjectSummaryByProjectId?projectId=${val}` :
  by === "funnelGenId" ? `Ticket/GetProjectSummaryByFunnelGenId?funnelGenId=${val}` :
  by === "so" ? `Ticket/GetProjectSummaryBySO?so=${val}` :
  by === "customerName" ? `Ticket/GetProjectSummaryByCustomer?customerId=${val}&funnelGenId=${funnelGenId}&so=${so}` :
  by === "ticketId" ? `Ticket/GetProjectSummaryByTicketId?ticketId=${val}` : "";
  
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketProjSummaryModel>(TicketProjSummaryModel, endpoint);
};

  export const getDropdown = async (dropdown: string, userLoginId?: number): Promise<TicketDropdownTextValueModel[] | HttpErrorResponseModel> => {  
  const controllerName = dropdown === "resource" ? `Ticket/GetTicketByFilterPrimaryResourceList?userLoginId=${userLoginId}` : 
  dropdown === "secoundaryResource" ? `Ticket/GetTicketByFilterSecondaryResourceList?userLoginId=${userLoginId}` : 
  dropdown === "customer" ? `Ticket/GetTicketByFilterCustomerList?userLoginId=${userLoginId}` : "" ;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketDropdownTextValueModel[] >(TicketDropdownTextValueModel, endpoint);
};

  export const getDropdownBy = async (dropdown: string, projectID?: number): Promise<TicketDropdownTextValueModel[] | HttpErrorResponseModel> => {  
  const controllerName = dropdown === "resource" ? `Ticket/DropdownPrimaryResourceByParameters?projectId=${projectID}` : 
  dropdown === "secoundaryResource" ? `Ticket/DropdownSecondaryResourceByParameters?projectId=${projectID}` : "" ;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketDropdownTextValueModel[] >(TicketDropdownTextValueModel, endpoint);
};

  export const getSearch = async (search: string, searchText?: string): Promise<TicketDropdownSearchByModel[] | HttpErrorResponseModel> => {  
  const controllerName = 
  search === "SearchProjectId" ? `Ticket/SearchProjectId?search=${searchText}` : 
  search === "SearchFunnelGenId" ? `Ticket/SearchFunnelGenId?search=${searchText}` : 
  search === "SearchSO" ? `Ticket/SearchSO?search=${searchText}` : 
  search === "SearchCustomer" ? `Ticket/SearchCustomerName?search=${searchText}` : "" ;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketDropdownSearchByModel[] >(TicketDropdownSearchByModel, endpoint);
};

  export const getDrpByEntryKey = async (dropdown: string, text1: string): Promise<TicketEntrykeyModel[] | HttpErrorResponseModel> => {  
  const controllerName = text1 ? `Udc/GetByEntryKeyText1?entryKey=${dropdown}&text1=${text1}` : `Udc/GetByEntryKey/${dropdown}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketEntrykeyModel[] >(TicketEntrykeyModel, endpoint);
};

export const getValueEmail = async (taskId: number, userLoginId: number): Promise<TicketValueEmailModel | HttpErrorResponseModel> => {
  const controllerName = `Ticket/GetDefaultEmailEdit?ticketId=${taskId}&userLoginId=${userLoginId}`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketValueEmailModel>(TicketValueEmailModel, endpoint);
};

export const getValueEndDate = async (data: any): Promise<TicketValueEndDateModel | HttpErrorResponseModel> => {
  const controllerName = `Ticket/GenerateEstEndDate`;
  const endpoint: string = environment.api.generic.replace(':controller', controllerName);
  return EffectUtility.postToModel<TicketValueEndDateModel>(TicketValueEndDateModel, endpoint, data);
};