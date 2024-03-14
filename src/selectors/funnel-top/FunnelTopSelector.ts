import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import { Selector } from 'react-redux';
import IFunnelTopTable from './models/IFunnelTopTable';
import IFunnelTopTableRow from './models/IFunnelTopTableRow';
import FunnelTopEnvelope from 'stores/funnel-top/models/FunnelTopEnvelope';
import TopServiceModel from 'stores/funnel-top/models/TopServiceModel';
import ProductDescModel from 'stores/funnel-top/models/ProductDescModel';
import { IFunnelTopEditModel, IFunnelTopEdit } from './models/IFunnelTopEdit';

const _selectFunnelTop = (models: FunnelTopEnvelope): any => {
  return {
    totalRow: models.resultObj?.totalRows,
    rows: _createTableRows(models.resultObj?.rows),
  };
};

const _createTableRows = (models: TopServiceModel[]): IFunnelTopTableRow[] => {
  if (models) {
    return models.map((model: TopServiceModel): IFunnelTopTableRow => _mappingObjectTableRow(model));
  }
};

const _mappingObjectTableRow = (model: TopServiceModel): IFunnelTopTableRow => {
  return {
    funnelTopID: model.funnelTopID.toString() === 'NaN' ? 0 : model.funnelTopID,
    funnelGenID: model.funnelGenID.toString() === 'NaN' ? 0 : model.funnelGenID,
    topType: model.topType === NaN ? 0 : model.topType,
    topTypeStr: model.topTypeStr === 'undefined' ? '' : model.topTypeStr,
    productDesc: model.productDesc === NaN ? 0 : model.productDesc,
    productDescStr: model.productDescStr === 'undefined' ? '' : model.productDescStr,
    productPercentage: model.productPercentage === NaN ? 0 : model.productPercentage,
    serviceDesc: model.serviceDesc === NaN ? 0 : model.serviceDesc,
    serviceDescStr: model.serviceDescStr === 'undefined' ? '' : model.serviceDescStr,
    servicePercentage: model.servicePercentage === NaN ? 0 : model.servicePercentage,
    amount: model.amount === NaN ? 0 : model.amount,
    totalAmount: model.totalAmount === NaN ? 0 : model.totalAmount,
    notes: model.notes === 'undefined' ? '' : model.notes,
    supportDoc: model.supportDoc === 'undefined' ? '' : model.supportDoc,
    supportDocStr: model.supportDocStr === 'undefined' ? '' : model.supportDocStr,
    docCollectionDate: model.docCollectionDate === undefined ? undefined : new Date(model.docCollectionDate!),
    invoiceNumber: model.invoiceNumber === NaN ? 0 : model.invoiceNumber,
    invoiceDate: model.invoiceDate,
    createUserID: model.createUserID === NaN ? 0 : model.createUserID,
    modifyUserID: model.modifyUserID === NaN ? 0 : model.modifyUserID,
    createDate: model.createDate,
    // modifyDate: model.modifyDate,
    isAdd: model.isAdd === undefined ? 0 : model.isAdd,
    isDelete: model.isDelete === undefined ? 0 : model.isDelete,
    isUpdate: model.isUpdate === undefined ? 0 : model.isUpdate,
  };
};

//Hendz 23-03-2022
export const selectFunnelTops: Selector<IStore, IFunnelTopTable> = createSelector((state: IStore) => state.funnelTop.listData, _selectFunnelTop);

export const selectFunnelTop: ParametricSelector<IStore, string[], IFunnelTopTable> = createSelector(
  (state: IStore) => state.funnelTop.listData,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelTop
);

export const selectFunnelTopAll: ParametricSelector<IStore, string[], IFunnelTopTable> = createSelector(
  (state: IStore) => state.funnelTop.listDataAll,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelTop
);

const _selectFunnelTopEdit = (models: IFunnelTopEditModel): IFunnelTopEdit => {
  return {
    funnelTopID: models.resultObj?.funnelTopID!,
    funnelGenID: models.resultObj?.funnelGenID!,
    topType: models.resultObj?.topType!,
    productDesc: +models.resultObj?.productDesc!,
    productPercentage: models.resultObj?.productPercentage!,
    serviceDesc: +models.resultObj?.serviceDesc!,
    servicePercentage: models.resultObj?.servicePercentage!,
    amount: models.resultObj?.amount!,
    totalAmount: models.resultObj?.totalAmount!,
    notes: models.resultObj?.notes!,
    supportDoc: models.resultObj?.supportDoc! === undefined ? '' : models.resultObj?.supportDoc,
    supportDocArr: models.resultObj?.supportDoc! === undefined || !models.resultObj?.supportDoc ? [] : models.resultObj?.supportDoc.split(','),
    docCollectionDate: models.resultObj?.docCollectionDate === undefined ? undefined : new Date(models.resultObj?.docCollectionDate!),
    createUserID: models.resultObj?.createUserID!,
    modifyUserID: models.resultObj?.modifyUserID!,
    createDate: models.resultObj?.createDate!,
    isUpdate: models.resultObj?.isUpdate!,
    isDelete: models.resultObj?.isDelete!,
    isAdd: models.resultObj?.isAdd!,
  };
};

export const selectViewFunnelTopEdit: Selector<IStore, any, any> = createSelector(
  (state: IStore, data) => (data === 'view-edit' ? state.funnelTop.firstData : data),
  _selectFunnelTopEdit
);

//Dropdown Product Desc
const _selectDropdownProductDesc = (models: ProductDescModel[]): any[] => {
  return models.map((model: ProductDescModel): any => ({
    text: model.textData,
    value: model.valueData,
  }));
};

export const selectDropdownProductDesc: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.funnelTop.dataProductDesc,
  _selectDropdownProductDesc
);
