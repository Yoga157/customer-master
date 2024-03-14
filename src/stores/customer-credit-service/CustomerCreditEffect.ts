import environment from 'environment';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as HttpUtility from '../../utilities/HttpUtility';
import { AxiosResponse } from 'axios';
import * as EffectUtility from '../../utilities/EffectUtility';
import CustomerCreditSalesEnvelope from './models/ListDashboardViewSalesEnvelope';
import ResultActions from 'models/ResultActions';
import UsageAmountEnvelope from './models/UsageAmountEnvelope';
import UsageDetailEnvelope from './models/UsageDetailEnvelope';
import CreditSourceEnvelope from './models/CreditSourceEnvelope';
import ListDetailsCreditService from './models/ListDetailsCreditService';
import TicketResult from './models/TicketResult';
import TicketModel from './models/TicketModel';
import ActivityModel from './models/ActivityModel';
import ActivitiesModel from './models/ActivitiesModel';
import TicketModels from './models/TicketModels';
import CompetitorProductModel from 'stores/competitor-product/models/CompetitorProductModel';

export const requestCustomerCreditSales = async (
  page: number,
  pageSize: number,
  salesID: number
): Promise<CustomerCreditSalesEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'CustomerCreditService/GetListDashboardView?page=' + page + '&pageSize=' + pageSize + '&SalesID=' + salesID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CustomerCreditSalesEnvelope>(CustomerCreditSalesEnvelope, endpoint);
};

export const requestUsageDetail = async (page: number, pageSize: number, salesID: number): Promise<UsageDetailEnvelope | HttpErrorResponseModel> => {
  const controllerName = `CustomerCreditService/GetListDashboardUsageDetail?page=${page}&pageSize=${pageSize}&SalesID=${salesID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<UsageDetailEnvelope>(UsageDetailEnvelope, endpoint);
};

export const requestUsageAmount = async (page: number, pageSize: number, salesID: any): Promise<UsageAmountEnvelope | HttpErrorResponseModel> => {
  const controllerName = `CustomerCreditService/GetListDashboardUsageAmountCustomer?page=${page}&pageSize=${pageSize}&SalesID=${salesID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<UsageAmountEnvelope>(UsageAmountEnvelope, endpoint);
};

export const requestCreditSource = async (
  page: number,
  pageSize: number,
  salesID: number
): Promise<CreditSourceEnvelope | HttpErrorResponseModel> => {
  const controllerName = `CustomerCreditService/GetListDashboardCreditSource?page=${page}&pageSize=${pageSize}&SalesID=${salesID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CreditSourceEnvelope>(CreditSourceEnvelope, endpoint);
};

export const getListByPrimaryResource = async (page: number, pageSize: number): Promise<CustomerCreditSalesEnvelope | HttpErrorResponseModel> => {
  const controllerName = 'CustomerCreditService/GetListDashboardView?page=' + page + '&pageSize=' + pageSize;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CustomerCreditSalesEnvelope>(CustomerCreditSalesEnvelope, endpoint);
};

export const requestListDetailCreditService = async (salesID: number): Promise<ListDetailsCreditService | HttpErrorResponseModel> => {
  const controllerName = `CustomerCreditService/GetListDetail?salesID=${salesID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<ListDetailsCreditService>(ListDetailsCreditService, endpoint);
};

export const requestDeleteCustomerCreditService = async (salesID: number): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = `CustomerCreditService/Delete`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.delToModel<ResultActions>(ResultActions, endpoint);
};

export const requestGetTicketDetail = async (ticketNumber: string): Promise<TicketModels | HttpErrorResponseModel> => {
  const controllerName = `CustomerCreditService/GetTicketDetail?TicketNumber=${ticketNumber}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<TicketModels>(TicketModels, endpoint);
};

export const postTicket = async (data: TicketModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'CustomerCreditService/InsertTicket';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

export const putTicket = async (data: TicketModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'CustomerCreditService/Update';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.putToModel<ResultActions>(ResultActions, endpoint, data);
};

export const requestTicketByCustCreditID = async (custCreditID: number): Promise<TicketModel | HttpErrorResponseModel> => {
  const controllerName = `CustomerCreditService/GetByID?CustomerCreditServiceID=${custCreditID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<TicketModel>(TicketModel, endpoint);
};

//Hendz 13-10-2021 Secondary Resource
export const requestSecondaryResource = async (
  ticket: string,
  customerCreditServiceID: number
): Promise<CompetitorProductModel[] | HttpErrorResponseModel> => {
  const controllerName = `CustomerCreditService/GetSecondaryResource?TicketNumber=${ticket}&CustomerCreditServiceID=${customerCreditServiceID}`;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CompetitorProductModel[]>(CompetitorProductModel, endpoint);
};

//Credit Service Search
export const requestCustomerCreditSearch = async (
  activePage: number,
  pageSize: number,
  textSearch: string,
  salesID: number
): Promise<CustomerCreditSalesEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'CustomerCreditService/SearchDashboard?page=' + activePage + '&pageSize=' + pageSize + '&Text=' + textSearch + '&SalesID=' + salesID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<CustomerCreditSalesEnvelope>(CustomerCreditSalesEnvelope, endpoint);
};

//Credit Service Usage Detail Search
export const requestUsageDetailSearch = async (
  activePage: number,
  pageSize: number,
  textSearch: string,
  salesID: number
): Promise<UsageDetailEnvelope | HttpErrorResponseModel> => {
  const controllerName =
    'CustomerCreditService/SearchViewEdit?page=' + activePage + '&pageSize=' + pageSize + '&Text=' + textSearch + '&SalesID=' + salesID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);

  return EffectUtility.getToModel<UsageDetailEnvelope>(UsageDetailEnvelope, endpoint);
};

//Insert Activity
export const postActivity = async (data: ActivityModel): Promise<ResultActions | HttpErrorResponseModel> => {
  const controllerName = 'CustomerCreditService/InsertActivity';
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.postToModel<ResultActions>(ResultActions, endpoint, data);
};

//Get Activity
export const requestActivity = async (salesID: number): Promise<ActivitiesModel[] | HttpErrorResponseModel> => {
  const controllerName = 'CustomerCreditService/GetActivity?SalesID=' + salesID;
  const endpoint: string = environment.api.funnel.replace(':controller', controllerName);
  return EffectUtility.getToModel<ActivitiesModel[]>(ActivitiesModel, endpoint);
};


/**
 * This is only to trigger an error api response so we can use it for an example in the AboutPage
 */
export const requestError = async (): Promise<any | HttpErrorResponseModel> => {
  const endpoint: string = environment.api.generic;
  const response: AxiosResponse | HttpErrorResponseModel = await HttpUtility.get(endpoint);

  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return response.data;
};
