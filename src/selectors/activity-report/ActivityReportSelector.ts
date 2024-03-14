import { Selector } from "react-redux";
import IStore from "models/IStore";
import { createSelector, ParametricSelector } from "reselect";
import ActivityReportDashboardEnvelope from "stores/activity-report/models/ActivityReportDashboardEnvelope";
import ActivityReportModel from "stores/activity-report/models/ActivityReportModel";
import IActivityReportTable from "./models/IActivityReportTable";
import IActivityReportTableRow from "./models/IActivityReportTableRow";
import {
  ActivityReportViewEditActivityInformation,
  ActivityReportViewEditNotes,
  ActivityReportViewEditSuperiorReview,
  ActivityReportViewEditTicketInformation,
  ActivityReportViewEditTotalCustomerExperience,
} from "stores/activity-report/models/view-edit";
import ActivityReportViewCustomerSignature from "stores/activity-report/models/view-edit/ActivityReportViewCustomerSignature";
import ActivityReportDashboardModel from "stores/activity-report/models/ActivityReportDashboardModel";
import ActivityReportTicketNumber from "stores/activity-report/models/ActivityReportTicketNumber";
import ActivityReportCheckAllowEdit from "stores/activity-report/models/ActivityReportCheckAllowEdit";
import ActivityReportCheckSOExist from "stores/activity-report/models/ActivityReportCheckSOExist";
import ActivityReportSONumber from "stores/activity-report/models/ActivityReportSONumber";
import ActivityReportTicketNumberOptions from "stores/activity-report/models/ActivityReportTicketNumberOptions";
import ActivityReportFunnelDetail from "stores/activity-report/models/ActivityReportFunnelDetail";
import ActivityReportCheckFunnelGenIdExist from "stores/activity-report/models/ActivityReportCheckFunnelGenIdExist";

const _selectActivityReports = (
  models: ActivityReportDashboardEnvelope
): IActivityReportTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (
  models: ActivityReportDashboardModel[]
): IActivityReportTableRow[] => {
  return models.map(
    (model: ActivityReportDashboardModel): IActivityReportTableRow =>
      _mappingObjectTableRow(model)
  );
};

export const selectActivityReports: ParametricSelector<
  IStore,
  string[],
  IActivityReportTable
> = createSelector(
  (state: IStore) => state.activityReport.listData!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectActivityReports
);

const _selectActivityReport = (
  model: ActivityReportDashboardModel
): ActivityReportDashboardModel => {
  return _mappingObject(model);
};

const _mappingObjectTableRow = (
  model: ActivityReportDashboardModel
): IActivityReportTableRow => {
  return {
    funnelGenId: model.funnelGenId,
    activityReportGenID: model.activityReportGenID,
    ticketId: model.ticketId,
    so: model.so,
    customerName: model.customerName,
    contactName: model.contactName,
    address: model.address,
    startDate: model.startDate,
    endDate: model.endDate,
    engineerList: model.engineerList,
    status: model.status,
    reviewStatus: model.reviewStatus,
    customerSignStatus: model.customerSignStatus,
    department: model.department,
    createDate: model.createDate,
    createUserID: model.createUserID,
    modifyDate: model.modifyDate,
    modifyUserID: model.modifyUserID,
    isDraft: model.isDraft,
  };
};

const _mappingObject = (
  model: ActivityReportDashboardModel
): ActivityReportDashboardModel => {
  return new ActivityReportDashboardModel({
    funnelGenId: model.funnelGenId,
    activityReportGenID:
      model.activityReportGenID.toString() === "undefined"
        ? 0
        : model.activityReportGenID,
    ticketId: model.ticketId,
    so: model.so,
    customerName: model.customerName,
    contactName: model.contactName,
    address: model.address,
    startDate: model.startDate !== null ? model.startDate! : "",
    endDate: model.endDate !== null ? model.endDate! : "",
    engineerList: model.engineerList,
    reviewStatus: model.reviewStatus,
    customerSignStatus: model.customerSignStatus,
    department: model.department,
    createDate: new Date(model.createDate!),
    createUserID: model.createUserID,
    modifyDate:
      model.modifyDate !== null ? new Date(model.modifyDate!) : undefined,
    modifyUserID: model.modifyUserID,
    isDraft: model.isDraft,
  });
};

