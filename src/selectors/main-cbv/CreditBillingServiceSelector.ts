import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import ICreditBillingTable from './models/ICreditBillingTable';
import ICreditBillingTableRow from './models/ICreditBillingTableRow';
import CreditBillingEnvelope from 'stores/main-cbv/models/CreditBillingEnvelope';
import CreditBillingModel from 'stores/main-cbv/models/CreditBillingModel';
import { Selector } from 'react-redux';
import SearchProjectNameModel from 'stores/main-cbv/models/SearchProjectNameModel';
import CBVAttachmentModel from 'stores/main-cbv/models/CBVAttachmentModel';
import CBVAssignModel from 'stores/main-cbv/models/CBVAssignModel';
import CBVDetail from 'stores/main-cbv/models/CBVDetail';
import CBVCreditByIDModel from 'stores/main-cbv/models/CBVCreditByIDModel';
import CBVDocTypeModel from 'stores/main-cbv/models/CBVDocTypeModel';
import CBVUsageDetailEnvelope from 'stores/main-cbv/models/Detail_Usage_CBV/CBVUsageDetailEnvelope';
import IGetListDetailUsageCBVTable from './models/GetListDetailUsageCBV/IGetListDetailUsageCBVTable';
import CBVUsageDetailDashboard from 'stores/main-cbv/models/Detail_Usage_CBV/CBVUsageDetailDashboard';
import IGetListDetailUsageCBVTableRow from './models/GetListDetailUsageCBV/IGetListDetailUsageCBVTableRow';
import DropDownBillingPeriodModel from 'stores/main-cbv/models/DropDownBillingPeriodModel';
import VoucherAmountPICNameModel from 'stores/aws-billing/models/VoucherAmountPICNameModel';
import CBVAssignDetailMapping from 'stores/main-cbv/models/CBVAssignDetailMapping';
import CBVTypeVoucherModel from 'stores/main-cbv/models/CBVTypeVoucherModel';
import CBVEntitlementModel from 'stores/main-cbv/models/CBVEntitlementModel';

