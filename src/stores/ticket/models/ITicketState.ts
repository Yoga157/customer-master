import ResultActions from "models/ResultActions";
import TicketDropdownTextValueModel from "./TicketDropdownTextValueModel";
import TicketDropdownSearchByModel from "./TicketDropdownSearchByModel";
import TicketValueEndDateModel from "./TicketValueEndDateModel";
import TicketProjSummaryModel from "./TicketProjSummaryModel";
import TicketValueEmailModel from "./TicketValueEmailModel";
import TicketEntrykeyModel from "./TicketEntrykeyModel";
import TicketHeaderModel from "./TicketHeaderModel";
import TicketDetailModel from "./TicketDetailModel";
import TicketListModel from "./TicketListModel";






export default interface ITicketState {
  readonly drpSecondaryResource: TicketDropdownTextValueModel[];
  readonly searchSummary: TicketDropdownSearchByModel[];
  readonly drpResource: TicketDropdownTextValueModel[];
  readonly drpCustomer: TicketDropdownTextValueModel[];
  readonly dropdownSubCategory: TicketEntrykeyModel[];
  readonly dropdownSlaCustomer: TicketEntrykeyModel[];
  readonly dropdownIssueType: TicketEntrykeyModel[];
  readonly dropdownTemplate: TicketEntrykeyModel[];
  readonly dropdownCategory: TicketEntrykeyModel[];
  readonly dropdownSubIssue: TicketEntrykeyModel[];
  readonly projectSummary: TicketProjSummaryModel;
  readonly valueEndDate: TicketValueEndDateModel
  readonly drpComplexity: TicketEntrykeyModel[];
  readonly drpPriority: TicketEntrykeyModel[];
  readonly valueEmail: TicketValueEmailModel;
  readonly headerTicket: TicketHeaderModel;
  readonly ticketDetail: TicketDetailModel;
  readonly resultActions: ResultActions;
  readonly ticketList: TicketListModel;
  readonly refreshPage: boolean;
  readonly activePage: number;
  readonly isExport: boolean;
  readonly error: boolean;
}