export const selectActivityReport: Selector<
  IStore,
  ActivityReportDashboardModel
> = createSelector(
  (state: IStore) => state.activityReport.firstData!,
  _selectActivityReport
);
// ============================================================================
const _selectViewActivityInformation = (
  model: ActivityReportViewEditActivityInformation
): ActivityReportViewEditActivityInformation => {
  return _mappingViewActivityInformationObject(model);
};

const _mappingViewActivityInformationObject = (
  model: ActivityReportViewEditActivityInformation
): ActivityReportViewEditActivityInformation => {
  return new ActivityReportViewEditActivityInformation({
    activityReportGenID:
      model.activityReportGenID.toString() === "NaN"
        ? 0
        : model.activityReportGenID,
    activityCategory:
      model.activityCategory === "" ? "" : model.activityCategory,
    activityCategoryArr:
      model.activityCategory === "" ? [] : model.activityCategory.split(";"),
    dStartDate:
      model.startDate === undefined ? undefined : new Date(model.startDate),
    dEndDate: model.endDate === undefined ? undefined : new Date(model.endDate),
    dDepartureDate:
      model.departureDate === undefined
        ? undefined
        : new Date(model.departureDate),
    dArrivalDate:
      model.arrivalDate === undefined ? undefined : new Date(model.arrivalDate),
    startDate: model.startDate,
    endDate: model.endDate,
    departureDate: model.departureDate,
    arrivalDate: model.arrivalDate,
    engineerList: model.engineerList === "undefined" ? "" : model.engineerList,
    status: model.status === "undefined" ? "" : model.status,
    notes: model.notes === "undefined" ? "" : model.notes,
    isAllowEdit: model.isAllowEdit,
    isAllowAccess: model.isAllowAccess,
  });
};

export const selectViewActivityInformation: Selector<
  IStore,
  ActivityReportViewEditActivityInformation
> = createSelector(
  (state: IStore) => state.activityReportActivityInformation.data!,
  _selectViewActivityInformation
);
// ============================================================================
const _selectViewNotes = (
  model: ActivityReportViewEditNotes
): ActivityReportViewEditNotes => {
  return _mappingViewNotesObject(model);
};

const _mappingViewNotesObject = (
  model: ActivityReportViewEditNotes
): ActivityReportViewEditNotes => {
  return new ActivityReportViewEditNotes({
    activityReportGenID:
      model.activityReportGenID.toString() === "NaN"
        ? 0
        : model.activityReportGenID,
    description: model.description === "undefined" ? "" : model.description,
    symptom: model.symptom === "undefined" ? "" : model.symptom,
    actionTaken: model.actionTaken === "undefined" ? "" : model.actionTaken,
    isAllowEdit: model.isAllowEdit,
    isAllowAccess: model.isAllowAccess,
  });
};

export const selectViewNotes: Selector<
  IStore,
  ActivityReportViewEditNotes
> = createSelector(
  (state: IStore) => state.activityReportNotes.data!,
  _selectViewNotes
);
// ============================================================================
const _selectViewSuperiorReview = (
  model: ActivityReportViewEditSuperiorReview
): ActivityReportViewEditSuperiorReview => {
  return _mappingViewSuperiorReviewObject(model);
};

const _mappingViewSuperiorReviewObject = (
  model: ActivityReportViewEditSuperiorReview
): ActivityReportViewEditSuperiorReview => {
  return new ActivityReportViewEditSuperiorReview({
    activityReportGenID:
      model.activityReportGenID.toString() === "NaN"
        ? 0
        : model.activityReportGenID,
    reviewDate:
      model.reviewDate === undefined ? undefined : new Date(model.reviewDate),
    reviewNotes: model.reviewNotes === "undefined" ? "" : model.reviewNotes,
    superiorID: model.superiorID === undefined ? 0 : model.superiorID,
    superiorName: model.superiorName === "undefined" ? "" : model.superiorName,
    isAllowReview: model.isAllowReview,
    isAllowAccess: model.isAllowAccess,
    department: model.department,
  });
};

