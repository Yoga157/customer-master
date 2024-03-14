import { createSelector, ParametricSelector } from 'reselect';
import IStore from 'models/IStore';
import IProductServiceTable from './models/IProductServiceTable';
import IProductServiceTableRow from './models/IProductServiceTableRow';
import ProductServiceEnvelope from 'stores/funnel-product-service/models/ProductServiceEnvelope';
import ProductServiceModel from 'stores/funnel-product-service/models/ProductServiceModel';
import { Selector } from 'react-redux';
import FunnelBrandModel from 'stores/funnel-product-service/models/FunnelBrandModel';
import FunnelItemHistoryEnvelope from 'stores/funnel-product-service/models/FunnelItemHistoryEnvelope';
import FunnelVoucherAmountPICNameModel from 'stores/funnel-product-service/models/FunnelVoucherAmountPICNameModel';
import ProcessorTypeModel from 'stores/funnel-product-service/models/ProcessorTypeModel';

interface IOptionsData {
  readonly value: number;
  readonly text: string;
  readonly flag: string;
}

const _selectProductService = (models: ProductServiceEnvelope): IProductServiceTable => {
  return {
    totalItemProduct: models.totalItemProduct,
    totalItemService: models.totalItemService,
    totalRow: models.totalRows,
    rows: _createTableRows(models.rows),
  };
};

const _createTableRows = (models: ProductServiceModel[]): IProductServiceTableRow[] => {
  return models.map((model: ProductServiceModel): IProductServiceTableRow => _mappingObjectTableRow(model));
};

const _mappingObjectTableRow = (model: ProductServiceModel): IProductServiceTableRow => {
  return {
    funnelGenID: model.funnelGenID?.toString() === 'NaN' ? 0 : model.funnelGenID,
    dealRegNo: model.dealRegNo === 'undefined' ? '' : model.dealRegNo,
    funnelItemsID: model.funnelItemsID?.toString() === 'NaN' ? 0 : model.funnelItemsID,
    itemDescription: model.itemDescription === 'undefined' ? '' : model.itemDescription,
    itemID: model.itemID?.toString() === 'NaN' ? undefined : model.itemID,
    itemName: model.itemName === 'undefined' ? '' : model.itemName,
    itemSubID: model.itemSubID === null ? undefined : model.itemID?.toString() === 'NaN' ? undefined : model.itemSubID,
    itemSubName: model.itemSubName === 'undefined' ? '' : model.itemSubName,
    processorType: model.processorType?.toString() === 'NaN' ? undefined : model.processorType,
    processorTypeName: model.processorTypeName === 'undefined' ? '' : model.processorTypeName,
    itemType: model.itemType?.toString() === 'NaN' ? 0 : model.itemType,
    orderingPrice: model.orderingPrice?.toString() === 'NaN' ? undefined : model.orderingPrice,
    sellingPrice: model.sellingPrice?.toString() === 'NaN' ? undefined : model.sellingPrice,
    dealRegExpiryDate: model.dealRegExpiryDate === undefined ? undefined : new Date(model.dealRegExpiryDate!),
    supplierName: model.supplierName === 'undefined' ? '' : model.supplierName,
    supplierID: model.supplierID,
    serviceCatalogFlag: model.serviceCatalogFlag === 'undefined' ? '' : model.serviceCatalogFlag,
    isRental: model.isRental === 1 ? 1 : 0,
    isUpdate: model.isUpdate?.toString() === 'NaN' || !model.isUpdate ? 0 : model.isUpdate,
    isDelete: model.isDelete?.toString() === 'NaN' || ! model.isDelete ? 0 : model.isDelete,
    isAdd: model.isAdd?.toString() === 'NaN' || !model.isAdd ? 0 : model.isAdd,
    flagEdit: model.flagEdit === 'undefined' ? '' : model.flagEdit,
    cbvNo: model.cbvNo,
    flagSalesSpesialis: model.flagSalesSpesialis,
    salesSpesialis : model.salesSpesialis === "undefined" || !model.salesSpesialis ? "" : model.salesSpesialis,

  };
};

export const selectProductService: ParametricSelector<IStore, string[], IProductServiceTable> = createSelector(
  (state: IStore) => state.funnelProductService.listData,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectProductService
);

export const selectProductServiceAll: ParametricSelector<IStore, string[], IProductServiceTable> = createSelector(
  (state: IStore) => state.funnelProductService.listDataAll,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectProductService
);

const _createTotalSelling = (models: ProductServiceModel[]): number => {
  let result: number = 0;
  models.forEach((element) => {
    result = result + element.sellingPrice;
  });
  return result;
};

const _selectTotalSelling = (models: ProductServiceEnvelope): number => {
  return _createTotalSelling(models.rows);
};

export const selectTotalSelling: Selector<IStore, number> = createSelector(
  (state: IStore) => state.funnelProductService.listData,
  _selectTotalSelling
);

//Total Ordering
const _createTotalOrdering = (models: ProductServiceModel[]): number => {
  let result: number = 0;
  models.forEach((element) => {
    result = result + element.orderingPrice;
  });
  return result;
};

const _selectTotalOrdering = (models: ProductServiceEnvelope): number => {
  return _createTotalOrdering(models.rows);
};

export const selectTotalOrdering: Selector<IStore, number> = createSelector(
  (state: IStore) => state.funnelProductService.listData,
  _selectTotalOrdering
);

//total selling product
const _createTotalSellingProduct = (models: ProductServiceModel[]): number => {
  let result: number = 0;
  models.forEach((element) => {
    if (element.itemType === 18) result = result + element.sellingPrice;
  });
  return result;
};

const _selectTotalSellingProduct = (models: ProductServiceEnvelope): number => {
  return _createTotalSellingProduct(models.rows);
};

