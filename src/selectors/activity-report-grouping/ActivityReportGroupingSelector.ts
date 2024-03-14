import { Selector } from "react-redux";
import IStore from "models/IStore";
import { createSelector, ParametricSelector } from "reselect";
import DropdownARGroupingModel from "stores/activity-report-grouping/models/DropdownARGroupingModel";
import SearchResultEnvelope from "stores/activity-report-grouping/models/SearchResult/SearchResultEnvelope";
import IActivityReportResultTable from "./models/SearchResults/IActivityReportResultTable";
import SearchResultModel from "stores/activity-report-grouping/models/SearchResult/SearchResultModel";
import IActivityReportResultTableRow from "./models/SearchResults/IActivityReportResultTableRow";
import ActivityReportGroupingEnvelope from "stores/activity-report-grouping/models/ActivityReportGrouping/ActivityReportGroupingEnvelope";
import IActivityReportGroupingTable from "./models/ActivityReportGrouping/IActivityReportGroupingTable";
import ActivityReportGroupingModel from "stores/activity-report-grouping/models/ActivityReportGrouping/ActivityReportGroupingModel";
import IActivityReportGroupingTableRow from "./models/ActivityReportGrouping/IActivityReportGroupingTableRow";
import ActivityReportGroupingDetailModel from "stores/activity-report-grouping/models/ActivityReportGroupingDetail/ActivityReportGroupingDetailModel";
import IActivityReportGroupingDetail from "./models/ActivityReportGroupingDetail/IActivityReportGroupingDetail";
import ActivityReportsGroupingModel from "stores/activity-report-grouping/models/ActivityReportGroupingDetail/ActivityReportsGroupingModel";
import IActivityReportsGroupingModel from "./models/ActivityReportGroupingDetail/IActivityReportsGroupingModel";
import RoleFlagARGroupingModel from "stores/activity-report-grouping/models/RoleFlagARGroupingModel";