const _selectCreditBillings = (models: CreditBillingEnvelope): ICreditBillingTable => {
  // console.log('models',models)
  return {
    totalRows: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: CreditBillingModel[]): ICreditBillingTableRow[] => {
  return models.map((model: CreditBillingModel): ICreditBillingTableRow => _mappingObjectTableRow(model));
};

export const selectCreditBillings: Selector<IStore, ICreditBillingTable> = createSelector(
  (state: IStore) => state.creditBilling.listData!,
  _selectCreditBillings
);

const _mappingObjectTableRow = (model: CreditBillingModel): ICreditBillingTableRow => {
  return {
    creditId: model.creditId,
    voucherNo: model.voucherNo,
    accountID: model.accountID,
    voucherAmountH: model.voucherAmountH,
    usedAmountH: model.usedAmountH,
    remainingAmountH: model.remainingAmountH,
    sourceCustomerID: model.sourceCustomerID,
    sourceCustomerIDStr: model.sourceCustomerIDStr,
    picName: model.picName,
    notes: model.notes,
    createdBy: model.createdBy,
    createdDate: model.createdDate,
    modifiedBy: model.modifiedBy,
    modifiedDate: model.modifiedDate,
    createDate: model.createDate,
    createUserID: model.createUserID,
    modifyDate: model.modifyDate,
    modifyUserID: model.modifyUserID,
  };
};

//Search

const _selectProjectNames = (models: SearchProjectNameModel[]): any[] => {
  // console.log('models',models)
  return models.map((model: any): any => ({
    textData: model.textData,
    valueData: model.valueData,
  }));
};

export const selectProjectNames: Selector<IStore, SearchProjectNameModel[]> = createSelector(
  (state: IStore) => state.creditBilling.projectName,
  _selectProjectNames
);


//CBV Attachment
const _selectCBVAttachment = (models: CBVAttachmentModel[]): any[] => {
  
  return models.map((model: any): any => ({
    attachmentId: model.attachmentId,
    creditId: model.creditId,
    documentTypeID: model.documentTypeID,
    documentType: model.documentType,
    fileName: model.fileName,
    documentName: model.documentName,
    notes: model.notes,
    versionNumber: model.versionNumber,
    activeFlag: model.activeFlag,
    fileExtension: model.fileExtension,
    fileSize: model.fileSize,
    fileDownload: model.fileDownload,
    createdBy: model.createdBy,
    createdDate: model.createdDate,
    modifiedBy: model.modifiedBy,
    modifiedDate: model.modifiedDate
  }));
};

export const selectCBVAttachment: Selector<IStore, CBVAttachmentModel[]> = createSelector(
  (state: IStore) => state.creditBilling.CBVAttachment,
  _selectCBVAttachment
);

//CBV Assign
const _selectCBVAssign = (models: CBVAssignModel[]): any[] => {
  
  return models.map((model: any): any => ({
    creditDetailId: model.creditDetailId,
    creditId: model.creditId,
    salesId: model.salesId,
    salesName: model.salesName ? model.salesName : null,
    voucherAmountD: model.voucherAmountD,
    usedAmountD: model.usedAmountD,
    remainingAmountD: model.remainingAmountD,
    notes: model.notes,
    customerName: model.customerName,
    projectName: model.projectName,
    createDate: model.createDate,
    createUserID: model.createUserID,
    modifyDate: model.modifyDate,
    modifyUserID: model.modifyUserID,
    isDelete: model.isDelete
    // console.log('models',model)
    // textData: model.textData,
    // valueData: model.valueData,
  }));
};

export const selectCBVAssign: Selector<IStore, CBVAssignModel[]> = createSelector(
  (state: IStore) => state.creditBilling.CBVAssign,
  _selectCBVAssign
);

// CBV Detail

const _selectCBVAssignDetailMapping = (models: CBVAssignDetailMapping[]): any[] => {
  
  return models.map((model: any): any => ({
    creditDetailId: model.creditDetailId,
    creditId: model.creditId,
    salesId: model.salesId,
    salesName: model.salesName ? model.salesName : null,
    voucherAmountD: model.voucherAmountD,
    usedAmountD: model.usedAmountD,
    remainingAmountD: model.remainingAmountD,
    notes: model.notes,
    customerName: model.customerName,
    projectName: model.projectName,
    createdBy: model.createdBy,
    createdDate: model.createdDate,
    modifiedBy: model.modifiedBy,
    modifiedDate: model.modifiedDate,
    isDelete: model.isDelete
    // console.log('models',model)
    // textData: model.textData,
    // valueData: model.valueData,
  }));
};

const _selectCBVAssignDetail = (models: CBVDetail[]): any[] => {
  
  return models.map((model: any): any => ({
    isShow: model.isShow,
    picName: model.picName,
    totalReceivedAmount: model.totalReceivedAmount,
    totalUsedAmount: model.totalUsedAmount,
    totalRemainingAmount: model.totalRemainingAmount,
    creditDetail: _selectCBVAssignDetailMapping(model.creditDetail)
  }));
};

export const selectCBVAssignDetail: Selector<IStore, CBVDetail[]> = createSelector(
  (state: IStore) => state.creditBilling.CBVDetail,
  _selectCBVAssignDetail
);

//CBV Get By ID
const _selectCBVCreditById = (models: CBVCreditByIDModel): any => {
  // console.log('models',models)
  return {
    creditId: models.creditId,
    voucherNo: models.voucherNo,
    sourceCustomerId: models.sourceCustomerId,
    sourceCustomerIdStr: models.sourceCustomerIdStr,
    voucherAmountH: models.voucherAmountH,
    usedAmountH: models.usedAmountH,
    remainingAmountH: models.remainingAmountH,
    accountId: models.accountId,
    creditType: models.creditType,
    creditTypeStr: models.creditTypeStr,
    notes: models.notes,
    createDate: models.createDate,
    createUserID: models.createUserID,
    modifyDate: models.modifyDate,
    modifyUserID: models.modifyUserID
  };
};

export const selectCBVCreditById: Selector<IStore, CBVCreditByIDModel> = createSelector(
  (state: IStore) => state.creditBilling.CBVGetById,
  _selectCBVCreditById
);


//CBV DocType
const _selectCBVDocType = (models: CBVDocTypeModel[]): any[] => {
  
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value
  }));
};

