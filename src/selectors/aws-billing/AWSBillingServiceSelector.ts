import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import { Selector } from 'react-redux';
import AWSBillingEnvelope from 'stores/aws-billing/models/AWSBillingEnvelope';
import IAWSBillingState from 'stores/aws-billing/models/IAWSBillingState';
import AWSBillingModel from 'stores/aws-billing/models/AWSBillingModel';
import IAWSBillingTableRow from './models/IAWSBillingTableRow';
import IAWSBillingTable from './models/IAWSBillingTable';
import AWSBillingByIdModel from 'stores/aws-billing/models/AWSBillingByIdModel';
import DropDownSearchCBVModel from 'stores/aws-billing/models/DropDownSearchCBVModel';
import DropDownSearchLPRModel from 'stores/aws-billing/models/DropDownSearchLPRModel';
import DropDownPICModel from 'stores/aws-billing/models/DropDownPICModel';
import VoucherAmountPICNameModel from 'stores/aws-billing/models/VoucherAmountPICNameModel';
import UsageDetailDashboardEnvelope from 'stores/aws-billing/models/UsageDetailDashhboard/UsageDetailDashboardEnvelope';
import UsageDetailDashboardModel from 'stores/aws-billing/models/UsageDetailDashhboard/UsageDetailDashboardModel';
import IUsageDashboardDetailRow from './models/UsageDashboardTable/IUsageDashboardTableRow';
import IUsageDashboardDetailTable from './models/UsageDashboardTable/IUsageDashboardTable';
import BillingDetailPerProductEnvelope from 'stores/aws-billing/models/Aws_Billing_Detail_Perproduct/BillingDetailPerProductEnvelope';
import IUsageDashboardPerproductTable from './models/UsageDashboardTablePerProduct/IUsageDashboardPerproductTable';
import BillingDetailPerProductModel from 'stores/aws-billing/models/Aws_Billing_Detail_Perproduct/BillingDetailPerProductModel';
import IUsageDashboardPerproductRow from './models/UsageDashboardTablePerProduct/IUsageDashboardPerproductTableRow.';
import NeccessityModel from 'stores/aws-billing/models/NeccesityModel';
import IUsageDashboardPerproductTableEnvelope from './models/UsageDashboardTablePerProduct/IUsageDashboardPerproductTableEnvelope';
import AWSBillingDetailPerProductModel from 'stores/aws-billing/models/Aws_Billing_Detail_Perproduct/AWSBillingDetailPerProductModel';
import AWSBillingHPermission from 'stores/aws-billing/models/AWSBillingPermission';
import DropDownSearchSOModel from 'stores/aws-billing/models/DropDownSearchSOModel';
import AWSAmountUnsettleModel from 'stores/aws-billing/models/AWSAmountUnsettleModel';
import AWSBillingPeriodModel from 'stores/aws-billing/models/AWSBillingPeriodModel';
import DropDownModel from 'stores/aws-billing/models/DropDownModel';