export const selectViewSuperiorReview: Selector<
  IStore,
  ActivityReportViewEditSuperiorReview
> = createSelector(
  (state: IStore) => state.activityReportSuperiorReview.data!,
  _selectViewSuperiorReview
);
// ============================================================================
const _selectViewTicketInformation = (
  model: ActivityReportViewEditTicketInformation
): ActivityReportViewEditTicketInformation => {
  return _mappingViewTicketInformationObject(model);
};

const _mappingViewTicketInformationObject = (
  model: ActivityReportViewEditTicketInformation
): ActivityReportViewEditTicketInformation => {
  return new ActivityReportViewEditTicketInformation({
    activityReportGenID:
      model.activityReportGenID.toString() === "NaN"
        ? 0
        : model.activityReportGenID,
    address: model.address === "undefined" ? "" : model.address,
    contactName: model.contactName === "undefined" ? "" : model.contactName,
    customerName: model.customerName === "undefined" ? "" : model.customerName,
    phone: model.phone === "undefined" ? "" : model.phone,
    so: model.so === undefined ? 0 : model.so,
    ticketId: model.ticketId === "undefined" ? "" : model.ticketId,
    funnelGenId: model.funnelGenId === undefined ? 0 : model.funnelGenId,
    isAllowAccess: model.isAllowAccess,
    isAllowEdit: model.isAllowEdit,
    isDraft: model.isDraft,
    projectName: model.projectName,
    activityCategory:
      model.activityCategory === "" ? "" : model.activityCategory,
    activityCategoryArr:
      model.activityCategory === "" ? [] : model.activityCategory.split(";"),
    engineerList: model.engineerList === "undefined" ? "" : model.engineerList,
    symptom: model.symptom === "undefined" ? "" : model.symptom,
  });
};

export const selectViewTicketInformation: Selector<
  IStore,
  ActivityReportViewEditTicketInformation
> = createSelector(
  (state: IStore) => state.activityReportTicketInformation.data,
  _selectViewTicketInformation
);
// ============================================================================
const _selectTotalCustomerExperience = (
  model: ActivityReportViewEditTotalCustomerExperience
): ActivityReportViewEditTotalCustomerExperience => {
  return _mappingViewTotalCustomerExperienceObject(model);
};

const _mappingViewTotalCustomerExperienceObject = (
  model: ActivityReportViewEditTotalCustomerExperience
): ActivityReportViewEditTotalCustomerExperience => {
  return new ActivityReportViewEditTotalCustomerExperience({
    activityReportGenID:
      model.activityReportGenID.toString() === "NaN"
        ? 0
        : model.activityReportGenID,
    totalCustomerExperience:
      model.totalCustomerExperience === "undefined"
        ? ""
        : model.totalCustomerExperience,
    isAllowAccess: model.isAllowAccess,
  });
};

export const selectViewTotalCustomerExperience: Selector<
  IStore,
  ActivityReportViewEditTotalCustomerExperience
> = createSelector(
  (state: IStore) => state.activityReportTotalCustomerExperience.data,
  _selectTotalCustomerExperience
);
// ============================================================================
const _selectCustomerSignature = (
  model: ActivityReportViewCustomerSignature
): ActivityReportViewCustomerSignature => {
  return _mappingViewCustomerSignatureObject(model);
};

const _mappingViewCustomerSignatureObject = (
  model: ActivityReportViewCustomerSignature
): ActivityReportViewCustomerSignature => {
  return new ActivityReportViewCustomerSignature({
    activityReportGenID:
      model.activityReportGenID.toString() === "NaN"
        ? 0
        : model.activityReportGenID,
    customerSignName:
      model.customerSignName === "" ? "" : model.customerSignName,
    dCustomerSignDate:
      model.customerSignDate === ""
        ? undefined
        : new Date(model.customerSignDate),
    customerSignImage:
      model.customerSignImage === "" ? "" : model.customerSignImage,
    isAllowAccess: model.isAllowAccess,
  });
};

export const selectViewCustomerSignature: Selector<
  IStore,
  ActivityReportViewCustomerSignature
