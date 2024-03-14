import ResultActions from 'models/ResultActions';
import CustomerCreditSales from './ListDashboardViewSalesEnvelope';
import UsageAmountEnvelope from './UsageAmountEnvelope';
import UsageDetailEnvelope from './UsageDetailEnvelope';
import CreditSourceEnvelope from './CreditSourceEnvelope';
import ListDetailsCreditService from './ListDetailsCreditService';
import ResourceModel from 'stores/customer-credit-service/models/ResourceModel';
import TicketModels from './TicketModels';
import TicketModel from './TicketModel';
import ActivitiesModel from './ActivitiesModel';

export default interface ICustomerState {
  readonly listActivity: ActivitiesModel[];
  readonly listSales: CustomerCreditSales;
  readonly listUsageDetail: UsageDetailEnvelope;
  readonly listUsageAmount: UsageAmountEnvelope;
  readonly listCreditSource: CreditSourceEnvelope;
  readonly listDetails: ListDetailsCreditService;
  readonly dataTicket: TicketModels;
  readonly dataTicketRow: TicketModel;
  readonly ticketExisting: number;
  readonly refreshPage: boolean;
  readonly error: boolean;
  readonly resultActions: ResultActions;
  readonly resource:ResourceModel[]
}