const _selectAWSBillings = (models: AWSBillingEnvelope): IAWSBillingTable => {
  return {
    totalRows: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: AWSBillingModel[]): IAWSBillingTableRow[] => {
  return models && models.map((model: AWSBillingModel): IAWSBillingTableRow => _mappingObjectTableRow(model));
};

export const selectAWSBillings: Selector<IStore, IAWSBillingTable> = createSelector(
  (state: IStore) => state.awsBilling.listData!,
  _selectAWSBillings
);

const _mappingObjectTableRow = (model: AWSBillingModel): IAWSBillingTableRow => {
//   console.log('model',model)
  return {
    billingIdH: model.billingIdH,
    billingPeriod: model.billingPeriod,
    billingPeriodStart: model.billingPeriodStart,
    billingPeriodStartStr: model.billingPeriodStartStr,
    billingPeriodEnd: model.billingPeriodEnd,
    billingPeriodEndStr: model.billingPeriodEndStr,
    accountId: model.accountId,
    picName: model.picName,
    picNameID: model.picNameID,
    picNameDept: model.picNameDept,
    customerName: model.customerName,
    totalBillingUsd: model.totalBillingUsd,
    rate: model.rate,
    credit: model.credit,
    usageAmount: model.usageAmount,
    savingPlanAmount: model.savingPlanAmount,
    savingPlanNego: model.savingPlanNego,
    savingPlanFee: model.savingPlanFee,
    customerNameID: model.customerNameID,
    discountUsage: model.discountUsage,
    sppDiscount: model.sppDiscount,
    fee:  model.fee,
    riFee: model.riFee,
    tax: model.tax,
    invoiceNo: model.invoiceNo,
    totalBillingIdr: model.totalBillingIdr,
    billingStatus: model.billingStatus,
    syncDate: model.syncDate,
    syncDateStr: model.syncDateStr,
    createdBy: model.createdBy,
    createdDate: model.createdDate,
    modifiedBy: model.modifiedBy,
    modifiedDate: model.modifiedDate,
    isUsageDetail: model.isUsageDetail,
    so: model.so,
    flag: model.flag,
    mpa: model.mpa
  };
};

//AWS Billing Get ID
const _selectAWSBillingById = (models: AWSBillingByIdModel): any => {
  // console.log('models',models)
  return {
    billingIdH: models.billingIdH,
    billingPeriod: models.billingPeriod,
    billingPeriodStart: models.billingPeriodStart,
    billingPeriodStartStr: models.billingPeriodStartStr,
    billingPeriodEnd: models.billingPeriodEnd,
    billingPeriodEndStr: models.billingPeriodEndStr,
    accountId: models.accountId,
    picName: models.picName,
    customerName: models.customerName,
    totalBillingUsd: models.totalBillingUsd,
    rate: models.rate,
    credit: models.credit,
    usageAmount: models.usageAmount,
    discountUsage: models.discountUsage,
    sppDiscount: models.sppDiscount,
    fee: models.fee,
    riFee: models.riFee,
    tax: models.tax,
    totalBillingIdr: models.totalBillingIdr,
    billingStatus: models.billingStatus,
    syncDate: models.syncDate,
    syncDateStr: models.syncDateStr,
    createdBy: models.createdBy,
    createdDate: models.createdDate,
    modifiedBy: models.modifiedBy,
    modifiedDate: models.modifiedDate,
    outstandingBilling: models.outstandingBilling,
    outstandingBillingIDR: models.outstandingBillingIDR,
    porjectName: models.porjectName
  };
};

export const selectAWSBillingById: Selector<IStore, AWSBillingByIdModel> = createSelector(
  (state: IStore) => state.awsBilling.getDataById,
  _selectAWSBillingById
);

// DropDownSearchCBV
const _selectDropDownSearchCBV = (models: DropDownSearchCBVModel[]): any[] => {
  
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownSearchCBV: Selector<IStore, DropDownSearchCBVModel[]> = createSelector(
  (state: IStore) => state.awsBilling.dropdownCbv,
  _selectDropDownSearchCBV
);

// DropDownSearchLPR
const _selectDropDownSearchLPR = (models: DropDownSearchLPRModel[]): any[] => {
  
  return models.map((model: any): any => ({
    textData: model.textData,
    valueData: model.valueData,
  }));
};

export const selectDropDownSearchLPR: Selector<IStore, DropDownSearchLPRModel[]> = createSelector(
  (state: IStore) => state.awsBilling.dropdownLpr,
  _selectDropDownSearchLPR
);

// DropDownPIC
const _selectDropDownPIC = (models: DropDownPICModel[]): any[] => {
  return models && models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownPIC: Selector<IStore, DropDownPICModel[]> = createSelector(
  (state: IStore) => state.awsBilling.dropdownPIC,
  _selectDropDownPIC
);

// DropDownSearchSO
const _selectDropDownSearchSO = (models: DropDownSearchSOModel[]): any[] => {
  
  return models.map((model: any): any => ({
    text: model.text,
    value: model.value,
  }));
};

export const selectDropDownSearchSO: Selector<IStore, DropDownSearchSOModel[]> = createSelector(
  (state: IStore) => state.awsBilling.dropdownSo,
  _selectDropDownSearchSO
);

// DropDownCustomerNameAWS
const _selectDropDownCustomerNameAWS = (models: DropDownModel[]): any[] => {
  return models && models.map((model: any): any => ({
    title: model.text,
    price: model.value,
  }));
};

export const selectDropDownCustomerNameAWS: Selector<IStore, DropDownModel[]> = createSelector(
  (state: IStore) => state.awsBilling.dropdownCustomerNameAWS,
  _selectDropDownCustomerNameAWS
);

// DropDownDeptAWS
const _selectDropDownDeptAWS = (models: DropDownModel[]): any[] => {
  return models && models.map((model: any): any => ({
    title: model.text,
    price: model.value,
  }));
};

export const selectDropDownDeptAWS: Selector<IStore, DropDownModel[]> = createSelector(
  (state: IStore) => state.awsBilling.dropdownDeptAWS,
  _selectDropDownDeptAWS
);

// DropDownPicAWS
const _selectDropDownPicAWS = (models: DropDownModel[]): any[] => {
  return models && models.map((model: any): any => ({
    title: model.text,
    price: model.value,
  }));
};

export const selectDropDownPicAWS: Selector<IStore, DropDownModel[]> = createSelector(
  (state: IStore) => state.awsBilling.dropdownPicAWS,
  _selectDropDownPicAWS
);


// GetDetailVoucherAmount
const _selectVoucherAmount = (models: VoucherAmountPICNameModel): any => {
  // console.log('models',models)
  return {
    value: models.value
  };
};

export const selectVoucherAmount: Selector<IStore, VoucherAmountPICNameModel> = createSelector(
  (state: IStore) => state.awsBilling.VoucherAmount,
  _selectVoucherAmount
);

//DashboardCBVUusageDetail
const _selectUsageDetails = (models: UsageDetailDashboardEnvelope): IUsageDashboardDetailTable => {
  // console.log('models',models)
  return {
    totalRows: models.totalRows,
    rows: _createUsageDetailTableRows(models.rows),
  };
};

const _createUsageDetailTableRows = (models: UsageDetailDashboardModel[]): IUsageDashboardDetailRow[] => {
  return models && models.map((model: UsageDetailDashboardModel): IUsageDashboardDetailRow => _mappingObjectUsageDetailTableRow(model));
};

export const selectUsageDetails: Selector<IStore, IUsageDashboardDetailTable> = createSelector(
  (state: IStore) => state.awsBilling.usageDetailDashboard,
  _selectUsageDetails
);

const _mappingObjectUsageDetailTableRow = (model: UsageDetailDashboardModel): IUsageDashboardDetailRow => {
  // console.log('model',model)
  return {
    usageId : model.usageId,
    billingIdH : model.billingIdH,
    creditId : model.creditId,
    lprNumber : model.lprNumber,
    cbvNumber : model.cbvNumber,
    soNo : model.soNo ,
    so: model.so,
    oiNo : model.oiNo ,
    funnelId : model.funnelId ,
    usageAmount : model.usageAmount ,
    necessity : model.necessity ,
    resources : model.resources ,
    notes : model.notes ,
    createdBy : model.createdBy ,
    createdDate : model.createdDate ,
    modifiedBy : model.modifiedBy ,
    modifiedDate : model.modifiedDate 
  };
};

//DashboardUsageDetailPerProduct
const _selectUsageDetailPerProductEnvelope = (models: BillingDetailPerProductEnvelope): IUsageDashboardPerproductTableEnvelope => {
  // console.log('models',models)
  return {
    totalAmount: models.totalAmount,
    awsBillingDetail: _selectUsageDetailPerProduct(models.awsBillingDetail),
  };
};

const _selectUsageDetailPerProduct = (models: AWSBillingDetailPerProductModel[]): IUsageDashboardPerproductTable[] => {
    // console.log('modoels',models)
  return models && models.map((model: any): any => ({
    period: model.period,
    productCode: model.productCode,
    totalUsageAmount: model.totalUsageAmount,
    awsBillingDetail: _mappingObjectUsageDetailPerProductTableRow(model.awsBillingDetail),
  }));
};

export const selectUsageDetailPerProduct: Selector<IStore, IUsageDashboardPerproductTableEnvelope> = createSelector(
  (state: IStore) => state.awsBilling.BillingDetailPerProduct,
  _selectUsageDetailPerProductEnvelope
);

const _mappingObjectUsageDetailPerProductTableRow = (models: BillingDetailPerProductModel[]): IUsageDashboardPerproductTable[] => {
  
  return models.map((model: any): any => ({
    billingIdD : model.billingIdD,
    billingIdH : model.billingIdH,
    invoiceNumber : model.invoiceNumber,
    productCode : model.productCode,
    billingPeriodStart : model.billingPeriodStart,
    billingPeriodEnd : model.billingPeriodEnd ,
    accountId : model.accountId ,
    picName : model.picName ,
    customerName : model.customerName ,
    usageAmount : model.usageAmount ,
    creditAmount : model.creditAmount ,
    discUsageAmount : model.discUsageAmount ,
    discSppAmount : model.discSppAmount ,
    feeAmount : model.feeAmount ,
    riFeeAmount : model.riFeeAmount ,
    syncDate: model.syncDate,
    taxAmount : model.taxAmount,
    savingPlanAmount: model.savingPlanAmount,
    savingPlanNego: model.savingPlanNego,
    savingPlanFee: model.savingPlanFee,
    modifiedDate : model.modifiedDate,
    modifiedById : model.modifiedById
  }));
};


//AmountUnsettleOrdering
const _selectAmountUnsettleOrdering = (models: AWSAmountUnsettleModel): any => {
  // console.log('models',models)
  return {
    value: models.value,
  };
};

export const selectAmountUnsettleOrdering: Selector<IStore, AWSAmountUnsettleModel> = createSelector(
  (state: IStore) => state.awsBilling.AmountUnsettleOrdering,
  _selectAmountUnsettleOrdering
);

//AmountUnsettleSelling
const _selectAmountUnsettleSelling = (models: AWSAmountUnsettleModel): any => {
  // console.log('models',models)
  return {
    value: models.value,
  };
};

export const selectAmountUnsettleSelling: Selector<IStore, AWSAmountUnsettleModel> = createSelector(
  (state: IStore) => state.awsBilling.AmountUnsettleSelling,
  _selectAmountUnsettleSelling
);

//BillingPeriod
const _selectBillingPeriod = (models: AWSBillingPeriodModel): any => {
  // console.log('models',models)
  return {
    value: models.value,
  };
};

export const selectBillingPeriod: Selector<IStore, AWSBillingPeriodModel> = createSelector(
  (state: IStore) => state.awsBilling.BillingPeriod,
  _selectBillingPeriod
);

// Neccesity
const _selectNeccesity = (models: NeccessityModel[]): any[] => {
  return models && models.map((model: any): any => ({
    value: model.udcid,
    entryKey: model.entryKey,
    text: model.text1,
    text2: model.text2,
    text3: model.text3,
    text4: model.text4,
    text5: model.text5,
    text6: model.text6,
    text7: model.text7,
    inum1: model.inum1,
  
  }));
};

export const selectNeccesity: Selector<IStore, NeccessityModel[]> = createSelector(
  (state: IStore) => state.awsBilling.dataNeccesity,
  _selectNeccesity
);

// AWSBillingPermission
const _selectAwsBillingPermission = (models: AWSBillingHPermission[]): any[] => {
  return models && models.map((model: any): any => ({
    value: model.udcid,
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

export const selectPermission: Selector<IStore, AWSBillingHPermission[]> = createSelector(
  (state: IStore) => state.awsBilling.dataNeccesity,
  _selectAwsBillingPermission
);