import FunnelDashboardModel from '../../stores/funnel/models/FunnelDashbordModel';
import { createSelector, ParametricSelector } from 'reselect';
import IStore from '../../models/IStore';
import IFunnelTable from './models/IFunnelTable';
import IFunnelTableRow from './models/IFunnelTableRow';
import FunnelDashboardEnvelope from '../../stores/funnel/models/FunnelDashboardEnvelope';
import { Selector } from 'react-redux';
import FunnelModel from 'stores/funnel/models/FunnelModel';
import FunnelViewEditStatus from 'stores/funnel/models/view-edit/FunnelViewEditStatus';
import FunnelViewEditCustomer from 'stores/funnel/models/view-edit/FunnelViewEditCustomer';
import FunnelViewEditSelling from 'stores/funnel/models/view-edit/FunnelViewEditSelling';
import FunnelViewEditCustomerPO from 'stores/funnel/models/view-edit/FunnelViewEditCustomerPO';
import FunnelViewEditAdditional from 'stores/funnel/models/view-edit/FunnelViewEditAdditional';
import { FunnelViewEditCommisionIndex, FunnelViewEditConfirmation, ServiceAreaBufferResource } from 'stores/funnel/models/view-edit';
import FunnelViewEditCustomerDetails from 'stores/funnel/models/view-edit/FunnelViewEditCustomerDetails';
import FunnelFilter from 'stores/funnel/models/FunnelFilter';
import FunnelHeaderNameModel from 'stores/funnel/models/FunnelHeaderNameModel';
import IFunnelState from 'stores/funnel/models/IFunnelState';
import FunnelAuthorization from 'stores/funnel/models/FunnelAuthorization';
import FunnelHistoryEnvelope from 'stores/funnel/models/FunnelHistoryEnvelope';
import FunnelCurrencyUdcModel from 'stores/funnel/models/FunnelCurrencyUdcModel';
import FunnelStatusModel from 'stores/funnel-status/models/FunnelStatusModel';
import GetActivityReqReopenSAModel from 'stores/funnel-sales-analyst/funnel-sa/models/GetActivityReqReopenSAModel';
import moment from 'moment';
import FunnelTopHistoryEnvelope from 'stores/funnel-top/models/FunnelTopHistoryEnvelope';
import FunnelHistoryGpm from 'stores/funnel/models/FunnelHistoryGpm';
import FunnelViewEditCustomerByProjectId, { ActualDuration } from 'stores/funnel/models/view-edit/FunnelViewEditCustomerByProjectId';
import IFunnelHistoryGpm, { RowHistoryGpm } from './models/IFunnelHistoryGpm';
import FunnelHistoryGpmModel from 'stores/funnel/models/FunnelHistoryGpmModel';
import EmployeeHierarcyModel from 'stores/employee/models/EmployeeHierarcyModel';
import FunnelDropdownConfirmation from 'stores/funnel/models/FunnelDropdownConfirmation';

const _selectFunnels = (models: FunnelDashboardEnvelope): IFunnelTable => {
  return {
    totalRow: models.totalRows,
    rows: _createTableRows(models.funnels),
    totalSellingPriceSum: models.totalSellingPriceSum,
    totalOrderingItem: models.totalOrderingItem,
    totalSellingItem: models.totalSellingItem,
    gpmAmountSum: models.gpmAmountSum,
  };
};

