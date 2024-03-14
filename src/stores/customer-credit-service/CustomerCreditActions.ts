import * as CustomerCreditEffect from './CustomerCreditEffect';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import * as ActionUtility from '../../utilities/ActionUtility';
import { ReduxDispatch } from '../../models/ReduxProps';
import IStore from '../../models/IStore';
import ResultActions from 'models/ResultActions';
import CustomerCreditSalesEnvelope from './models/ListDashboardViewSalesEnvelope';
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

type ActionUnion =
  | undefined
  | HttpErrorResponseModel
  | ResultActions
  | CustomerCreditSalesEnvelope
  | UsageAmountEnvelope
  | CreditSourceEnvelope
  | UsageDetailEnvelope
  | ListDetailsCreditService
  | ResultActions
  | TicketResult
  | CompetitorProductModel[]
  | TicketModel
  | TicketModels
  | ActivitiesModel[]
  | ActivityModel ;

export const REQUEST_CUSTOMER_CREDIT_SALES: string = 'CustomerCreditActions.REQUEST_CUSTOMER_CREDIT_SALES';
export const REQUEST_CUSTOMER_CREDIT_SALES_FINISHED: string = 'CustomerCreditActions.REQUEST_CUSTOMER_CREDIT_SALES_FINISHED';

export const requestCustomerCreditSales = (page: number, pageSize: number, salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerCreditSalesEnvelope>(
      dispatch,
      REQUEST_CUSTOMER_CREDIT_SALES,
      CustomerCreditEffect.requestCustomerCreditSales,
      page,
      pageSize,
      salesID
    );
  };
};

export const GET_LIST_BY_PRIMARY_RESOURCE: string = 'CustomerCreditActions.GET_LIST_BY_PRIMARY_RESOURCE';
export const GET_LIST_BY_PRIMARY_RESOURCE_FINISHED: string = 'CustomerCreditActions.GET_LIST_BY_PRIMARY_RESOURCE_FINISHED';

export const getListByPrimaryResource = (page: number, pageSize: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerCreditSalesEnvelope>(
      dispatch,
      GET_LIST_BY_PRIMARY_RESOURCE,
      CustomerCreditEffect.getListByPrimaryResource,
      page,
      pageSize
    );
  };
};

export const REQUEST_USAGE_DETAIL: string = 'CustomerCreditActions.REQUEST_USAGE_DETAIL';
export const REQUEST_USAGE_DETAIL_FINISHED: string = 'CustomerCreditActions.REQUEST_USAGE_DETAIL_FINISHED';

export const requestUsageDetail = (page: number, pageSize: number, salesID: any): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<UsageDetailEnvelope>(
      dispatch,
      REQUEST_USAGE_DETAIL,
      CustomerCreditEffect.requestUsageDetail,
      page,
      pageSize,
      salesID
    );
  };
};

export const REQUEST_USAGE_AMOUNT: string = 'CustomerCreditActions.REQUEST_USAGE_AMOUNT';
export const REQUEST_USAGE_AMOUNT_FINISHED: string = 'CustomerCreditActions.REQUEST_USAGE_AMOUNT_FINISHED';

export const requestUsageAmount = (page: number, pageSize: number, salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<UsageAmountEnvelope>(
      dispatch,
      REQUEST_USAGE_AMOUNT,
      CustomerCreditEffect.requestUsageAmount,
      page,
      pageSize,
      salesID
    );
  };
};

export const REQUEST_CREDIT_SOURCE: string = 'CustomerCreditActions.REQUEST_CREDIT_SOURCE';
export const REQUEST_CREDIT_SOURCE_FINISHED: string = 'CustomerCreditActions.REQUEST_CREDIT_SOURCE_FINISHED';

export const requestCreditSource = (page: number, pageSize: number, salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CreditSourceEnvelope>(
      dispatch,
      REQUEST_CREDIT_SOURCE,
      CustomerCreditEffect.requestCreditSource,
      page,
      pageSize,
      salesID
    );
  };
};

export const GET_LIST_DETAIL_CREDIT_SERVICE: string = 'CustomerCreditActions.GET_LIST_DETAIL_CREDIT_SERVICE';
export const GET_LIST_DETAIL_CREDIT_SERVICE_FINISHED: string = 'CustomerCreditActions.GET_LIST_DETAIL_CREDIT_SERVICE_FINISHED';

export const requestListDetailCreditService = (salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ListDetailsCreditService>(
      dispatch,
      GET_LIST_DETAIL_CREDIT_SERVICE,
      CustomerCreditEffect.requestListDetailCreditService,
      salesID
    );
  };
};

export const DELETE_CUSTOMER_CREDIT: string = 'CustomerCreditActions.DELETE_CUSTOMER_CREDIT';
export const DELETE_CUSTOMER_CREDIT_FINISHED: string = 'CustomerCreditActions.DELETE_CUSTOMER_CREDIT_FINISHED';

export const requestDeleteCustomerCreditService = (salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(
      dispatch,
      DELETE_CUSTOMER_CREDIT,
      CustomerCreditEffect.requestDeleteCustomerCreditService,
      salesID
    );
  };
};