export const selectCBVDocType: Selector<IStore, CBVDocTypeModel[]> = createSelector(
  (state: IStore) => state.creditBilling.CBVDocType,
  _selectCBVDocType
);

//DropDownPeriod
const _selectDropDownPeriod = (models: DropDownBillingPeriodModel[]): any[] => {
  
  return models.map((model: any): any => ({
    text: model.textData,
    value: model.valueData
  }));
};

export const selectDropDownperiod: Selector<IStore, DropDownBillingPeriodModel[]> = createSelector(
  (state: IStore) => state.creditBilling.DropDownBilling,
  _selectDropDownPeriod
);


//Dashboard Detail Usage CBV

const _selectDashboardDetailUsageCBV = (models: CBVUsageDetailEnvelope): IGetListDetailUsageCBVTable => {
  // console.log('models',models)
  return {
    totalRows: models.totalRows,
    totalCBVAmount:models.totalCBVAmount,
    totalUsedAmount: models.totalUsedAmount,
    totalRemainingAmount: models.totalRemainingAmount,
    rows: _createTableDetailUsageCBVRows(models.rows),
  };
};

const _createTableDetailUsageCBVRows = (models: CBVUsageDetailDashboard[]): IGetListDetailUsageCBVTableRow[] => {
  return models.map((model: CBVUsageDetailDashboard): IGetListDetailUsageCBVTableRow => _mappingObjectTableDetailUsageCBVRow(model));
};

export const selectDashboardDetailUsageCBV: Selector<IStore, IGetListDetailUsageCBVTable> = createSelector(
  (state: IStore) => state.creditBilling.cbvusagedetailData,
  _selectDashboardDetailUsageCBV
);

const _mappingObjectTableDetailUsageCBVRow = (model: CBVUsageDetailDashboard): IGetListDetailUsageCBVTableRow => {
  return {
    usageId: model.usageId,
    billingIdH: model.billingIdH,
    creditDetailId: model.creditDetailId,
    funnelId: model.funnelId,
    period: model.period,
    accountId: model.accountId,
    amount: model.amount,
    necessity: model.necessity,
    resources: model.resources,
    customerName: model.customerName,
    projectName: model.projectName,
    notes: model.notes,
    status: model.status,
    createdBy: model.createdBy,
    createdDate: model.createdDate,
    modifiedBy: model.modifiedBy,
    modifiedDate: model.modifiedDate,
  };
};

// AWSVoucherType
const _selectVoucherTypeCBV = (models: CBVTypeVoucherModel[]): any[] => {
  return models && models.map((model: any): any => ({
    udcid: model.udcid,
    entryKey: model.entryKey,
    text1: model.text1,
    text2: model.text2,
    text3: model.text3,
    text4: model.text4,
    text5: model.text5,
    text6: model.text6,
    text7: model.text7,
    inum1: model.inum1,
  
  }));
};

export const selectCBVTypeVoucher: Selector<IStore, CBVTypeVoucherModel[]> = createSelector(
  (state: IStore) => state.creditBilling.dataVoucherType,
  _selectVoucherTypeCBV
);

//CBV Entitlement
const _selectCBVCreditEntitlement = (models: CBVEntitlementModel): any => {
  // console.log('models',models)
  return {
    entId: models.entId,
    billingPeriod: models.billingPeriod,
    creditEntitlement: models.creditEntitlement,
    creditUsage: models.creditUsage,
    creditRemainingLastPeriod: models.creditRemainingLastPeriod,
    creditRemaining: models.creditRemaining,
    syncDate: models.syncDate,
  };
};

export const selectCBVCreditEntitlement: Selector<IStore, CBVEntitlementModel> = createSelector(
  (state: IStore) => state.creditBilling.CBVCreditEntitlement,
  _selectCBVCreditEntitlement
);