const _createTableRows = (models: FunnelDashboardModel[]): IFunnelTableRow[] => {
  return models.map((model: FunnelDashboardModel): IFunnelTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: FunnelDashboardModel): IFunnelTableRow => {
  return {
    funnelGenID: model.funnelGenID,
    funnelID: model.funnelID,
    salesID: model.salesID,
    salesName: model.salesName,
    presalesName: model.presalesName,
    customerName: model.customerName,
    projectName: model.projectName,
    totalSellingPrice: model.totalSellingPrice,
    totalOrderingItem: model.totalOrderingItem,
    totalSellingItem: model.totalSellingItem,
    gpmPctg: model.gpmPctg,
    gpmAmount: model.gpmAmount,
    createDate: model.createDate,
    dealCloseDate: model.dealCloseDate,
    funnelStatus: model.funnelStatus,
    customerGenID: model.customerGenID,
    productManager: model.productManager,
    dept: model.dept,
    commercialWorkflowStatus: model.commercialWorkflowStatus ? model.commercialWorkflowStatus : '-',
    serviceWorkflowStatus: model.serviceWorkflowStatus ? model.serviceWorkflowStatus : '-',
    flagSA: model.flagSA,
    flagOpen: model.flagOpen,
    soidc: model.soidc,
    soParent: model.soParent,
    saDate: model.saDate,
    saNumber: model.saNumber,
    currency: model.currency,
    rate: model.rate,
    reassignFlag: model.reassignFlag,
    stepName: model.stepName  ,
    flagManual: model.flagManual,
    lastNotesActivityThisWeek: model.lastNotesActivityThisWeek,
    lastNotesActivityPrevWeek: model.lastNotesActivityPrevWeek,
    reopenProjectStatusApproval: model.reopenProjectStatusApproval
  };
};

export const selectFunnels: Selector<IStore, IFunnelTable> = createSelector((state: IStore) => state.funnel.data!, _selectFunnels);

const _selectFunnel = (model: FunnelModel): FunnelModel => {
  return _mappingObject(model);
};

const _mappingObject = (model: FunnelModel): FunnelModel => {
  return new FunnelModel({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    funnelID: model.funnelID === 'undefined' ? '' : model.funnelID,
    funnelStatusID: model.funnelStatusID,
    softwareList: model.softwareList,
    //dealCloseDate:(model.dealCloseDate === 'undefined' ? '' : model.dealCloseDate ),
    salesID: model.salesID,
    customerGenID: model.customerGenID,
    endUserCustomerGenID: model.endUserCustomerGenID.toString() === 'NaN' ? 0 : model.endUserCustomerGenID,
    customerPICID: model.customerPICID,
    projectName: model.projectName === 'undefined' ? '' : model.projectName,
    gpmPctg: model.gpmPctg.toString() === 'NaN' ? 0 : model.gpmPctg,
    gpmAmount: model.gpmAmount.toString() === 'NaN' ? 0 : model.gpmAmount,
    totalOrderingPriceProduct: model.totalOrderingPriceProduct.toString() === 'NaN' ? 0 : model.totalOrderingPriceProduct,
    totalSellingPriceProduct: model.totalSellingPriceProduct.toString() === 'NaN' ? 0 : model.totalSellingPriceProduct,
    totalOrderingPriceService: model.totalOrderingPriceService.toString() === 'NaN' ? 0 : model.totalOrderingPriceService,
    totalSellingPriceService: model.totalSellingPriceService.toString() === 'NaN' ? 0 : model.totalSellingPriceService,
    totalOrderingPrice: model.totalOrderingPrice.toString() === 'NaN' ? 0 : model.totalOrderingPrice,
    totalSellingPrice: model.totalSellingPrice.toString() === 'NaN' ? 0 : model.totalSellingPrice,
    compellingEvent: model.compellingEvent === 'undefined' ? '' : model.compellingEvent,
    customerBudget: model.customerBudget.toString() === 'NaN' ? 0 : model.customerBudget,
    supportiveCoach: model.supportiveCoach === 'undefined' ? '' : model.supportiveCoach,
    customerNeeds: model.customerNeeds === 'undefined' ? '' : model.customerNeeds,
    competitor: model.competitor === 'undefined' ? '' : model.competitor,
    presalesDeptID: model.presalesDeptID === 'undefined' ? '' : model.presalesDeptID,
    preSalesDeptArr: model.presalesDeptID === 'undefined' ? [] : model.presalesDeptID.split(','),
    pmoDeptID: model.pmoDeptID === 'undefined' ? '' : model.pmoDeptID,
    smoDeptID: model.smoDeptID === 'undefined' ? '' : model.smoDeptID,
    //estStartProjectDate:(model.estStartProjectDate === 'undefined' ? '' : model.estStartProjectDate ),
    commercialWorkflowStatus: model.commercialWorkflowStatus === 'undefined' ? '' : model.commercialWorkflowStatus,
    serviceWorkflowStatus: model.serviceWorkflowStatus === 'undefined' ? '' : model.serviceWorkflowStatus,
    openProjectSAWorkflowStatus: model.openProjectSAWorkflowStatus === 'undefined' ? '' : model.openProjectSAWorkflowStatus,
    openProjectSAWorkflow: model.openProjectSAWorkflow === 'undefined' ? '' : model.openProjectSAWorkflow,
    currency: model.currency.toString() === 'undefined' ? 'IDR' : model.currency,
    rate: model.rate.toString() === 'NaN' ? 0 : model.rate,
    salesAdmin: model.salesAdmin === 'undefined' ? '' : model.salesAdmin,
  });
};

export const selectFunnel: Selector<IStore, FunnelModel> = createSelector((state: IStore) => state.funnel.firstData, _selectFunnel);

const _selectViewFunnelStatus = (model: FunnelViewEditStatus): FunnelViewEditStatus => {
  return _mappingViewFunnelStatusObject(model);
};

const _mappingViewFunnelStatusObject = (model: FunnelViewEditStatus): FunnelViewEditStatus => {
  return new FunnelViewEditStatus({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    funnelID: model.funnelID === 'undefined' ? '' : model.funnelID,
    funnelStatusID: model.funnelStatusID === undefined ? 0 : model.funnelStatusID,
    dealCloseDate: new Date(model.dealCloseDate!),
    salesName: model.salesName,
    deptName: model.deptName,
    salesID: model.salesID,
    funnelStatus: model.funnelStatus,
    flagOpen: model.flagOpen,
    createDate: model.createDate
  });
};

export const selectViewFunnelStatus: Selector<IStore, FunnelViewEditStatus> = createSelector(
  (state: IStore) => state.funnel.funnelViewEditStatus!,
  _selectViewFunnelStatus
);

const _selectViewFunnelCustomer = (model: FunnelViewEditCustomer): FunnelViewEditCustomer => {
  return _mappingViewFunnelCustomerObject(model);
};

const _mappingViewFunnelCustomerObject = (model: FunnelViewEditCustomer): FunnelViewEditCustomer => {
  return new FunnelViewEditCustomer({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    funnelID: model.funnelID === 'undefined' ? '' : model.funnelID,
    actStartProjectDate: model.actStartProjectDate === undefined ? undefined : new Date(model.actStartProjectDate!),
    actEndProjectDate: model.actEndProjectDate === undefined ? undefined : new Date(model.actEndProjectDate!),
    estStartProjectDate: model.estStartProjectDate === undefined ? undefined : new Date(model.estStartProjectDate!),
    estEndProjectDate: model.estEndProjectDate === undefined ? undefined : new Date(model.estEndProjectDate!),
    customerGenID: model.customerGenID === undefined ? 0 : model.customerGenID,
    customerName: model.customerName === 'undefined' ? '' : model.customerName,
    endUserCustomerGenID: model.endUserCustomerGenID === undefined ? 0 : model.endUserCustomerGenID,
    endUserCustomerName: model.endUserCustomerName === 'undefined' ? '' : model.endUserCustomerName,
    estDurationProject: model.estDurationProject === undefined || isNaN(model?.estDurationProject) ? 0 : model.estDurationProject,
    estDurationType: model.estDurationType === 'undefined' ? '' : model.estDurationType,
    pmoDeptID: model.pmoDeptID === 'undefined' ? '' : model.pmoDeptID,
    smoDeptID: model.smoDeptID === 'undefined' ? '' : model.smoDeptID,
    presalesDeptID: model.presalesDeptID === 'undefined' ? '' : model.presalesDeptID,
    projectName: model.projectName === 'undefined' ? '' : model.projectName,
    reqDedicatedResource: model.reqDedicatedResource === undefined ? 0 : model.reqDedicatedResource,
    preSalesDeptArr: model.presalesDeptID === 'undefined' ? [] : model.presalesDeptID.split(','),
    customerAddress: model.customerAddress === 'undefined' ? '' : model.customerAddress,
    phoneNumber: model.phoneNumber === 'undefined' ? '' : model.phoneNumber,
    npwpNumber: model.npwpNumber === 'undefined' ? '' : model.npwpNumber,
    picName: model.picName === 'undefined' ? '' : model.picName,
    picMobilePhone: model.picMobilePhone === 'undefined' ? '' : model.picMobilePhone,
    picEmailAddr: model.picEmailAddr === 'undefined' ? '' : model.picEmailAddr,
    chkPMODeptID: model.pmoDeptID.length > 0 ? true : false,
    chkSMODeptID: model.smoDeptID.length > 0 ? true : false,
    customerCardID: model.customerCardID === 'undefined' ? '' : model.customerCardID,
    customerPICID: model.customerPICID.toString() === 'NaN' ? 0 : model.customerPICID,
    fileDownload: model.fileDownload === 'undefined' ? '' : model.fileDownload,
    flagCustomerBlacklist: model.flagCustomerBlacklist,
    flagEndCustomerBlacklist: model.flagEndCustomerBlacklist,
    deliveryDate: model.deliveryDate === undefined ? undefined : new Date(model.deliveryDate!),
    projectAlias: model.projectAlias === 'undefined' ? '' : model.projectAlias,
    manDays: model.manDays,
    projectCategory: model.projectCategory,
    referTo: model.referTo,
    complexity: model.complexity,
    estStartByPmo: model.estStartByPmo === undefined ? undefined : new Date(model.estStartByPmo!),
    estEndByPmo: model.estEndByPmo === undefined ? undefined : new Date(model.estEndByPmo!),
    presalesNameList: model.presalesNameList === "undefined" ? "" : model.presalesNameList,
  });
};

export const selectViewFunnelCustomer: Selector<IStore, FunnelViewEditCustomer> = createSelector(
  (state: IStore) => state.funnel.funnelViewEditCustomer!,
  _selectViewFunnelCustomer
);

const _selectViewFunnelCustomerByProjectId = (model: FunnelViewEditCustomerByProjectId): FunnelViewEditCustomerByProjectId => {

  return new FunnelViewEditCustomerByProjectId({
    projectId: model.projectId === undefined ? 0 : model.projectId,
    funnelGenId: model.funnelGenId === undefined ? 0 : model.funnelGenId,
    projectAlias: model.projectAlias === undefined ? '' : model.projectAlias,
    estStartByPmo: model.estStartByPmo === undefined ? undefined : new Date(`${model.estStartByPmo!}`),
    estEndByPmo: model.estEndByPmo === undefined ? undefined : new Date(`${model.estEndByPmo!}`),
    warrantyStart: model.warrantyStart === undefined ? undefined : new Date(`${model.warrantyStart!}`),
    warrantyEnd: model.warrantyEnd === undefined ? undefined : new Date(`${model.warrantyEnd!}`),
    contractStart: model.contractStart === undefined ? undefined : new Date(`${model.contractStart!}`),
    contractEnd: model.contractEnd === undefined ? undefined : new Date(`${model.contractEnd!}`),
    
    actStartByPmo: model.actStartByPmo === undefined ? undefined : new Date(`${model.actStartByPmo!}`),
    actEndByPmo: model.actEndByPmo === undefined ? undefined : new Date(`${model.actEndByPmo!}`),
    thirdPartyName: model.thirdPartyName === undefined ? '' : model.thirdPartyName,
    thirdPartyPicName: model.thirdPartyPicName === undefined ? '' : model.thirdPartyPicName,
    thirdPartyPhoneNumber: model.thirdPartyPhoneNumber === undefined ? '' : model.thirdPartyPhoneNumber,
    serviceLocation: model.serviceLocation === undefined ? '' : model.serviceLocation,
    serviceDescription: model.serviceDescription === undefined ? '' : model.serviceDescription,

    day: model.actualDuration.day,
    month: model.actualDuration.month,
    actualDuration: new ActualDuration({
      day: model.actualDuration.day,
      month: model.actualDuration.month,
    })
  })
};



export const selectViewFunnelCustomerByProjectId: Selector<IStore, FunnelViewEditCustomerByProjectId> = createSelector(
  (state: IStore) => state.funnel.funnelViewEditStatusProjectId!,
  _selectViewFunnelCustomerByProjectId
);

const _selectViewFunnelSelling = (model: FunnelViewEditSelling): FunnelViewEditSelling => {
  return _mappingViewFunnelSellingObject(model);
};

const _mappingViewFunnelSellingObject = (model: FunnelViewEditSelling): FunnelViewEditSelling => {
  return new FunnelViewEditSelling({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    funnelID: model.funnelID === 'undefined' ? '' : model.funnelID,
    gpmAmount: model.gpmAmount.toString() === 'NaN' ? 0 : model.gpmAmount,
    gpmPctg: model.gpmPctg.toString() === 'NaN' ? 0 : model.gpmPctg,
    currency: model.currency === 'undefined' ? '' : model.currency,
    createUserID: model.createUserID.toString() === 'NaN' ? 0 : model.createUserID,
    modifyUserID: model.createUserID.toString() === 'NaN' ? 0 : model.createUserID,
    totalCostProduct: !model.totalCostProduct ? 0 : model.totalCostProduct,
    totalCostService: !model.totalCostService ? 0 : model.totalCostService,
    totalExpendProduct: !model.totalExpendProduct ? 0 : model.totalExpendProduct,
    totalExpendService: !model.totalExpendService ? 0 : model.totalExpendService,
    totalOrderingPriceProduct: !model.totalOrderingPriceProduct ? 0 : model.totalOrderingPriceProduct,
    totalSellingPriceProduct: !model.totalSellingPriceProduct ? 0 : model.totalSellingPriceProduct,
    totalOrderingPriceService: !model.totalOrderingPriceService ? 0 : model.totalOrderingPriceService,
    totalSellingPriceService: !model.totalSellingPriceService ? 0 : model.totalSellingPriceService,
    totalOrderingPrice: model.totalOrderingPrice.toString() === 'NaN' ? 0 : model.totalOrderingPrice,
    totalSellingPrice: model.totalSellingPrice.toString() === 'NaN' ? 0 : model.totalSellingPrice,

    totalInvoice: !model.totalInvoice ? 0 : model.totalInvoice,
    totalCollection: !model.totalCollection ? 0 : model.totalCollection,
    gpmsaProduct: !model.gpmsaProduct ? 0 : model.gpmsaProduct,
    gpmActProduct: !model.gpmActProduct ? 0 : model.gpmActProduct,
    gpmsaService: !model.gpmsaService ? 0 : model.gpmsaService,
    gpmActService: !model.gpmActService ? 0 : model.gpmActService,
    gpmsaProductPctg: !model.gpmsaProductPctg ? 0 : model.gpmsaProductPctg,
    gpmActProductPctg: !model.gpmActProductPctg ? 0 : model.gpmActProductPctg,
    gpmsaServicePctg: !model.gpmsaServicePctg ? 0 : model.gpmsaServicePctg,
    gpmActServicePctg: !model.gpmActServicePctg ? 0 : model.gpmActServicePctg,
    rate: !model.rate ? 0 : model.rate
  });
};

export const selectViewFunnelSelling: Selector<IStore, FunnelViewEditSelling> = createSelector(
  (state: IStore) => state.funnel.funnelViewEditSelling!,
  _selectViewFunnelSelling
);

const _selectViewFunnelCustomerPO = (model: FunnelViewEditCustomerPO): FunnelViewEditCustomerPO => {
  return _mappingViewFunnelCustomerPOObject(model);
};

const _mappingViewFunnelCustomerPOObject = (model: FunnelViewEditCustomerPO): FunnelViewEditCustomerPO => {
  return new FunnelViewEditCustomerPO({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    poCustomerDate: model.poCustomerDate === undefined ? undefined : new Date(model.poCustomerDate!),
    poCustomerNo: model.poCustomerNo === 'undefined' ? '' : model.poCustomerNo,
    contractEndDate: model.contractEndDate === undefined ? undefined : new Date(model.contractEndDate!),
    contractNo: model.poCustomerNo === 'undefined' ? '' : model.contractNo,
    contractStartDate: model.contractStartDate === undefined ? undefined : new Date(model.contractStartDate!),
    modifyUserID: model.modifyUserID === undefined ? 0 : model.modifyUserID,
    sa: model.sa === 'undefined' ? '' : model.sa,
    so: model.so === 'undefined' ? '' : model.so,
    soidc: model.soidc === 'undefined' ? '' : model.soidc,
    soParent: model.soParent === 'undefined' ? '' : model.soParent,
    oiNo: model.oiNo === 'undefined' ? '' : model.oiNo,
    flagKontrakPayung: model.flagKontrakPayung ? model.flagKontrakPayung : 'NO',
    flagRunRate: model.flagRunRate,
    dept: model.dept,
    flagManual: model.flagManual,
    runRate: model.runRate ? model.runRate : 'NO',
    flagContract: model.flagContract ? true : false,
    soDate: model.soDate === undefined ? undefined : new Date(model.soDate!),
  });
};

export const selectViewFunnelCustomerPO: Selector<IStore, FunnelViewEditCustomerPO> = createSelector(
  (state: IStore) => state.funnel.funnelViewEditCustomerPO!,
  _selectViewFunnelCustomerPO
);

const _selectViewFunnelAdditional = (model: FunnelViewEditAdditional): FunnelViewEditAdditional => {
  return _mappingViewFunnelAdditionalObject(model);
};

const _mappingViewFunnelAdditionalObject = (model: FunnelViewEditAdditional): FunnelViewEditAdditional => {
  return new FunnelViewEditAdditional({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    compellingEvent: model.compellingEvent === 'undefined' ? '' : model.compellingEvent,
    supportiveCoach: model.supportiveCoach === 'undefined' ? '' : model.supportiveCoach,
    customerBudget: model.customerBudget === undefined ? 0 : model.customerBudget,
    competitor: model.competitor === 'undefined' ? '' : model.competitor,
    competitorService: model.competitorService === 'undefined' ? '' : model.competitorService,
    customerNeeds: model.customerNeeds === 'undefined' ? '' : model.customerNeeds,
    fox: model.fox === 'undefined' ? '' : model.fox,
    enemy: model.enemy === 'undefined' ? '' : model.enemy,
    competitorProduct: model.competitorProduct === 'undefined' ? '' : model.competitorProduct,
    competitorAmount: model.competitorAmount.toString() === 'NaN' ? 0 : model.competitorAmount,
  });
};

export const selectViewFunnelAdditional: Selector<IStore, FunnelViewEditAdditional> = createSelector(
  (state: IStore) => state.funnel.funnelViewEditAdditional!,
  _selectViewFunnelAdditional
);

const _selectServiceAreaBufferResource = (model: ServiceAreaBufferResource): ServiceAreaBufferResource => {
  return _mappingServiceAreaBufferResourceObject(model);
};

const _mappingServiceAreaBufferResourceObject = (model: ServiceAreaBufferResource): ServiceAreaBufferResource => {
  return new ServiceAreaBufferResource({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    numOfBufferResource: model.numOfBufferResource.toString() === 'NaN' ? 0 : model.numOfBufferResource,
    numOfMaxResource: model.numOfMaxResource.toString() === 'NaN' ? 0 : model.numOfMaxResource,
    createUserID: model.createUserID.toString() === 'NaN' ? 0 : model.createUserID,
    modifyUserID: model.modifyUserID.toString() === 'NaN' ? 0 : model.modifyUserID,
  });
};

export const selectServiceAreaBufferResource: Selector<IStore, ServiceAreaBufferResource> = createSelector(
  (state: IStore) => state.funnel.funnelServiceAreaBufferResource!,
  _selectServiceAreaBufferResource
);

const _selectViewFunnelCustomerDetail = (model: FunnelViewEditCustomerDetails): FunnelViewEditCustomerDetails => {
  return _mappingViewFunnelCustomerDetailObject(model);
};

const _mappingViewFunnelCustomerDetailObject = (model: FunnelViewEditCustomerDetails): FunnelViewEditCustomerDetails => {
  // console.log('customerDetailModel', model);
  return new FunnelViewEditCustomerDetails({
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    customerGenID: model.customerGenID.toString() === 'NaN' ? 0 : model.customerGenID,
    customerName: model.customerName === 'undefined' ? '' : model.customerName,
    addr1: model.addr1 === 'undefined' ? '' : model.addr1,
    addr2: model.addr2 === 'undefined' ? '' : model.addr2,
    addr3: model.addr3 === 'undefined' ? '' : model.addr3,
    addr4: model.addr4 === 'undefined' ? '' : model.addr4,
    city: model.city === 'undefined' ? '' : model.city,
    phoneNumber: model.phoneNumber === 'undefined' ? '' : model.phoneNumber,
    industryClass: model.industryClass === 'undefined' ? '' : model.industryClass,
    website: model.website === 'undefined' ? '' : model.website,
    socialMedia: model.socialMedia === 'undefined' ? '' : model.socialMedia,
    endUserFlag: model.endUserFlag === 'undefined' ? '' : model.endUserFlag,
    memberGroup: model.memberGroup === 'undefined' ? '' : model.memberGroup,
    npwpNumber: model.npwpNumber === 'undefined' ? '' : model.npwpNumber,
    npwpAddress: model.npwpAddress === 'undefined' ? '' : model.npwpAddress,
    npwpName: model.npwpName === 'undefined' ? '' : model.npwpName,
    financeCPName: model.financeCPName === 'undefined' ? '' : model.financeCPName,
    financeCPPhone: model.financeCPPhone === 'undefined' ? '' : model.financeCPPhone,
    financeCPEmail: model.financeCPEmail === 'undefined' ? '' : model.financeCPEmail,
    financeDirName: model.financeDirName === 'undefined' ? '' : model.financeDirName,
    financeDirPhone: model.financeDirPhone === 'undefined' ? '' : model.financeDirPhone,
    financeDirEmail: model.financeDirEmail === 'undefined' ? '' : model.financeDirEmail,
    executiveDirName: model.executiveDirName === 'undefined' ? '' : model.executiveDirName,
    executiveDirPhone: model.executiveDirPhone === 'undefined' ? '' : model.executiveDirPhone,
    executiveDirEmail: model.executiveDirEmail === 'undefined' ? '' : model.executiveDirEmail,
    customerPICID: model.customerPICID.toString() === 'NaN' ? 0 : model.customerPICID,
    picName: model.picName === 'undefined' ? '' : model.picName,
    picMobilePhone: model.picMobilePhone === 'undefined' ? '' : model.picMobilePhone,
    picEmailAddr: model.picEmailAddr === 'undefined' ? '' : model.picEmailAddr,
    picJobTitle: model.picJobTitle === 'undefined' ? '' : model.picJobTitle,
    customerCardID: model.customerCardID === 'undefined' ? '' : model.customerCardID,
    fileDownload: model.fileDownload === 'undefined' ? '' : model.fileDownload,
    flagCustomerBlacklist: model.flagCustomerBlacklist,
  });
};

export const selectViewFunnelCustomerDetail: Selector<IStore, FunnelViewEditCustomerDetails> = createSelector(
  (state: IStore) => state.funnel.funnelViewEditCustomerDetails!,
  _selectViewFunnelCustomerDetail
);

const _selectFunnelFilter = (model: FunnelFilter): FunnelFilter => {
  return _mappingFunnelFilterObject(model);
};

const _mappingFunnelFilterObject = (model: FunnelFilter): FunnelFilter => {
  return new FunnelFilter(model);
};

export const selectFunnelFilter: Selector<IStore, FunnelFilter> = createSelector((state: IStore) => state.funnel.data.filter, _selectFunnelFilter);

const _totalCostMapper = (models: FunnelViewEditSelling) => {
  return {
    totalExpendProduct: models.totalExpendProduct,
    totalExpendService: models.totalExpendService,
    totalCostProduct: models.totalCostProduct,
    totalCostService: models.totalCostService,
  };
};

export const costSelector: any = createSelector((state: IStore) => state.funnel.funnelViewEditSelling, _totalCostMapper);

//Funnel Header LocalStorage
const _mappingFunnelHeaderObject = (model: any): any => {
  return {
    customerName: model.customerName,
    endUserCustomerName: model.endUserCustomerName,
    customerPICName: model.customerPICName,
    CustomerPICJobTitle: model.CustomerPICJobTitle,
    CustomerPICEmail: model.CustomerPICEmail,
    CustomerPICPhone: model.CustomerPICPhone,
    status: model.status,
    employeeKey: model.employeeKey,
    employeeEmail: model.employeeEmail,
    employeeName: model.employeeName,
    notes: model.notes,
    domain: model.domain,
  };
};

const _selectFunnelHeader = (model: any): any => {
  return _mappingFunnelHeaderObject(model);
};

export const selectFunnelHeader: Selector<IStore, any> = createSelector((state: IStore) => state.funnel.funnelHeader!, _selectFunnelHeader);

const _selectViewFunnelCommissionIndex = (model: FunnelViewEditCommisionIndex): FunnelViewEditCommisionIndex => {
  return _mappingViewFunnelCommissionIndexObject(model);
};

const _mappingViewFunnelCommissionIndexObject = (model: FunnelViewEditCommisionIndex): FunnelViewEditCommisionIndex => {
  return new FunnelViewEditCommisionIndex({
    funnelGenID: model.funnelGenID === undefined ? undefined : model.funnelGenID,
    indexDirectSuperior: model.indexDirectSuperior === undefined ? 0 : model.indexDirectSuperior,
    indexSuperiorLevel2: model.indexSuperiorLevel2 === undefined ? 0 : model.indexSuperiorLevel2,
    indexCreator: model.indexCreator === undefined ? 0 : model.indexCreator,
  });
};

export const selectViewFunnelCommissionIndex: Selector<IStore, FunnelViewEditCommisionIndex> = createSelector(
  (state: IStore) => state.funnel.funnelViewEditCommissionIndex!,
  _selectViewFunnelCommissionIndex
);

const _selectFunnelAuthorization = (model: FunnelAuthorization): FunnelAuthorization => {
  return _mappingFunnelAuthorization(model);
};

const _mappingFunnelAuthorization = (model: FunnelAuthorization): FunnelAuthorization => {
  return new FunnelAuthorization({
    employeeID: model.employeeID.toString() === 'NaN' ? 0 : model.employeeID,
    employeeKey: model.employeeKey.toString() === 'NaN' ? 0 : model.employeeKey,
    employeeName: model.employeeName === 'undefined' ? '' : model.employeeName,
    email: model.email === 'undefined' ? '' : model.email,
    levelKey: model.levelKey === undefined ? undefined : model.levelKey,
    ruleFunnel: model.ruleFunnel === 'undefined' ? '' : model.ruleFunnel,
    isEditorIndex: model.isEditorIndex === undefined ? 0 : model.isEditorIndex,
  });
};

export const selectFunnelAuthorization: Selector<IStore, FunnelAuthorization> = createSelector(
  (state: IStore) => state.funnel.funnelAuthorization!,
  _selectFunnelAuthorization
);

const _selectGetActivityRequestOpen = (models: GetActivityReqReopenSAModel[]): any[] => {
  return models.map((model: GetActivityReqReopenSAModel, k): any => ({
    no: k + 1,
    date: model.createDate ? moment(model.createDate).format('DD-MMM-yyyy') : '',
    creator: model.activityText1,
    reasson: model.activityText2,
  }));
};

export const selectGetActivityRequestOpen: Selector<IStore, GetActivityReqReopenSAModel[]> = createSelector(
  (state: IStore) => state.funnelSalesAnalyst.activityReopenList!,
  _selectGetActivityRequestOpen
);

const _selectFunnelHistory = (models: FunnelHistoryEnvelope[]): FunnelHistoryEnvelope[] => {
  return models.map((model: FunnelHistoryEnvelope): FunnelHistoryEnvelope => _mappingFunnelHistory(model));
};

const _mappingFunnelHistory = (model: FunnelHistoryEnvelope): FunnelHistoryEnvelope => {
  return new FunnelHistoryEnvelope({
    historyDate: model.historyDate,
    historyList: model.historyList,
  });
};

export const selectFunnelHistory: ParametricSelector<IStore, string[], any[]> = createSelector(
  (state: IStore) => state.funnel.funnelHistory!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelHistory
);

const _selectFunnelCustPOHistory = (models: FunnelHistoryEnvelope[]): FunnelHistoryEnvelope[] => {
  return models.map((model: FunnelHistoryEnvelope): FunnelHistoryEnvelope => _mappingFunnelCustPOHistory(model));
};

const _mappingFunnelCustPOHistory = (model: FunnelHistoryEnvelope): FunnelHistoryEnvelope => {
  if (
    model.historyList.filter(
      (c) => c.pOCustomerNo != null && c.pOCustomerDate != null && c.contractNo != null && c.contractStartDate != null && c.contractEndDate != null
    ).length > 0
  ) {
    return new FunnelHistoryEnvelope({
      historyDate: model.historyDate,
      historyList: model.historyList,
    });
  }
};

export const selectFunnelCustomerPOHistory: ParametricSelector<IStore, string[], FunnelHistoryEnvelope[]> = createSelector(
  (state: IStore) => state.funnel.funnelHistory!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelCustPOHistory
);


const _selectFunnelTopHistory = (models: FunnelTopHistoryEnvelope[]): FunnelTopHistoryEnvelope[] => {
  return models.map((model: FunnelTopHistoryEnvelope): FunnelTopHistoryEnvelope => _mappingFunnelTopHistory(model));
};

const _mappingFunnelTopHistory = (model: FunnelTopHistoryEnvelope): FunnelTopHistoryEnvelope => {
  return new FunnelTopHistoryEnvelope({
    historyDate: model.historyDate,
    historyList: model.historyList,
  });
};

export const selectFunnelTopHistory: ParametricSelector<IStore, string[], any[]> = createSelector(
  (state: IStore) => state.funnelTop.funnelTopHistory!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelTopHistory
);


//Hendz 07/03/2022
const _selectProjectCategorySAOptions = (models: FunnelCurrencyUdcModel[]): any[] => {
  return models.map((model: FunnelCurrencyUdcModel): any => ({
    text: model.text1,
    value: model.text1,
  }));
};

export const selectProjectCategorySAOptions: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.funnel.dataProjectCategorySA,
  _selectProjectCategorySAOptions
);

