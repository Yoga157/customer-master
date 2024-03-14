import * as CustomerCreditActions from './CustomerCreditActions';
import IAction from '../../models/IAction';
import baseReducer from '../../utilities/BaseReducer';
import { Reducer } from 'redux';
import ResultActions from 'models/ResultActions';
import ICustomerCreditState from './models/ICustomerCreditState';
import CustomerCreditSalesModel from './models/ListDashboardViewSalesEnvelope';
import UsageAmountEnvelope from './models/UsageAmountEnvelope';
import CreditSourceEnvelope from './models/CreditSourceEnvelope';
import UsageDetailEnvelope from './models/UsageDetailEnvelope';
import ListDetailsCreditService from './models/ListDetailsCreditService';
import TicketModels from './models/TicketModels';
import TicketModel from './models/TicketModel';
import ActivitiesModel from './models/ActivitiesModel';
import TicketResult from './models/TicketResult';
import ResourceModel from 'stores/customer-credit-service/models/ResourceModel';

export const initialState: ICustomerCreditState = {
  listActivity: [],
  listSales: new CustomerCreditSalesModel({}),
  listUsageDetail: new UsageDetailEnvelope({}),
  listUsageAmount: new UsageAmountEnvelope({}),
  listCreditSource: new CreditSourceEnvelope({}),
  listDetails: new ListDetailsCreditService({}),
  resource: [],
  dataTicket: new TicketModels({}),
  dataTicketRow: new TicketModel({}),
  ticketExisting: 0,
  error: false,
  refreshPage: false,
  resultActions: new ResultActions({}),
};

const customerReducer: Reducer = baseReducer(initialState, {
  [CustomerCreditActions.REQUEST_CUSTOMER_CREDIT_SALES_FINISHED](
    state: ICustomerCreditState,
    action: IAction<CustomerCreditSalesModel>
  ): ICustomerCreditState {
    return {
      ...state,
      listSales: action.payload!,
      refreshPage: false,
      error: action.error!,
    };
  },

  [CustomerCreditActions.REQUEST_CUSTOMER_CREDIT_SEARCH_FINISHED](
    state: ICustomerCreditState,
    action: IAction<CustomerCreditSalesModel>
  ): ICustomerCreditState {
    return {
      ...state,
      listSales: action.payload!,
      refreshPage: false,
      error: action.error!,
    };
  },

  [CustomerCreditActions.REQUEST_USAGE_DETAIL_SEARCH_FINISHED](
    state: ICustomerCreditState,
    action: IAction<UsageDetailEnvelope>
  ): ICustomerCreditState {
    return {
      ...state,
      listUsageDetail: action.payload!,
      refreshPage: false,
      error: action.error!,
    };
  },

  [CustomerCreditActions.REQUEST_USAGE_AMOUNT_FINISHED](state: ICustomerCreditState, action: IAction<UsageAmountEnvelope>): ICustomerCreditState {
    return {
      ...state,
      listUsageAmount: action.payload!,
      refreshPage: false,
      error: action.error!,
    };
  },

  [CustomerCreditActions.REQUEST_USAGE_DETAIL_FINISHED](state: ICustomerCreditState, action: IAction<UsageDetailEnvelope>): ICustomerCreditState {
    return {
      ...state,
      listUsageDetail: action.payload!,
      refreshPage: false,
      error: action.error!,
    };
  },

  [CustomerCreditActions.REQUEST_CREDIT_SOURCE_FINISHED](state: ICustomerCreditState, action: IAction<CreditSourceEnvelope>): ICustomerCreditState {
    return {
      ...state,
      listCreditSource: action.payload!,
      refreshPage: false,
      error: action.error!,
    };
  },

  [CustomerCreditActions.GET_LIST_DETAIL_CREDIT_SERVICE_FINISHED](
    state: ICustomerCreditState,
    action: IAction<ListDetailsCreditService>
  ): ICustomerCreditState {
    return {
      ...state,
      listDetails: action.payload!,
      refreshPage: false,
      error: action.error!,
    };
  },

  [CustomerCreditActions.REQUEST_TICKET_DETAIL_FINISHED](state: ICustomerCreditState, action: IAction<TicketModels>): ICustomerCreditState {
    return {
      ...state,
      dataTicket: action.payload!,
      //ticketExisting: action.payload!.resultObj.existing,
      refreshPage: false,
      error: action.error!,
    };
  },

  [CustomerCreditActions.REQUEST_POST_TICKET_FINISHED](state: ICustomerCreditState, action: IAction<ResultActions>): ICustomerCreditState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CustomerCreditActions.REQUEST_PUT_TICKET_FINISHED](state: ICustomerCreditState, action: IAction<ResultActions>): ICustomerCreditState {
    return {
      ...state,
      error: action.error!,
      refreshPage: action.error ? false : true,
      resultActions: action.payload!,
    };
  },

  [CustomerCreditActions.REQUEST_TICKET_BY_ID_FINISHED](state: ICustomerCreditState, action: IAction<TicketModel>): ICustomerCreditState {
    return {
      ...state,
      dataTicketRow: action.payload!,
      //ticketExisting: 0,
      refreshPage: false,
      error: action.error!,
    };
  },
  [CustomerCreditActions.REQUEST_SECONDARY_RESOURCE_FINISHED](state: ICustomerCreditState, action: IAction<ResourceModel[]>): ICustomerCreditState {
    return {
      ...state,
      resource: action.payload!,
    };
  },
  [CustomerCreditActions.REQUEST_ACTIVITIES_FINISHED](state: ICustomerCreditState, action: IAction<ActivitiesModel[]>): ICustomerCreditState {
    return {
      ...state,
      listActivity: action.payload!,
    };
  },
  [CustomerCreditActions.REQUEST_INSERT_ACTIVITY_FINISHED](state: ICustomerCreditState, action: IAction<ResultActions>): ICustomerCreditState {
    return {
      ...state,
      refreshPage: action.error ? false : true,
    };
  },
});

export default customerReducer;