export const selectTotalSellingProduct: Selector<IStore, number> = createSelector(
  (state: IStore) => state.funnelProductService.listData,
  _selectTotalSellingProduct
);

//total selling service
const _createTotalSellingService = (models: ProductServiceModel[]): number => {
  let result: number = 0;
  models.forEach((element) => {
    if (element.itemType === 19) result = result + element.sellingPrice;
  });
  return result;
};

const _selectTotalSellingService = (models: ProductServiceEnvelope): number => {
  return _createTotalSellingService(models.rows);
};

export const selectTotalSellingService: Selector<IStore, number> = createSelector(
  (state: IStore) => state.funnelProductService.listData,
  _selectTotalSellingService
);

//total order service
const _createTotalOrderService = (models: ProductServiceModel[]): number => {
  let result: number = 0;
  models.forEach((element) => {
    if (element.itemType === 19) result = result + element.orderingPrice;
  });
  return result;
};

const _selectTotalOrderService = (models: ProductServiceEnvelope): number => {
  return _createTotalOrderService(models.rows);
};

export const selectTotalOrderService: Selector<IStore, number> = createSelector(
  (state: IStore) => state.funnelProductService.listData,
  _selectTotalOrderService
);

//total order product
const _createTotalOrderProduct = (models: ProductServiceModel[]): number => {
  let result: number = 0;
  models.forEach((element) => {
    if (element.itemType === 18) result = result + element.orderingPrice;
  });
  return result;
};

const _selectTotalOrderProduct = (models: ProductServiceEnvelope): number => {
  return _createTotalOrderProduct(models.rows);
};

export const selectTotalOrderProduct: Selector<IStore, number> = createSelector(
  (state: IStore) => state.funnelProductService.listData,
  _selectTotalOrderProduct
);

const _selectProductServiceSingle = (model: ProductServiceModel): IProductServiceTableRow => {
  return _mappingObjectTableRow(model);
};

export const selectProductServiceSingle: Selector<IStore, IProductServiceTableRow> = createSelector(
  (state: IStore) => state.funnelProductService.firstData,
  _selectProductServiceSingle
);

const _mappingObjectFunnelBrand = (model: FunnelBrandModel): FunnelBrandModel => {
  return new FunnelBrandModel(model);
};

const _selectFunnelProductBySales = (models: FunnelBrandModel[]): FunnelBrandModel[] => {
  return models.map((model: FunnelBrandModel): FunnelBrandModel => _mappingObjectFunnelBrand(model));
};

export const selectFunnelProductBySales: Selector<IStore, FunnelBrandModel[]> = createSelector(
  (state: IStore) => state.funnelProductService.listBrand!,
  _selectFunnelProductBySales
);

//total internal service
const _createTotalInternalService = (models: ProductServiceModel[]): number => {
  let result: number = 0;
  models.forEach((element) => {
    if (element.itemID === 32) result = result + 1;
  });
  return result;
};

const _selectTotalInternalService = (models: ProductServiceEnvelope): number => {
  return _createTotalInternalService(models.rows);
};

export const selectTotalInternalService: Selector<IStore, number> = createSelector(
  (state: IStore) => state.funnelProductService.listData,
  _selectTotalInternalService
);

const _selectSubItem = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    text: model.textData,
    value: model.valueData,
    flag: model.flag,
  }));
};

export const selectSubItem: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelProductService.listSubItem,
  _selectSubItem
);

const _selectSupplier = (models: any[]): any[] => {
  return models.map((model: any): any => ({
    title: model.textData,
    descriptions: model.textData,
    value: model.valueData
  }));
};

export const selectSupplierName: Selector<IStore, IOptionsData[]> = createSelector(
  (state: IStore) => state.funnelProductService.listSupplier,
  _selectSupplier
);

const _selectFunnelItemHistory = (models: FunnelItemHistoryEnvelope[]): FunnelItemHistoryEnvelope[] => {
  return models.map((model: FunnelItemHistoryEnvelope): FunnelItemHistoryEnvelope => _mappingFunnelItemHistory(model));
};

const _mappingFunnelItemHistory = (model: FunnelItemHistoryEnvelope): FunnelItemHistoryEnvelope => {
  return new FunnelItemHistoryEnvelope({
    historyDate: model.historyDate,
    historyList: model.historyList,
  });
};

export const selectFunnelItemHistory: ParametricSelector<IStore, string[], any[]> = createSelector(
  (state: IStore) => state.funnelProductService.funnelItemHistory!,
  (state: IStore, actionTypes: string[]) => actionTypes,
  _selectFunnelItemHistory
);


// GetDetailVoucherAmount
const _selectVoucherAmount = (models: FunnelVoucherAmountPICNameModel): any => {
  // console.log('models',models)
  return {
    value: models.value
  };
};

export const selectFunnelVoucherAmount: Selector<IStore, FunnelVoucherAmountPICNameModel> = createSelector(
  (state: IStore) => state.funnelProductService.VoucherAmount,
  _selectVoucherAmount
);

const _selectProcessorType = (models: ProcessorTypeModel[]): any[] => {
  return models && models.map((model: any): any => ({
    // value: model.udcid,
    // entryKey: model.entryKey,
    // text: model.text1,
    // text2: model.text2,
    // text3: model.text3,
    // text4: model.text4,
    // text5: model.text5,
    // text6: model.text6,
    // text7: model.text7,
    // inum1: model.inum1,

    text: model.text1,
    value: model.udcid,
    text2: model.entryKey,
  
  }));
};

export const selectProcessorType: Selector<IStore, any[]> = createSelector(
  (state: IStore) => state.funnelProductService.listProcessorType,
  _selectProcessorType
);