> = createSelector(
  (state: IStore) => state.activityReportCustomerSignature.data,
  _selectCustomerSignature
);
// ============================================================================
const _selectActivityReportTicketNumber = (
  model: ActivityReportTicketNumber
): ActivityReportTicketNumber => {
  return _mappingViewActivityReportTicketNumber(model);
};

const _mappingViewActivityReportTicketNumber = (
  model: ActivityReportTicketNumber
): ActivityReportTicketNumber => {
  return new ActivityReportTicketNumber({
    ticketOrTaskNumber:
      model.ticketOrTaskNumber === "" ? "" : model.ticketOrTaskNumber,
    accountID: model.accountID.toString() === "NaN" ? 0 : model.accountID,
    accountName: model.accountName === "" ? "" : model.accountName,
    accountPhone: model.accountPhone === "" ? "" : model.accountPhone,
    accountAddress: model.accountAddress === "" ? "" : model.accountAddress,
    contactID: model.contactID.toString() === "NaN" ? 0 : model.contactID,
    contactName: model.contactName === "" ? "" : model.contactName,
    contactPhone: model.contactPhone === "" ? "" : model.contactPhone,
    contactEmail: model.contactEmail === "" ? "" : model.contactEmail,
    contactAddress: model.contactAddress === "" ? "" : model.contactAddress,
    engineerList: model.engineerList === "undefined" ? "" : model.engineerList,
    activityCategory:
      model.activityCategory === "" ? "" : model.activityCategory,
    activityCategoryArr:
      model.activityCategory === "" ? [] : model.activityCategory.split(";"),
    description: model.description === "" ? "" : model.description,
    dStartDate:
      model.startDate === "null" ? undefined : new Date(model.startDate),
    startDate: model.startDate === "null" ? "" : model.startDate,
    dEndDate: model.endDate === "null" ? undefined : new Date(model.endDate),
    endDate: model.endDate === "null" ? "" : model.endDate,
    isTicket: model.isTicket,
    projectName: model.projectName,
  });
};

export const selectActivityReportTicketNumber: Selector<
  IStore,
  ActivityReportTicketNumber
> = createSelector(
  (state: IStore) => state.activityReport.activityReportTicketNumber,
  _selectActivityReportTicketNumber
);
// ============================================================================
const _selectActivityReportCheckAllowEdit = (
  model: ActivityReportCheckAllowEdit
): ActivityReportCheckAllowEdit => {
  return _mappingActivityReportCheckAllowEdit(model);
};

const _mappingActivityReportCheckAllowEdit = (
  model: ActivityReportCheckAllowEdit
): ActivityReportCheckAllowEdit => {
  return new ActivityReportCheckAllowEdit({
    activityReportGenID:
      model.activityReportGenID.toString() === "NaN"
        ? 0
        : model.activityReportGenID,
    isAllowEdit: model.isAllowEdit,
  });
};

export const selectActivityReportCheckAllowEdit: Selector<
  IStore,
  ActivityReportCheckAllowEdit
> = createSelector(
  (state: IStore) => state.activityReport.activityReportCheckAllowEdit,
  _selectActivityReportCheckAllowEdit
);
// ============================================================================
const _selectActivityReportCheckSOExist = (
  model: ActivityReportCheckSOExist
): ActivityReportCheckSOExist => {
  return _mappingActivityReportCheckSOExist(model);
};

const _mappingActivityReportCheckSOExist = (
  model: ActivityReportCheckSOExist
): ActivityReportCheckSOExist => {
  return new ActivityReportCheckSOExist({
    soNumber: model.soNumber,
    isExist: model.isExist,
  });
};

export const selectActivityReportCheckSOExist: Selector<
  IStore,
  ActivityReportCheckSOExist
> = createSelector(
  (state: IStore) => state.activityReport.activityReportCheckSoExist,
  _selectActivityReportCheckSOExist
);
// ============================================================================
const _selectActivityReportSONumber = (
  model: ActivityReportSONumber
): ActivityReportSONumber => {
  return _mappingViewActivityReportSONumber(model);
};

