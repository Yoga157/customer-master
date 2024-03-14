import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';

import IDashboardSalesTable from './models/IDashboardSalesTable';
import IDashboardSalesTableRow from './models/IDashboardSalesTableRow';
import { Selector } from 'react-redux';
import ListDashboardViewSalesEnvelope from 'stores/customer-credit-service/models/ListDashboardViewSalesEnvelope';
import ListDashboardViewSalesModel from 'stores/customer-credit-service/models/ListDashboardViewSalesModel';
import UsageDetailEnvelope from 'stores/customer-credit-service/models/UsageDetailEnvelope';
import UsageDetailModel from 'stores/customer-credit-service/models/UsageDetailModel';
import IUsageDetailTableRow from './models/IUsageDetailTableRow';
import IUsageDetailTable from './models/IUsageDetailTable';
import UsageAmountEnvelope from 'stores/customer-credit-service/models/UsageAmountEnvelope';
import UsageAmountModel from 'stores/customer-credit-service/models/UsageAmountModel';
import IUsageAmountTable from './models/IUsageAmountTable';
import IUsageAmountTableRow from './models/IUsageAmountTableRow';
import CreditSourceEnvelope from 'stores/customer-credit-service/models/CreditSourceEnvelope';
import CreditSourceModel from 'stores/customer-credit-service/models/CreditSourceModel';
import ICreditSourceTable from './models/ICreditSourceTable';
import ICreditSourceTableRow from './models/ICreditSourceTableRow';
import TicketModel from 'stores/customer-credit-service/models/TicketModel';
import ActivitiesModel from 'stores/customer-credit-service/models/ActivitiesModel';
import TicketModels from 'stores/customer-credit-service/models/TicketModels';
import TicketResult from 'stores/customer-credit-service/models/TicketResult';

const _selectListSales = (models: ListDashboardViewSalesEnvelope): IDashboardSalesTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: ListDashboardViewSalesModel[]): IDashboardSalesTableRow[] => {
  return models.map((model: ListDashboardViewSalesModel): IDashboardSalesTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: ListDashboardViewSalesModel): IDashboardSalesTableRow => {
  return {
    salesID: model.salesID,
    dept: model.dept,
    sales: model.sales,
    customerCreditAmount: model.customerCreditAmount,
    actualCreditUsedAmount: model.actualCreditUsedAmount,
    remainingAmount: model.remainingAmount,
  };
};

export const selectListSales: Selector<IStore, IDashboardSalesTable> = createSelector(
  (state: IStore) => state.customerCredit.listSales,
  _selectListSales
);

const _selectUsageDetail = (models: UsageDetailEnvelope): IUsageDetailTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRowsUsageDetail(models.rows),
  };
};

const _createTableRowsUsageDetail = (models: UsageDetailModel[]): IUsageDetailTableRow[] => {
  return models.map((model: UsageDetailModel): IUsageDetailTableRow => _mappingObjectTableRowUsageDetail(model));
};

const _mappingObjectTableRowUsageDetail = (model: UsageDetailModel): IUsageDetailTableRow => {
  return {
    customerCreditServiceID: model.customerCreditServiceID,
    presalesID: model.presalesID,
    ticketNumber: model.ticketNumber,
    ticketTitle: model.ticketTitle,
    presalesName: model.presalesName,
    customer: model.customer,
    dept: model.dept,
    category: model.category,
    description: model.description,
    ticketDate: model.ticketDate,
    resource: model.resource,
    status: model.status,
    notes: model.notes,
    price: model.price,
    complexity: model.complexity,
    createdDate: model.createdDate,
    createdBy: model.createdBy,
    modifiedDate: model.modifiedBy,
    modifiedBy: model.modifiedBy,
  };
};

export const selectUsageDetail: Selector<IStore, IUsageDetailTable> = createSelector(
  (state: IStore) => state.customerCredit.listUsageDetail,
  _selectUsageDetail
);

const _selectCreditSource = (models: CreditSourceEnvelope): ICreditSourceTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRowsCreditSource(models.rows),
  };
};

const _createTableRowsCreditSource = (models: CreditSourceModel[]): ICreditSourceTableRow[] => {
  return models.map((model: CreditSourceModel): ICreditSourceTableRow => _mappingObjectTableRowCreditSource(model));
};

const _mappingObjectTableRowCreditSource = (model: CreditSourceModel): ICreditSourceTableRow => {
  return {
    funnelGenID: model.funnelGenID,
    customer: model.customer,
    creditAmount: model.creditAmount,
    createdDate: model.createdDate,
    createdBy: model.createdBy,
    modifiedDate: model.modifiedDate,
    modifiedBy: model.modifiedBy,
  };
};

export const selectCreditSource: Selector<IStore, ICreditSourceTable> = createSelector(
  (state: IStore) => state.customerCredit.listCreditSource,
  _selectCreditSource
);

const _selectUsageAmount = (models: UsageAmountEnvelope): IUsageAmountTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRowsUsageAmount(models.rows),
  };
};

const _createTableRowsUsageAmount = (models: UsageAmountModel[]): IUsageAmountTableRow[] => {
  return models.map((model: UsageAmountModel): IUsageAmountTableRow => _mappingObjectTableRowUsageAmount(model));
};