export const REQUEST_TICKET_DETAIL: string = 'CustomerCreditActions.REQUEST_TICKET_DETAIL';
export const REQUEST_TICKET_DETAIL_FINISHED: string = 'CustomerCreditActions.REQUEST_TICKET_DETAIL_FINISHED';

export const requestGetTicketDetail = (ticketNumber: string): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<TicketModels>(dispatch, REQUEST_TICKET_DETAIL, CustomerCreditEffect.requestGetTicketDetail, ticketNumber);
  };
};

export const REQUEST_POST_TICKET: string = 'CustomerCreditActions.REQUEST_POST_TICKET';
export const REQUEST_POST_TICKET_FINISHED = 'CustomerCreditActions.REQUEST_POST_TICKET_FINISHED';
export const postTicket = (data: TicketModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_TICKET, CustomerCreditEffect.postTicket, data);
  };
};

export const REQUEST_PUT_TICKET: string = 'CustomerCreditActions.REQUEST_PUT_TICKET';
export const REQUEST_PUT_TICKET_FINISHED = 'CustomerCreditActions.REQUEST_PUT_TICKET_FINISHED';
export const putTicket = (data: TicketModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_POST_TICKET, CustomerCreditEffect.putTicket, data);
  };
};

export const REQUEST_TICKET_BY_ID: string = 'CustomerCreditActions.REQUEST_TICKET_BY_ID';
export const REQUEST_TICKET_BY_ID_FINISHED = 'CustomerCreditActions.REQUEST_TICKET_BY_ID_FINISHED';
export const requestTicketByCustCreditID = (data: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<TicketModel>(dispatch, REQUEST_TICKET_BY_ID, CustomerCreditEffect.requestTicketByCustCreditID, data);
  };
};

//Hendz 13-10-2021 Secondary Resource
export const REQUEST_SECONDARY_RESOURCE: string = 'CustomerCreditActions.REQUEST_SECONDARY_RESOURCE';
export const REQUEST_SECONDARY_RESOURCE_FINISHED: string = 'CustomerCreditActions.REQUEST_SECONDARY_RESOURCE_FINISHED';

export const requestSecondaryResource = (ticket: string, customerCreditServiceID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CompetitorProductModel[]>(
      dispatch,
      REQUEST_SECONDARY_RESOURCE,
      CustomerCreditEffect.requestSecondaryResource,
      ticket,
      customerCreditServiceID
    );
  };
};

//Customer Credit Search
export const REQUEST_CUSTOMER_CREDIT_SEARCH: string = 'CustomerCreditActions.REQUEST_CUSTOMER_CREDIT_SEARCH';
export const REQUEST_CUSTOMER_CREDIT_SEARCH_FINISHED: string = 'CustomerCreditActions.REQUEST_CUSTOMER_CREDIT_SEARCH_FINISHED';

export const requestCustomerCreditSearch = (activePage: number, pageSize: number, textSearch: string, salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<CustomerCreditSalesEnvelope>(
      dispatch,
      REQUEST_CUSTOMER_CREDIT_SEARCH,
      CustomerCreditEffect.requestCustomerCreditSearch,
      activePage,
      pageSize,
      textSearch,
      salesID
    );
  };
};

//Customer Credit Usage Detail Search
export const REQUEST_USAGE_DETAIL_SEARCH: string = 'CustomerCreditActions.REQUEST_USAGE_DETAIL_SEARCH';
export const REQUEST_USAGE_DETAIL_SEARCH_FINISHED: string = 'CustomerCreditActions.REQUEST_USAGE_DETAIL_SEARCH_FINISHED';

export const requestUsageDetailSearch = (activePage: number, pageSize: number, textSearch: string, salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>, getState: () => IStore): Promise<void> => {
    await ActionUtility.createThunkEffect<UsageDetailEnvelope>(
      dispatch,
      REQUEST_USAGE_DETAIL_SEARCH,
      CustomerCreditEffect.requestUsageDetailSearch,
      activePage,
      pageSize,
      textSearch,
      salesID
    );
  };
};

//Activity
export const REQUEST_INSERT_ACTIVITY: string = 'CustomerCreditActions.REQUEST_INSERT_ACTIVITY';
export const REQUEST_INSERT_ACTIVITY_FINISHED = 'CustomerCreditActions.REQUEST_INSERT_ACTIVITY_FINISHED';
export const postActivity = (data: ActivityModel): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ResultActions>(dispatch, REQUEST_INSERT_ACTIVITY, CustomerCreditEffect.postActivity, data);
  };
};

export const REQUEST_ACTIVITIES: string = 'CustomerCreditActions.REQUEST_ACTIVITIES';
export const REQUEST_ACTIVITIES_FINISHED: string = 'CustomerCreditActions.REQUEST_ACTIVITIES_FINISHED';

export const requestActivity = (salesID: number): any => {
  return async (dispatch: ReduxDispatch<ActionUnion>): Promise<void> => {
    await ActionUtility.createThunkEffect<ActivitiesModel[]>(
      dispatch,
      REQUEST_ACTIVITIES,
      CustomerCreditEffect.requestActivity,
      salesID
    );
  };
};