//Hendz 27/06/2022
const _selectComplexityOptions = (models: FunnelStatusModel[]): any[] => {
  return models.map((model: FunnelStatusModel): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectComplexityOptions: Selector<IStore, any[]> = createSelector((state: IStore) => state.funnel.complexity, _selectComplexityOptions);


const _selectEmployee = (models: EmployeeHierarcyModel[]): any[] => {
  return models.map((model: EmployeeHierarcyModel): any => ({
    text: model.employeeName,
    value: model.emailAddr,
  }));
};
export const selectEmployee: Selector<IStore, any[]> = createSelector((state: IStore) => state.funnel.employee, _selectEmployee);

const _selectHistoryGpm = (models: FunnelHistoryGpm): IFunnelHistoryGpm => {
  return {
    rows: _mappingHistoryGpm(models.rows),
    totalRows: models.totalRows
  }
};

const _mappingHistoryGpm = (model: FunnelHistoryGpmModel[]): RowHistoryGpm[] => {
  return model.map((model:FunnelHistoryGpmModel ): RowHistoryGpm => ({
    totalCostProduct: model.totalCostProduct ,
    totalSellingProduct: model.totalSellingProduct?model.totalSellingProduct:0 ,
    totalCostService: model.totalCostService ,
    totalSellingService: model.totalSellingService?model.totalSellingService:0 ,
    totalExpendProduct: model.totalExpendProduct ,
    totalExpendService: model.totalExpendService ,
    gpmProduct: model.gpmProduct ,
    gpmService: model.gpmService ,
    gpmAmount: model.gpmAmount ,
    gpmPercentage: model.gpmPercentage ,
    createDate: model.createDate === undefined ? undefined : new Date(model.createDate!), 
    remark: model.remark,
  }))
};

export const selectHistoryGpm: ParametricSelector<IStore, string[], IFunnelHistoryGpm> = createSelector(
  (state: IStore) => state.funnel.funnelHistoryGpm!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectHistoryGpm
);

const _selectViewFunnelConfirmation = (model: FunnelViewEditConfirmation): FunnelViewEditConfirmation => {
  return _mappingViewFunnelConfirmation(model);
};

const _mappingViewFunnelConfirmation = (model: FunnelViewEditConfirmation): FunnelViewEditConfirmation => {
  return new FunnelViewEditConfirmation({
    funnelConfirmationID: model.funnelConfirmationID,
    funnelGenID: model.funnelGenID,
    customerReadiness: model.customerReadiness,
    customerReadinessRemark: model.customerReadinessRemark,
    customerReadinessStr: model.customerReadinessStr,
    thirdparty: model.thirdparty,
    thirdPartyRemark: model.thirdPartyRemark,
    thirdpartyStr: model.thirdpartyStr,
    supportSystem: model.supportSystem,
    supportSystemRemark: model.supportSystemRemark,
    supportSystemStr: model.supportSystemStr,
    createDate: model.createDate,
    createUserID: model.createUserID,
    modifyDate: model.modifyDate,
    modifyUserID: model.modifyUserID,
  });
};

export const selectViewFunnelConfirmation: Selector<IStore, FunnelViewEditConfirmation> = createSelector(
  (state: IStore) => state.funnel.funnelConfirmation!,
  _selectViewFunnelConfirmation
);

const _selectFunnelDropDownCustomerConfirmation = (models: FunnelDropdownConfirmation[]): any[] => {
  return models.map((model: FunnelDropdownConfirmation): any => ({
    value: model.udcid,
    text: model.text1,
  }));
};

export const selectFunnelDropDownCustomerConfirmation: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.funnel.funnelDropdownCustomerConfirmation,
  _selectFunnelDropDownCustomerConfirmation
);

const _selectFunnelDropDownUserConfirmation = (models: FunnelDropdownConfirmation[]): any[] => {
  return models.map((model: FunnelDropdownConfirmation): any => ({
    value: model.udcid,
    text: model.text1,
  }));
};

export const selectFunnelDropDownUserConfirmation: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.funnel.funnelDropdownUserConfirmation,
  _selectFunnelDropDownUserConfirmation
);