//DropDownByOptions
const _selectActivityReportGroupingByOptions = (models: DropdownARGroupingModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectActivityReportGroupingByOptions: Selector<
  IStore,
  DropdownARGroupingModel[]
> = createSelector(
  (state: IStore) => state.activityReportGrouping.DropdownByOptions,
  _selectActivityReportGroupingByOptions
);

//SearchResult
const _selectSearchResults = (models: SearchResultEnvelope): IActivityReportResultTable => {
  // console.log('models',models)
  return {
    totalRows: models.totalRows,
    rows: _createTableRows(models.rows),
    column: models.column,
    sorting: models.sorting
  };
};

const _createTableRows = (models: SearchResultModel[]): IActivityReportResultTableRow[] => {
  return models?.map((model: SearchResultModel): IActivityReportResultTableRow => _mappingObjectTableRow(model));
};

export const selectSearchResults: Selector<IStore, IActivityReportResultTable> = createSelector(
  (state: IStore) => state.activityReportGrouping.SearchResults!,
  _selectSearchResults
);

const _mappingObjectTableRow = (model: SearchResultModel): IActivityReportResultTableRow => {
  return {
    activityReportGenID: model.activityReportGenID,
    ticketId: model.ticketId,
    so: model.so,
    funnelGenId: model.funnelGenId,
    customerName: model.customerName,
    createDate: model.createDate,
    contactName: model.contactName,
    actionTaken: model.actionTaken,
    engineerList: model.engineerList,
    startDate: model.startDate,
    endDate: model.endDate,
    totalCustomerExperience: model.totalCustomerExperience,
    customerSignStatus: model.customerSignStatus,
    isDraft: model.isDraft,
    isDelete: model.isDelete,
  };
};

//AR Dashboard
const _selectActivityReportGrouping = (models: ActivityReportGroupingEnvelope): IActivityReportGroupingTable => {
  // console.log('models',models)
  return {
    totalRows: models.totalRows,
    rows: _createTableRowsARGrouping(models.rows),
    column: models.column,
    sorting: models.column,
    search: models.search,
    filter: models.filter
    
  };
};

const _createTableRowsARGrouping = (models: ActivityReportGroupingModel[]): IActivityReportGroupingTableRow[] => {
  return models?.map((model: ActivityReportGroupingModel): IActivityReportGroupingTableRow => _mappingObjectTableRowARGrouping(model));
};

export const selectActivityReportGrouping: Selector<IStore, IActivityReportGroupingTable> = createSelector(
  (state: IStore) => state.activityReportGrouping.activityReportGrouping!,
  _selectActivityReportGrouping
);

const _mappingObjectTableRowARGrouping = (model: ActivityReportGroupingModel): IActivityReportGroupingTableRow => {
  return {
    activityReportGroupGenId: model.activityReportGroupGenId,
    uid: model.uid,
    activityReportGenIdRelated: model.activityReportGenIdRelated,
    activityReportTotalRelated: model.activityReportTotalRelated,
    customerSignStatus: model.customerSignStatus,
    so: model.so,
    customerName: model.customerName,
    address: model.address,
    contactName: model.contactName,
    createDate: model.createDate,
    createUserID: model.createUserID,
    createUserName: model.createUserName,
  };
};

//DropDownContactName
const _selectActivityReportGroupingContactName = (models: DropdownARGroupingModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectActivityReportGroupingContactName: Selector<
  IStore,
  DropdownARGroupingModel[]
> = createSelector(
  (state: IStore) => state.activityReportGrouping.DropdownContactName,
  _selectActivityReportGroupingContactName
);

//DropDownCustomerName
const _selectActivityReportGroupingCustomerName = (models: DropdownARGroupingModel[]): any[] => {
  return models.map((model: any): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectActivityReportGroupingCustomerName: Selector<
  IStore,
  DropdownARGroupingModel[]
> = createSelector(
  (state: IStore) => state.activityReportGrouping.DropdownCustomerName,
  _selectActivityReportGroupingCustomerName
);

//AR Detail
const _selectActivityReportGroupingDetail = (models: ActivityReportGroupingDetailModel): IActivityReportGroupingDetail => {
  // console.log('models',models)
  return {
    activityReportGroupGenId: models.activityReportGroupGenId,
    uid: models.uid,
    so: models.so,
    customerName: models.customerName,
    contactName: models.contactName,
    phone: models.phone,
    superiorReview: models.superiorReview,
    createDate: models.createDate,
    createUserID: models.createUserID,
    createUserName: models.createUserName,
    activityReports: _createTableRowsARGroupingDetail(models.activityReports),
  };
};

const _createTableRowsARGroupingDetail = (models: ActivityReportsGroupingModel[]): IActivityReportsGroupingModel[] => {
  return models?.map((model: ActivityReportsGroupingModel): IActivityReportsGroupingModel => _mappingObjectTableRowARGroupingDetail(model));
};

export const selectActivityReportGroupingDetail: Selector<IStore, IActivityReportGroupingDetail> = createSelector(
  (state: IStore) => state.activityReportGrouping.activityReportGroupingDetail!,
  _selectActivityReportGroupingDetail
);

const _mappingObjectTableRowARGroupingDetail = (model: ActivityReportsGroupingModel): IActivityReportsGroupingModel => {
  return {
    activityReportGenID: model.activityReportGenID,
    ticketId: model.ticketId,
    so: model.so,
    funnelGenId: model.funnelGenId,
    customerName: model.customerName,
    engineerList: model.engineerList,
    contactName: model.contactName,
    actionTaken: model.actionTaken,
    customerSignStatus: model.customerSignStatus,
    createDate: model.createDate,
    activityCategory: model.activityCategory,
    totalCustomerExperience: model.totalCustomerExperience,
  };
};

//DropDownCustomerName
const _selectActivityReportGroupingRoleFlag = (models: RoleFlagARGroupingModel): any => {
  // console.log('models',models)
  return {
    isSuperior: models.isSuperior,
    isEngineer: models.isEngineer
  };
};

export const selectActivityReportGroupingRoleFlag: Selector<
  IStore,
  RoleFlagARGroupingModel
> = createSelector(
  (state: IStore) => state.activityReportGrouping.RoleFlagAR,
  _selectActivityReportGroupingRoleFlag
);