const _mappingViewActivityReportSONumber = (
  model: ActivityReportSONumber
): ActivityReportSONumber => {
  return new ActivityReportSONumber({
    soNumber: model.soNumber === "undefined" ? "" : model.soNumber,
    // TicketOrTaskNumber: model.TicketOrTaskNumber === '' ? '' : model.TicketOrTaskNumber,
    // AccountID: model.AccountID.toString() === 'NaN' ? 0 : model.AccountID,
    accountName: model.accountName === "undefined" ? "" : model.accountName,
    // AccountPhone: model.AccountPhone === '' ? '' : model.AccountPhone,
    accountAddress:
      model.accountAddress === "undefined" ? "" : model.accountAddress,
    // ContactID: model.ContactID.toString() === 'NaN' ? 0 : model.ContactID,
    // ContactName: model.ContactName === '' ? '' : model.ContactName,
    // ContactPhone: model.ContactPhone === '' ? '' : model.ContactPhone,
    // ContactEmail: model.ContactEmail === '' ? '' : model.ContactEmail,
    // ContactAddress: model.ContactAddress === '' ? '' : model.ContactAddress,
    // EngineerList: model.EngineerList === 'undefined' ? '' : model.EngineerList,
    engineerList: "",
    // ActivityCategory: model.ActivityCategory === '' ? '' : model.ActivityCategory,
    // ActivityCategoryArr: model.ActivityCategory === '' ? [] : model.ActivityCategory.split(';'),
    // Description: model.Description === '' ? '' : model.Description,
    // dStartDate: model.StartDate === 'null' ? undefined : new Date(model.StartDate),
    // StartDate: model.StartDate === 'null' ? '' : model.StartDate,
    // dEndDate: model.EndDate === 'null' ? undefined : new Date(model.EndDate),
    // EndDate: model.EndDate === 'null' ? '' : model.EndDate,
    // IsTicket: model.IsTicket,
    projectName: model.projectName === "undefined" ? "" : model.projectName,
  });
};

export const selectActivityReportSONumber: Selector<
  IStore,
  ActivityReportSONumber
> = createSelector(
  (state: IStore) => state.activityReport.activityReportSONumber,
  _selectActivityReportSONumber
);
// ============================================================================
// AR GetFunnelID
const _selectActivityReportFunnelGenId = (
  models: ActivityReportTicketNumberOptions[]
): any[] => {
  return (
    models &&
    models.map((model: any): any => ({
      title: model.textData,
      price: model.valueData,
    }))
  );
};

export const selectActivityReportFunnelGenId: Selector<
  IStore,
  ActivityReportTicketNumberOptions[]
> = createSelector(
  (state: IStore) => state.activityReport.activityReportFunnelGenId,
  _selectActivityReportFunnelGenId
);

// AR GetFunnelDetail
const _selectActivityReportFunnelGenDetail = (
  model: ActivityReportFunnelDetail
): any => {
  return {
    projectName: model.projectName,
    accountName: model.accountName,
    accountAddress: model.accountAddress,
    contactName: model.contactName,
    accountPhone: model.accountPhone,
  };
};

export const selectActivityReportFunnelGenDetail: Selector<
  IStore,
  ActivityReportFunnelDetail
> = createSelector(
  (state: IStore) => state.activityReport.activityReportFunnelDetail,
  _selectActivityReportFunnelGenDetail
);

// ============================================================================
const _selectActivityReportCheckFunnelExist = (
  model: ActivityReportCheckFunnelGenIdExist
): ActivityReportCheckFunnelGenIdExist => {
  return _mappingActivityReportCheckFunnelExist(model);
};

const _mappingActivityReportCheckFunnelExist = (
  model: ActivityReportCheckFunnelGenIdExist
): ActivityReportCheckFunnelGenIdExist => {
  return new ActivityReportCheckFunnelGenIdExist({
    funnelGenId: model.funnelGenId,
    isExist: model.isExist,
  });
};

export const selectActivityReportCheckFunnelExist: Selector<
  IStore,
  ActivityReportCheckFunnelGenIdExist
> = createSelector(
  (state: IStore) => state.activityReport.activityReportCheckFunnelExist,
  _selectActivityReportCheckFunnelExist
);