const _mappingObjectTableRowUsageAmount = (model: UsageAmountModel): IUsageAmountTableRow => {
  return {
    customer: model.customer,
    dept: model.dept,
    usageAmount: model.usageAmount,
  };
};

export const selectUsageAmount: Selector<IStore, IUsageAmountTable> = createSelector(
  (state: IStore) => state.customerCredit.listUsageAmount,
  _selectUsageAmount
);

const _selectTicketDetail = (models: TicketModels): any => {
  return {
    errorNumber: models.errorNumber,
    bSuccess: models.bSuccess,
    message: models.message,
    resultObj: _createTicketDetail(models.resultObj),
  };
};

const _createTicketDetail = (model: TicketModel): TicketModel => {
  return new TicketModel({
    customerCreditServiceID: model.customerCreditServiceID.toString() === 'NaN' ? 0 : model.customerCreditServiceID,
    presalesID: model.presalesID.toString() === 'NaN' ? 0 : model.presalesID,
    salesID: model.salesID.toString() === 'NaN' ? 0 : model.salesID,
    ticketNumber: model.ticketNumber === 'undefined' ? '' : model.ticketNumber,
    ticketTitle: model.ticketTitle === 'undefined' ? '' : model.ticketTitle,
    customer: model.customer === 'undefined' ? '' : model.customer,
    dept: model.dept === 'undefined' ? '' : model.dept,
    category: model.category === 'undefined' ? '' : model.category,
    description: model.description === 'undefined' ? '' : model.description,
    ticketDate: model.ticketDate === undefined ? undefined : new Date(model.ticketDate),
    resource: model.resource === 'undefined' ? '' : model.resource,
    emailResource: model.emailResource === 'undefined' ? '' : model.emailResource,
    status: model.status === 'undefined' ? '' : model.status,
    notes: model.notes === 'undefined' ? '' : model.notes,
    price: model.price.toString() === 'NaN' ? 0 : model.price,
    statusText: model.statusText === 'undefined' ? '' : model.statusText,
    complexity: model.complexity === 'undefined' ? '' : model.complexity,
    isPrimary: model.isPrimary,
    createdDate: model.createdDate,
    createUserID: model.createUserID,
    modifyDate: model.modifyDate,
    modifyUserID: model.modifyUserID,
  });
};

export const selecTicketDetail: Selector<IStore, TicketModels> = createSelector(
  (state: IStore) => state.customerCredit.dataTicket,
  _selectTicketDetail
);

const _selectTicketDetailRow = (model: TicketModel): TicketModel => {
  return new TicketModel({
    customerCreditServiceID: model.customerCreditServiceID.toString() === 'NaN' ? 0 : model.customerCreditServiceID,
    presalesID: model.presalesID.toString() === 'NaN' ? 0 : model.presalesID,
    salesID: model.salesID.toString() === 'NaN' ? 0 : model.salesID,
    ticketNumber: model.ticketNumber === 'undefined' ? '' : model.ticketNumber,
    ticketTitle: model.ticketTitle === 'undefined' ? '' : model.ticketTitle,
    customer: model.customer === 'undefined' ? '' : model.customer,
    dept: model.dept === 'undefined' ? '' : model.dept,
    category: model.category === 'undefined' ? '' : model.category,
    description: model.description === 'undefined' ? '' : model.description,
    ticketDate: model.ticketDate === undefined ? undefined : new Date(model.ticketDate),
    resource: model.resource === 'undefined' ? '' : model.resource,
    emailResource: model.emailResource === 'undefined' ? '' : model.emailResource,
    status: model.status === 'undefined' ? '' : model.status,
    notes: model.notes === 'undefined' ? '' : model.notes,
    price: model.price.toString() === 'NaN' ? 0 : model.price,
    statusText: model.statusText === 'undefined' ? '' : model.statusText,
    complexity: model.complexity === 'undefined' ? '' : model.complexity,
    isPrimary: model.isPrimary,
    createdDate: model.createdDate,
    createUserID: model.createUserID,
    modifyDate: model.modifyDate,
    modifyUserID: model.modifyUserID,
  });
};

export const selectTicketDetailRow: Selector<IStore, TicketModel> = createSelector(
  (state: IStore) => state.customerCredit.dataTicketRow,
  _selectTicketDetailRow
);

//Activity
const _selectActivity = (models: ActivitiesModel[]): any[] => {
  return models.map((model: ActivitiesModel): any => _mappingObjectActivity(model));
};

const _mappingObjectActivity = (model: ActivitiesModel): any => {
  return {
    funnelGenID: model.funnelGenID,
    createDate: model.createDate,
    activityName: model.activityName,
    activityTitle: model.activityTitle,
    activityTypeID: model.activityTypeID,
    createUserID: model.createUserID,
    createUsername: model.createUsername,
    descriptions: model.descriptions,
    displayTime: model.displayTime,
    funnelActivityID: model.funnelActivityID,
    link: model.link,
    photoProfile: model.photoProfile,
    activityEndTime: model.activityEndTime,
    activityStartTime: model.activityStartTime,
    assignedTo: model.assignedTo === 'undefined' ? '' : model.assignedTo,
  };
};

export const selectActivity: ParametricSelector<IStore, string[], any[]> = createSelector(
  (state: IStore) => state.customerCredit.listActivity,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectActivity
);
//-----------------------------------------------------------------------
